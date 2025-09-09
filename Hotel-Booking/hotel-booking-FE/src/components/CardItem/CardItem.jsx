import { Card, Tag, Tooltip } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom"; // THÊM nếu chưa import

const CardItem = ({ data }) => {
  const facilitiesArr = data.hotelFacility
    ?.split(",")        // tách thành mảng
    .map((f) => f.trim()); // xoá khoảng trắng thừa

  // fallback image nếu không có ảnh từ APIx
  const defaultImage = "../assets/images/image.png";
  console.log("(CardItem)" + data.hotelImageUrls);
  return (
  <div className="my-2">
    <Card
      className="rounded-xl overflow-hidden relative"
      hoverable
      cover={
        <div className="relative">
          <img
            src={`http://localhost:8080${data?.hotelImageUrls?.[0]}` || defaultImage}
            alt={data?.hotelName || "Hotel Image"}
            className="h-48 w-full object-cover"
          />
          {/* Badge trạng thái phòng */}
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Còn phòng
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="w-2/3 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="font-medium text-lg text-gray-400">Khách sạn</span>
          </div>
          <Tag color="blue">Ngàn sao</Tag>
        </div>

        <Tooltip placement="bottom" title={data?.hotelName}>
          <a
            href="/"
            className="font-medium text-lg mt-2 line-clamp-1 overflow-ellipsis"
          >
            {data?.hotelName}
          </a>
        </Tooltip>

        <div className="flex items-center gap-2">
          <EnvironmentOutlined />
          <span className="font-medium text-primary line-clamp-1 overflow-ellipsis">
            {data?.hotelAddress}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-red-500 font-semibold text-lg">
          {data?.hotelAveragePrice
            ? `${data.hotelAveragePrice.toLocaleString()} VNĐ`
            : "Liên hệ"}
        </span>
        <Link
          to={`/hotel/${data?.hotelId || "None"}`}
          className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
        >
          Xem chi tiết
        </Link>
      </div>
    </Card>
  </div>
);

};

export default CardItem;

// 📌 Refactor SVG thành component con (có thể tách ra riêng file cũng được)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={12} viewBox="0 0 10 14" fill="none">
    <path
      d="M2.18142 0.626005L2.89875 0.396672C3.57142 0.182005 4.29009 0.529339 4.57809 1.20801L5.15142 2.56001C5.40075 3.14867 5.26209 3.84134 4.80875 4.27201L3.54542 5.47067C3.62342 6.18801 3.86475 6.89401 4.26875 7.58867C4.6524 8.26076 5.167 8.84904 5.78209 9.31867L7.29942 8.81201C7.87409 8.62067 8.50075 8.84134 8.85275 9.35934L9.67475 10.566C10.0848 11.1687 10.0108 11.9993 9.50209 12.51L8.95742 13.0573C8.41475 13.602 7.63942 13.8 6.92275 13.576C5.22942 13.048 3.67409 11.4807 2.25409 8.87401C0.832087 6.26334 0.330088 4.04734 0.748754 2.22867C0.924754 1.46334 1.46942 0.853339 2.18142 0.626005Z"
      fill="#4D608D"
    />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={12} viewBox="0 0 10 12" fill="none">
    <path
      d="M5 0.814697C6.19347 0.814697 7.33807 1.2888 8.18198 2.13272C9.02589 2.97663 9.5 4.12122 9.5 5.3147C9.5 7.1777 8.08 9.1297 5.3 11.2147C5.21345 11.2796 5.10819 11.3147 5 11.3147C4.89181 11.3147 4.78655 11.2796 4.7 11.2147C1.92 9.1297 0.5 7.1777 0.5 5.3147C0.5 4.12122 0.974106 2.97663 1.81802 2.13272C2.66193 1.2888 3.80653 0.814697 5 0.814697ZM5 3.8147C4.60218 3.8147 4.22064 3.97273 3.93934 4.25404C3.65804 4.53534 3.5 4.91687 3.5 5.3147C3.5 5.71252 3.65804 6.09405 3.93934 6.37536C4.22064 6.65666 4.60218 6.8147 5 6.8147C5.39782 6.8147 5.77936 6.65666 6.06066 6.37536C6.34196 6.09405 6.5 5.71252 6.5 5.3147C6.5 4.91687 6.34196 4.53534 6.06066 4.25404C5.77936 3.97273 5.39782 3.8147 5 3.8147Z"
      fill="#4D608D"
    />
  </svg>
);
