import { Button, Tag, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { typeOfRoom } from "../../constant/common";
import { formatMoney } from "../../utils/helper";
const getRoomStatus = (status) => {
  if (status === true) return "Còn trống";
  if (status === false) return "Đã được đặt";
  return "Không rõ";
};
const RoomCardItem = ({ room }) => {
  console.log("(roomItem)" + room.roomImageUrls?.[0]);

  return (
    <div className="w-full bg-white rounded-lg cursor-default hover:shadow-md p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between ">
        <div className="relative w-60 h-40 rounded overflow-hidden shadow-md">
          <img
            src={`http://localhost:8080${room.roomImageUrls[0]}`}
            alt="Ảnh phòng"
            className="w-full h-full object-cover"
          />

          {/* Overlay + Button */}
          <Link
            to={`/hotels/${room.hotelId}/rooms/${room.roomId}`}
            className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded hover:bg-opacity-80 transition-all duration-200"
          >
            Xem chi tiết
          </Link>
        </div>
        <div className="flex items-center flex-1 justify-between">
          <div className="flex flex-col  w-3/4">
            <Typography.Title level={5} ellipsis={{ rows: 1 }}>
              {room.roomName}
            </Typography.Title>

            <Typography.Text className="pb-4">
              Loại phòng: {room.roomType}
            </Typography.Text>
            {/* <Typography.Text className="block py-2 font-bold">
              Số giường: {room.bed_quantity}
            </Typography.Text> */}


            <Typography.Text className="pb-4">
              Tình trạng: {getRoomStatus(room.roomStatus)}
            </Typography.Text>

          </div>
          <div className="flex justify-end">
            <div className="flex-col items-center ">
              <span className="block text-right line-through">
                {formatMoney(room.roomPricePerNight)} vnd
              </span>
              <span className="block text-right font-bold text-2xl py-1 text-red-400">
                {formatMoney(room.roomPricePerNight)} vnd
              </span>

              <Link to={`/hotels/${room.hotelId}/rooms/${room.roomId}/booking`} className="text-right block">
                <Button type="primary">Đặt phòng</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCardItem;
