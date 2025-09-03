import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Filter from "../components/Filter/Filter";
import { rules } from "../constant/rules";
import HomeLayout from "../core/layout/HomeLayout";
import { processPayment } from "../slices/payment.slice"; // Giả sử bạn có action này
import styles from "../styles/pages/login.module.scss";

const Payment = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    const paymentData = {
      ...values,
      bookingId: Number(bookingId),
      method: values.method || "VNPAY", // Mặc định dùng VNPAY
    };

    try {
      const res = await dispatch(processPayment(paymentData));
      const result = unwrapResult(res);

      if (result.redirectUrl) {
        // Redirect đến VNPay/Momo
        window.location.href = result.redirectUrl;
      } else {
        toast.success("Thanh toán thành công!");
        history.push("/user/bookings"); // Về trang quản lý đơn hàng
      }
    } catch (err) {
      console.error(err);
      toast.error("Thanh toán thất bại, vui lòng thử lại.");
    }
  };

  return (
    <HomeLayout>
      <Content className="max-w-6xl mx-auto mt-5">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Filter />
          </Col>
          <Col span={18}>
            <div className="bg-white">
              <div className={`${styles.formRegisterMemberContainer} flex-col`}>
                <h1 className="text-3xl font-bold mt-12">Thanh toán đặt phòng</h1>
                <Form
                  className={styles.formRegisterMember}
                  name="paymentForm"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Mã đặt phòng"
                    name="bookingId"
                    initialValue={bookingId}
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Chọn phương thức thanh toán"
                    name="method"
                    rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
                  >
                    <Input placeholder="VNPAY hoặc MOMO (tạm thời nhập tay)" />
                  </Form.Item>

                  <div className="flex justify-center my-10">
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Thanh toán ngay
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </HomeLayout>
  );
};

export default Payment;
