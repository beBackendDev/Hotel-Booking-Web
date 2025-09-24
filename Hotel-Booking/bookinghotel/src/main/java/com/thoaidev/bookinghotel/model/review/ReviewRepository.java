package com.thoaidev.bookinghotel.model.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thoaidev.bookinghotel.model.hotel.entity.HotelReview;

public interface ReviewRepository extends JpaRepository<HotelReview, Integer> {

    @Query("SELECT AVG(r.ratingPoint) FROM HotelReview r WHERE r.hotel.hotelId = :hotelId")
    Double getAverageRatingByHotelId(@Param("hotelId") Integer hotelId);

    Integer countByHotel_HotelId(Integer hotelId);

    List<HotelReview> findByHotel_HotelId(Integer hotelId);
}
