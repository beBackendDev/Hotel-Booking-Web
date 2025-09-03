package com.thoaidev.bookinghotel.model.hotel.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.thoaidev.bookinghotel.exceptions.NotFoundException;
import com.thoaidev.bookinghotel.model.hotel.FilterRequest;
import com.thoaidev.bookinghotel.model.hotel.HotelSpecification;
import com.thoaidev.bookinghotel.model.hotel.dto.HotelDto;
import com.thoaidev.bookinghotel.model.hotel.dto.response.HotelResponse;
import com.thoaidev.bookinghotel.model.hotel.entity.Hotel;
import com.thoaidev.bookinghotel.model.hotel.mapper.HotelMapper;
import com.thoaidev.bookinghotel.model.hotel.repository.HotelRepository;
import com.thoaidev.bookinghotel.model.image.entity.Image;
import com.thoaidev.bookinghotel.model.image.service.ImageService;

@Service
public class HotelServiceImplement implements HotelService {

    // @Autowired
    // private ModelMapper modelMapper;
    @Autowired
    private final HotelRepository hotelRepository;

    public HotelServiceImplement(HotelRepository hotelRepo) {
        this.hotelRepository = hotelRepo;
    }
    @Autowired
    private ImageService imageService;

    //User: TÌm toàn bộ danh sách các khách sạn
    @Override
    public HotelResponse getAllHotels(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Hotel> hotels = hotelRepository.findAll(pageable);
        List<Hotel> listOfHotels = hotels.getContent();
        List<HotelDto> content = listOfHotels.stream().map((hotel) -> mapToHotelDto(hotel)).collect(Collectors.toList());
        HotelResponse hotelResponse = new HotelResponse();
        hotelResponse.setContent(content);
        hotelResponse.setPageNo(hotels.getNumber());
        hotelResponse.setPageSize(hotels.getSize());
        hotelResponse.setTotalElements(hotels.getTotalElements());
        hotelResponse.setTotalPage(hotels.getTotalPages());
        hotelResponse.setLast(hotels.isLast());
        return hotelResponse;
    }

    //User: lấy thông tin khách sạn theo ID
    @Override
    public HotelDto getHotelById(Integer id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new NotFoundException("Đối tượng Hotel không tồn tại"));
        return mapToHotelDto(hotel);
    }

    @Override
    public HotelResponse getAllHotels(FilterRequest filter) {
        List<Hotel> hotels = hotelRepository.findAll(HotelSpecification.filter(filter));
        HotelMapper mapper = new HotelMapper();
        List<HotelDto> content = hotels.stream()
                .map(mapper::mapToHotelDto)
                .collect(Collectors.toList());

        HotelResponse hotelResponse = new HotelResponse();
        hotelResponse.setContent(content); // Chỉ cần gán content

        return hotelResponse;
    }

    //
    @Override
    public List<Hotel> getHotelsByAddress(String location) {
        return hotelRepository.findByHotelAddressContainingIgnoreCase(location);  // Tìm khách sạn theo địa chỉ
    }

    @Override
    public List<Hotel> getHotelsByName(String name) {
        return hotelRepository.findByHotelNameContainingIgnoreCase(name);  // Tìm khách sạn theo địa chỉ
    }

    //Admin: tạo mởi khách sạn
    @Override
    public HotelDto createHotel(HotelDto hotelDto) {
        Hotel hotel = new Hotel();
        hotel.setHotelName(hotelDto.getHotelName());
        hotel.setHotelAddress(hotelDto.getHotelAddress());
        hotel.setHotelDescription(hotelDto.getHotelDescription());
        hotel.setHotelFacility(hotelDto.getHotelFacility());
        hotel.setHotelRating(hotelDto.getHotelRating());
        hotel.setHotelContactMail(hotelDto.getHotelContactMail());
        hotel.setHotelContactPhone(hotelDto.getHotelContactPhone());
        hotel.setHotelAveragePrice(hotelDto.getHotelAveragePrice());
        List<Image> imageEntities = Optional.ofNullable(hotelDto.getHotelImageUrls())
                .orElse(Collections.emptyList())
                .stream()
                .map(url -> Image.builder()
                .url(url)
                .hotel(hotel)
                .build())
                .collect(Collectors.toList());

        hotel.setHotelImages(imageEntities);
        // Set thời gian tạo và cập nhật
        LocalDateTime now = LocalDateTime.now();
        hotel.setHotelCreatedAt(now);
        hotel.setHotelUpdatedAt(now);

        Hotel savedHotel = hotelRepository.save(hotel);//goị tới Repository để update lên DB
        return mapToHotelDto(savedHotel);
    }

