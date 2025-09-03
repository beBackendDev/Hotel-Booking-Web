import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
// import { useHistory, useParams } from "react-router-dom";


import { toast } from "react-toastify";
import Filter from "../components/Filter/Filter";
import LocalStorage from "../constant/localStorage";
import { rules } from "../constant/rules";
import HomeLayout from "../core/layout/HomeLayout";
import { booking } from "../slices/booking.slice";
import styles from "../styles/pages/login.module.scss";

const Booking = () => {
  const { hotelId, roomId } = useParams();
  const { user } = useSelector((state) => state.auth.profile);
  console.log("user info booking:", user);

  const user_id = user.userId;
  const { checkin_date, checkout_date } = JSON.parse(
    localStorage.getItem(LocalStorage.filters)
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const birthday = values["birthday"];
    const formattedBirthday = birthday ? birthday.format("YYYY-MM-DD") : null;
    const _val = {
      ...values,
      birthday: formattedBirthday,
      checkinDate: checkin_date,
      checkoutDate: checkout_date,
      user_id,
      hotelId: Number(hotelId),
      roomId: Number(roomId),
    };
    try {
      console.log("booking information:", _val);

      const res = await dispatch(booking(_val));
      unwrapResult(res);
      // history.push("/");    
      const bookingId = res.data.bookingId;
      if (res.data.redirectToPayment) {
        history(`/payment/${bookingId}`);
      }
      toast.success("Bạn đã đặt vé thành công");

    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                <h1 className="text-3xl font-bold mt-12">
                  Hoàn tất thông tin để đặt phòng
                </h1>
                <Form
                  className={styles.formRegisterMember}
                  name="bookingForm"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item>
                    <div className={styles.formInputName}>
                      <Form.Item
                        label="Phòng"
                        name="roomId"
                        initialValue={roomId}
                        className="mr-4"
                      >
                        <Input disabled />
                      </Form.Item>

                      <Form.Item
                        label="Họ và tên người ở"
                        name="guestFullName"
                        rules={rules.name}
                      >
                        <Input />
                      </Form.Item>
                    </div>

                    <div className={`${styles.formInputName} mt-2`}>
                      <Form.Item
                        label="Số điện thoại người ở"
                        name="guestPhone"
                        rules={[
                          {
                            required: true,
                            message: "Số điện thoại không được bỏ trống",
                          },
                        ]}
                        className="mr-4"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="CCCD/CMND người ở"
                        name="guestCccd"
                        rules={[
                          {
                            required: true,
                            message: "CMND/CCCD không được bỏ trống",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Email người ở"
                    name="guestEmail"
                    rules={rules.email}
                  >
                    <Input />
                  </Form.Item>

                  <div className="flex justify-center my-10">
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Xác nhận đặt phòng
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

export default Booking;
