package com.thoaidev.bookinghotel.model.review;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
public class ReviewDto {

    private Integer hotelId;
    private Integer userId;
    private String rating;
    private String comment;
}
