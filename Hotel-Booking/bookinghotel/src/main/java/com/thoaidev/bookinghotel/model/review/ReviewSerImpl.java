package com.thoaidev.bookinghotel.model.review;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.thoaidev.bookinghotel.model.booking.entity.Booking;
import com.thoaidev.bookinghotel.model.booking.repository.BookingRepo;
import com.thoaidev.bookinghotel.model.hotel.entity.Hotel;
import com.thoaidev.bookinghotel.model.hotel.entity.HotelReview;
import com.thoaidev.bookinghotel.model.hotel.entity.HotelReviewDTO;
import com.thoaidev.bookinghotel.model.hotel.repository.HotelRepository;
import com.thoaidev.bookinghotel.security.jwt.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewSerImpl implements ReviewSer {

    private final ReviewRepository reviewRepository;
    private final BookingRepo bookingRepo;
    private final HotelRepository hotelRepository;

    @Override
    public void createReview(HotelReviewDTO hotelReviewDTO) {
        // Lấy user từ token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
        Integer userId = userDetails.getId();//UserId trong CustomUsserDetail
        Integer hotelId = hotelReviewDTO.getHotelId();
        LocalDate now = LocalDate.now();

        // Kiểm tra booking hợp lệ
        List<Booking> bookings = bookingRepo.findEligibleBookingsForReview(userId, hotelId, now);
        if (bookings.isEmpty()) {
            throw new RuntimeException("Bạn chưa có quyền đánh giá khách sạn này");
        }
//Thuc hien luu thong tin nhan xet vao table HotelReview 
        HotelReview review = new HotelReview();
        review.setHotel(bookings.get(0).getHotel());
        review.setUser(bookings.get(0).getUser());
        review.setRatingPoint(hotelReviewDTO.getRatingPoint());
        review.setComment(hotelReviewDTO.getComment());
        review.setCreatedAt(LocalDateTime.now());

        reviewRepository.save(review);
//
        // Cập nhật rating trung bình và tổng số review
        Double avgRating = reviewRepository.getAverageRatingByHotelId(hotelId);
        Integer totalReviews = reviewRepository.countByHotel_HotelId(hotelId);

        Hotel hotel = bookings.get(0).getHotel();
        hotel.setRatingPoint(avgRating);
        hotel.setTotalReview(totalReviews);

        hotelRepository.save(hotel);
    }
@Override
public List<HotelReviewDTO> getReviewsByHotelId(Integer hotelId) {
    List<HotelReview> reviews = reviewRepository.findByHotel_HotelId(hotelId);

    return reviews.stream().map(review -> new HotelReviewDTO(
            review.getId(),
            hotelId,
            // review.getUser().getUserId(),   // Lấy tên user
            review.getRatingPoint(),
            review.getComment(),
            review.getCreatedAt()
    )).collect(Collectors.toList());
}
}
