import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Row, Typography, Pagination } from "antd"; // thêm Pagination
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../../slices/booking.slice";
import User from "./User";
import PurchaseCard from "../../components/PurchaseCard/PurchaseCard";

const Purchase = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.profile);
  const [purchaseList, setPurchaseList] = useState([]);
  const token = localStorage.getItem("accessToken");

  // phân trang
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 5, // mỗi trang tối đa 5 đơn
    totalPage: 1,
  });

  useEffect(() => {
    const _getPurchase = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/user/hotels/booking-management`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log("_getPurrchase: ", data);

        setPurchaseList(data.content || []);
        setPagination((prev) => ({
          ...prev,
          totalPage: Math.ceil((data.content?.length || 0) / prev.pageSize),
        }));
      } catch (error) {
        console.error("Lỗi lấy đơn đặt:", error);
      }
    };
    _getPurchase();
  }, []);

  // tính toán danh sách hiển thị theo trang hiện tại
  const startIndex = (pagination.pageNo - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const currentPageData = purchaseList.slice(startIndex, endIndex);

  // handler đổi trang
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, pageNo: page }));
  };

  return (
    <User>
      <div className="px-8 bg-white min-h-screen rounded py-12">
        <Typography.Title level={3} className="pt-5">
          Đơn đã đặt
        </Typography.Title>
        <Row gutter={[24, 24]} className="bg-orange-200 p-4">
          <Col sm={8}>
            <Typography.Text className="font-bold">Khách sạn</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Phòng</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Ngày nhận</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Ngày trả</Typography.Text>
          </Col>
          <Col sm={4}>
            <Typography.Text className="font-bold">Tình trạng</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Giá (VNĐ)</Typography.Text>
          </Col>
        </Row>

        {currentPageData?.map((purchase) => (
          <PurchaseCard purchase={purchase} key={purchase.id} />
        ))}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={pagination.pageNo}
            pageSize={pagination.pageSize}
            total={purchaseList.length}
            onChange={handlePageChange}
            showSizeChanger={false} // không cho đổi pageSize
          />
        </div>
      </div>
    </User>
  );
};

export default Purchase;
