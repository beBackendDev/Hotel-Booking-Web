package com.thoaidev.bookinghotel.model.review.service;

import java.util.List;

import com.thoaidev.bookinghotel.model.hotel.entity.HotelReviewDTO;

public interface ReviewSer {
    public void createReview(HotelReviewDTO hotelReviewDTO);
    public List<HotelReviewDTO> getReviewsByHotelId(Integer hotelId);
}