//Admin: Xóa khách sạn
    @Override
    public void deleteHotelById(Integer id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new NotFoundException("Đối tượng Hotel không tồn tại"));
        hotelRepository.delete(hotel);
    }
//Admin: Cập nhật khách sạn

    @Override
    public HotelDto updateHotel(HotelDto hotelDto, Integer id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new NotFoundException("Khách sạn không tồn tại"));

        if (hotelDto.getHotelName() != null) {
            hotel.setHotelName(hotelDto.getHotelName());
        }
        if (hotelDto.getHotelAddress() != null) {
            hotel.setHotelAddress(hotelDto.getHotelAddress());

        }
        if (hotelDto.getHotelDescription() != null) {
            hotel.setHotelDescription(hotelDto.getHotelDescription());

        }
        if (hotelDto.getHotelFacility() != null) {
            hotel.setHotelFacility(hotelDto.getHotelFacility());

        }
        if (hotelDto.getHotelAveragePrice() != null) {
            hotel.setHotelAveragePrice(hotelDto.getHotelAveragePrice());

        }
        if (hotelDto.getHotelRating() != null) {
            hotel.setHotelRating(hotelDto.getHotelRating());

        }
        if (hotelDto.getHotelContactPhone() != null) {
            hotel.setHotelContactPhone(hotelDto.getHotelContactPhone());

        }
        if (hotelDto.getHotelContactMail() != null) {
            hotel.setHotelContactMail(hotelDto.getHotelContactMail());

        }

        if (hotelDto.getHotelImageUrls() != null) {
            List<Image> imageEntities = hotelDto.getHotelImageUrls().stream()
                    .map(url -> Image.builder()
                    .url(url)
                    .hotel(hotel) // liên kết ngược
                    .build())
                    .collect(Collectors.toList());
            hotel.setHotelImages(imageEntities);
        }

        Hotel updatedHotel = hotelRepository.save(hotel);
        return mapToHotelDto(updatedHotel);
    }

    //IMAGE UPLOAD
    @Override
    public List<String> imgUpload(Integer hotelId, List<MultipartFile> files, String hotelName) {
        try {
            if (files == null || files.isEmpty()) {
                throw new IllegalArgumentException("Danh sách File không hợp lệ");
            }

            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách sạn"));

            // Tạo danh sách chứa tất cả url ảnh được up lên
            List<String> uploadedUrls = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty() || file.getOriginalFilename() == null) {
                    continue; // Bỏ qua file lỗi
                }
                String safeHotelName = hotelName.replaceAll("[^a-zA-Z0-9-_]", "_");
                String imageUrl = imageService.upload(file, safeHotelName + "/hotels/" + hotelId);//trả về với url /uploads/hotelName/hotels/{hotelId}/image.jpeg
                System.out.println("HotelSer print ImageUrl: " + imageUrl);
                Image newImage = Image.builder()
                        .url(imageUrl)
                        .hotel(hotel)
                        .build();

                hotel.getHotelImages().add(newImage);
                uploadedUrls.add(imageUrl);
            }
            hotelRepository.save(hotel);
            return uploadedUrls.stream()
                    .map(url -> url)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Lỗi đọc file upload: " + e.getMessage(), e);
        }
    }

    //_____________Other Methods_____________
    @Override
    public HotelDto mapToHotelDto(Hotel hotel) {
        // Lấy danh sách URL từ danh sách ảnh
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

    @Override
    public List<HotelDto> fetchHotelsFromRapidAPI(LocalDate checkin, LocalDate checkout) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'fetchHotelsFromRapidAPI'");
    }
}
