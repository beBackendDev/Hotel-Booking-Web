import React, { useEffect, useState } from "react";
import { Button, Tag, Typography } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import HomeLayout from "../core/layout/HomeLayout";

const RoomDetail = () => {
  const { hotelid } = useParams(); // id của hotel
  const { roomid } = useParams(); // id của room
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/public/hotels/${hotelid}/rooms/${roomid}`)
      .then((res) => {
        setRoom(res.data);
        console.log("(roomdetail)" , hotelid);
        console.log("(roomdetail)" , roomid);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu phòng:", err);
        setLoading(false);
      });
  }, [hotelid, roomid]);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (!room) return <div className="p-4 text-red-500">Không tìm thấy phòng</div>;

  return (
    <HomeLayout>
         <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{room.roomName}</h1>

      {/* Hình ảnh */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {room.roomImageUrls?.map((url, index) => (
          <img
            key={index}
            src={`http://localhost:8080${url}`}
            alt={`Ảnh phòng ${index}`}
            className="h-48 w-full object-cover rounded shadow"
          />
          
        ))}
        
      </div>

      {/* Thông tin chi tiết */}
      <div className="mb-6">
        <p><span className="font-semibold">Giá:</span> {room.roomPricePerNight} VND / đêm</p>
        <p><span className="font-semibold">Sức chứa:</span> {room.roomOccupancy} người</p>
        <p><span className="font-semibold">Loại phòng:</span> {room.roomType}</p>
      </div>

      {/* Nút đặt phòng */}
      <Link to={`/hotels/${room.hotelId}/rooms/${room.roomId}/booking`} className="text-right block">
        <Button type="primary">Đặt phòng</Button>
      </Link>
    </div>
    </HomeLayout>
  );
};

export default RoomDetail;
