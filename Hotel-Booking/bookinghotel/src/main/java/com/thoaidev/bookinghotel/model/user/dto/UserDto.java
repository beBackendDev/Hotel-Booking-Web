package com.thoaidev.bookinghotel.model.user.dto;

import java.time.LocalDate;
import java.util.List;

import com.thoaidev.bookinghotel.model.booking.entity.Booking;
import com.thoaidev.bookinghotel.model.hotel.entity.HotelReview;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private Integer userId;

    private String username;

    private String password;

    private String fullname;

    private String roleName;

    private String phone;

    private String urlImg;

    private Boolean gender;

    private LocalDate birthday;

    private List<Booking> bookings;// Lay danh sach Booking

    private List<HotelReview> reviews;// Lay danh sach Review

}
