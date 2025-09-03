package com.thoaidev.bookinghotel.model.hotel.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.thoaidev.bookinghotel.model.image.entity.Image;
import com.thoaidev.bookinghotel.model.review.Review;
import com.thoaidev.bookinghotel.model.room.entity.Room;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// //Sử dụng @Getter @Setter thay vì @Data bởi vì @Data có thể gây lỗi khi sử dụng JPA
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "hotel")
@Data
//Sử dụng class Serializable để đánh dấu một class có thể được chuyển đổi (serialize) thành
// một chuỗi byte và có thể khôi phục (deserialize) về đối tượng Java ban đầu.
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    //Bởi vì thuộc tính Id được AutoIncrement cho nên chúng ta set thuộc annotation là GeneratedValue để server tự động đưa dữ liệu dưới dạng AutoIncrement
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Integer hotelId;//Id khach san

    @Column(name = "hotel_name")
    private String hotelName;//ten khach san

    @Column(name = "hotel_address")
    private String hotelAddress;//dia chi khach san

    @Column(name = "hotel_average_price")
    private BigDecimal hotelAveragePrice;//gia tien trung binh

    @Column(name = "hotel_facility")
    private String hotelFacility;//tien ich

    @Column(name = "hotel_rating")
    private String hotelRating;//danh gia

    @Column(name = "hotel_contact_mail")
    private String hotelContactMail;//Email lien he

    @Column(name = "hotel_contact_phone")
    private String hotelContactPhone;//Phone lien he

    @Column(name = "hotel_description")
    private String hotelDescription;//mo ta khách san

    // @Column (name = "hotel_image")
    // private String hotelImage;//hinh anh khách san
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> hotelImages = new ArrayList<>();

    @Column(name = "hotel_created_at")
    @CreationTimestamp
    private LocalDateTime hotelCreatedAt;//ngay tao

    @Column(name = "hotel_updated_at")
    @UpdateTimestamp
    private LocalDateTime hotelUpdatedAt;//ngay duoc nang cap

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
}
