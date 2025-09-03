import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { useParams } from "react-router-dom";
import HomeLayout from "../core/layout/HomeLayout";
import RoomCardItem from "../components/RoomCardItem/RoomCardItem";
import Filter from "../components/Filter/Filter";
import Footer from "../components/Footer/Footer";

const HotelDetail = () => {
  const { id } = useParams(); // lấy id từ URL
  const [hotelInfo, setHotelInfo] = useState(null); // thông tin khách sạn
  const [rooms, setRooms] = useState([]); // danh sách phòng

  useEffect(() => {
    // Gọi API khách sạn
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/public/hotels/${id}`);
        const data = await res.json();
        console.log("(HotelDetail)API: " + data.hotelId + "--" + data.hotelName);
        setHotelInfo(data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin khách sạn:", err);
      }
    };

    // Gọi API danh sách phòng
    const fetchRooms = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/public/hotels/${id}/rooms`);
        const data = await res.json();
        console.log("(HotelDetail)API-Room: " + data);
        setRooms(data || []); // hoặc data tùy response của bạn
      } catch (err) {
        console.error("Lỗi khi lấy danh sách phòng:", err);
      }
    };

    fetchHotel();
    fetchRooms();
  }, [id]);

  const defaultImage = "../assets/images/image.png";
  const facilities = hotelInfo?.hotelFacility
    ? hotelInfo.hotelFacility.split(",").map(item => item.trim())
    : [];

  return (
    <HomeLayout>
      <Content className="mt-[100px] flex flex-col max-w-6xl mx-auto py-6">
        {hotelInfo ? (
          <>
            <Typography.Title level={1}>{hotelInfo.hotelName}</Typography.Title>
            {/* Địa chỉ */}
            <Typography.Text className="pb-4 italic">
              {hotelInfo.hotelAddress || "no Address"}
            </Typography.Text>
            {/* Đánh giá */}
            <Typography.Text className="pb-4 italic">
              {hotelInfo.hotelRating || "no rating"}
            </Typography.Text>
            {/* Mô tả */}
            <div className="flex items-start gap-4">
              <div className="w-1/3">
                <img
                  src={`http://localhost:8080${hotelInfo?.hotelImageUrls[0]}` || defaultImage}
                  alt={hotelInfo.hotelName}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="w-2/3">
                <p className="text-gray-600 text-justify">
                  {hotelInfo.hotelDescription || "no Description"}
                </p>
              </div>
            </div>
            {/* Tiện ich */}
            <Typography.Title level={2} className="mt-8 border-t-2">Danh sách các tiện ích</Typography.Title>
            <div className="w-full flex flex-col gap-2 mt-4">
              {facilities.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckOutlined />
                  <Typography.Text className="italic">{item}</Typography.Text>
                </div>
              ))}
            </div>

          </>
        ) : (
          <div className="flex flex-row">
            <LoadingOutlined />
            <p className="ml-2">Đang tải thông tin khách sạn.</p>
          </div>
        )}

        <Typography.Title level={2} className="mt-8 border-t-2">Danh sách các phòng</Typography.Title>
        <div className="flex flex-row gap-6 mt-6">
          {/* Cột trái: Danh sách phòng (chiếm 3/4) */}
          <div className="w-3/4">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCardItem key={room.id} room={room} />
              ))
            ) : (
              <div className="flex flex-row items-center">
                <LoadingOutlined />
                <p className="ml-2">Không có phòng nào được tìm thấy.</p>
              </div>
            )}
          </div>

          {/* Cột phải: Bộ lọc (chiếm 1/4) */}
          {/* Nên check và tự động reload thông tin filter */}
          <div className="w-1/4 border-t-2">
            <Filter>
            </Filter>

          </div>
        </div>


      </Content>
      <Footer/>
    </HomeLayout>
  );
};

export default HotelDetail;
