package com.thoaidev.bookinghotel.model.booking.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thoaidev.bookinghotel.model.booking.entity.Booking;
import com.thoaidev.bookinghotel.model.user.entity.UserEntity;

public interface BookingRepo extends JpaRepository<Booking, Integer>{
     Page<Booking> findByUser(UserEntity user, Pageable pageable);

     
     // Kiểm tra trùng lịch
    @Query("SELECT b FROM Booking b WHERE b.room.roomId = :roomId " +
           "AND b.status IN ('PENDING_PAYMENT', 'PAID') " +
           "AND (:startDate < b.checkoutDate AND :endDate > b.checkinDate)")
    List<Booking> findConflictingBookings(@Param("roomId") Integer roomId,
                                          @Param("startDate") LocalDate startDate,
                                          @Param("endDate") LocalDate endDate);

    // Tìm các booking đã quá hạn chưa thanh toán
    @Query("SELECT b FROM Booking b WHERE b.status = 'PENDING_PAYMENT' AND b.createdAt < :expiredTime")
    List<Booking> findExpiredBookings(@Param("expiredTime") LocalDateTime expiredTime);
}
