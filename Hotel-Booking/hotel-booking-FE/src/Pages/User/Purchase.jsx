import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../../slices/booking.slice";
import User from "./User";
import PurchaseCard from "../../components/PurchaseCard/PurchaseCard";
const Purchase = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.profile);
  const [purchaseList, setPurchaseList] = useState([]);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 10, totalPage: 1 });
  useEffect(() => {
    const _getPurchase = async () => {
      const params = {
        pageNo: 1,
        pageSize: 11,
      };
      try {
        const data = await dispatch(getPurchase({ params }));
        const res = unwrapResult(data);
        console.log("_getPurrchase: ", res.data);

        setPurchaseList(res.data.content);
        setPagination({
          pageNo: res.data.pageNo,
          pageSize: res.data.pageSize,
          totalPage: res.data.totalPage,
        });
      } catch (error) { }
    };
    _getPurchase();
  }, []);
  console.log("purchaseList: ", purchaseList);
  return (
    <User>
      <div className="px-8 bg-white min-h-screen rounded py-12">
        <Typography.Title level={3} className="pt-5">
          Đơn đã đặt
        </Typography.Title>
        <Row gutter={[24, 24]} className="bg-orange-200 p-4">
          <Col sm={4}>
            <Typography.Text className="font-bold">Khách sạn</Typography.Text>
          </Col>
          <Col sm={6}>
            <Typography.Text className="font-bold">Địa chỉ</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Phòng</Typography.Text>
          </Col>
          <Col sm={5}>
            <Typography.Text className="font-bold">
              Ngày nhận/trả phòng
            </Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">
              Tình trạng
            </Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">Giá (VNĐ)</Typography.Text>
          </Col>
        </Row>
        {purchaseList?.[0] &&
          purchaseList.map((purchase) => (
            <PurchaseCard purchase={purchase} key={purchase.id} />
          ))}
      </div>
    </User>
  );
};

export default Purchase;
