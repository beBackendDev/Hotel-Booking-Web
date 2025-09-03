package com.thoaidev.bookinghotel.model.user.dto;

import java.time.LocalDate;

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

}
