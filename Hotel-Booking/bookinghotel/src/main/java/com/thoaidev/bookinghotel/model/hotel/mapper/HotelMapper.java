package com.thoaidev.bookinghotel.model.hotel.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.thoaidev.bookinghotel.model.hotel.dto.HotelDto;
import com.thoaidev.bookinghotel.model.hotel.entity.Hotel;
import com.thoaidev.bookinghotel.model.image.entity.Image;

@Component
public class HotelMapper {

    public HotelDto mapToHotelDto(Hotel hotel) {
        List<String> imageUrls = hotel.getHotelImages().stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
        return HotelDto.builder()
                .hotelId(hotel.getHotelId())
                .hotelName(hotel.getHotelName())
                .hotelImageUrls(imageUrls)
                .hotelAveragePrice(hotel.getHotelAveragePrice())
                .hotelFacility(hotel.getHotelFacility())
                .hotelAddress(hotel.getHotelAddress())
                .hotelContactMail(hotel.getHotelContactMail())
                .hotelContactPhone(hotel.getHotelContactPhone())
                .hotelDescription(hotel.getHotelDescription())
                .hotelRating(hotel.getHotelRating())
                .hotelCreatedAt(hotel.getHotelCreatedAt())
                .hotelUpdatedAt(hotel.getHotelUpdatedAt())
                .build();
    }
}
