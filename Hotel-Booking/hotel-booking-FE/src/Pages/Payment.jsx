import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, Row, Radio, Checkbox, Card } from "antd"; // ✅ Thêm Radio, Checkbox, Card
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Filter from "../components/Filter/Filter";
import { rules } from "../constant/rules";
import HomeLayout from "../core/layout/HomeLayout";
import { processPayment } from "../slices/payment.slice";
import styles from "../styles/pages/login.module.scss";

const Payment = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    const paymentData = {
      ...values,
      bookingId: Number(bookingId),
      method: values.method || "VNPAY",
    };

    try {
      const res = await dispatch(processPayment(paymentData));
      const result = unwrapResult(res);

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        toast.success("Thanh toán thành công!");
        history.push("/user/bookings");
      }
    } catch (err) {
      console.error(err);
      toast.error("Thanh toán thất bại, vui lòng thử lại.");
    }
  };

  return (
      <Content className="max-w-6xl mx-auto mt-8 px-4">
        <Row gutter={24}>
          {/*  Cột trái: Thông tin đặt phòng */}
          <Col xs={24} md={10}>
            <Card
              title="Thông tin đặt phòng"
              bordered={false}
              className="shadow-md rounded-lg"
            >
              <p><strong>Mã đặt phòng:</strong> {bookingId}</p>
              <p><strong>Khách sạn:</strong> Khách sạn ABC</p>
              <p><strong>Phòng:</strong> Deluxe View Biển</p>
              <p><strong>Check-in:</strong> 12/09/2025</p>
              <p><strong>Check-out:</strong> 14/09/2025</p>
              <p className="text-lg font-bold mt-2 text-red-500">
                Tổng tiền: 3.500.000 VND
              </p>
            </Card>
          </Col>

          {/*  Cột phải: Form thanh toán */}
          <Col xs={24} md={14}>
            <Card
              title="Thông tin thanh toán"
              bordered={false}
              className="shadow-md rounded-lg"
            >
              <Form
                layout="vertical"
                name="paymentForm"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={rules.name}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={rules.email}
                >
                  <Input placeholder="Nhập email để nhận hóa đơn" />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                >
                  <Input placeholder="SĐT liên hệ" />
                </Form.Item>

                <Form.Item
                  label="Chọn phương thức thanh toán"
                  name="method"
                  rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
                >
                  <Radio.Group className="flex flex-col gap-2">
                    <Radio value="VNPAY">Thanh toán qua VNPay</Radio>
                    <Radio value="MOMO">Thanh toán qua Momo</Radio>
                    <Radio value="CASH">Thanh toán tại quầy</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject("Bạn phải đồng ý điều khoản"),
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đồng ý với <a href="/terms">điều khoản và chính sách hoàn hủy</a>.
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Thanh toán ngay
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

  );
};

export default Payment;
