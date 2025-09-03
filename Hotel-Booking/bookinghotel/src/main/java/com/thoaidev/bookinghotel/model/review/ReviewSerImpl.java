package com.thoaidev.bookinghotel.model.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thoaidev.bookinghotel.model.hotel.entity.Hotel;
import com.thoaidev.bookinghotel.model.hotel.repository.HotelRepository;
import com.thoaidev.bookinghotel.model.review.Review;
import com.thoaidev.bookinghotel.model.review.ReviewRepository;
import com.thoaidev.bookinghotel.model.user.entity.UserEntity;
import com.thoaidev.bookinghotel.model.user.repository.UserRepository;
import com.thoaidev.bookinghotel.model.review.ReviewSer;

@Service
public class ReviewSerImpl implements ReviewSer {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReviewSerImpl(ReviewRepository reviewRepository, HotelRepository hotelRepository,
            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }
    @Override
    public void createReview(ReviewDto reviewDTO) {
        Review review = new Review();

        Hotel hotel = hotelRepository.findById(reviewDTO.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        // Lấy thông tin người dùng
        UserEntity user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        review.setHotel(hotel);
        review.setUser(user);
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        reviewRepository.save(review);
    }
}
