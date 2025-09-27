import { unwrapResult } from "@reduxjs/toolkit";
import {
  UserOutlined,//user inf
  IdcardOutlined,//llocation
  PhoneOutlined,//phone 
  SolutionOutlined,//gender

} from "@ant-design/icons";
import { Avatar, Col, Row, Typography, Descriptions, Divider } from "antd";

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../common/UploadImage";
import avtHolder from "../../assets/images/img-placeholder.jpg"
import { rules } from "../../constant/rules";
import { updateMe } from "../../slices/auth.slice";
import { formatDate } from "../../utils/helper";
import User from "./User";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUserProfile] = useState([]);
  const { userAuth } = useSelector((state) => state.auth.profile);
  console.log(">>user profile:", userAuth);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await res.json();
        console.log("(Profile)API-UserProfile:", data);
        setUserProfile(data);

      } catch (error) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error);

      }
    }
    fetchUser();
  }, []);

  const gender = user?.gender === true ? "Nam" : "Nữ";
  return (
    <User>
      <div className="px-8 bg-white h-screen rounded">
        <Typography.Text className="inline-block font-bold text-3xl mt-6 mb-16">
          Thông tin người dùng
        </Typography.Text>

        <Row gutter={[16, 16]}>
          {/* Avatar */}
          <Col span={8} className="flex flex-col items-center">
            <Avatar
              src={userAuth?.avatar || avtHolder}
              size={160}
              icon={<UserOutlined />}
            />
          </Col>

          {/* Thông tin */}
          <Col span={16}>
            <Divider orientation="left">
              <span className="flex items-center font-bold p-2">
                <UserOutlined className="mr-4"
                />
                <span className="text-[18px]">Tên người dùng</span>
              </span>
            </Divider>

            <span className="ml-[30px]">{user?.fullname || "None"}</span>

            <Divider orientation="left">
              <span className="flex items-center font-bold p-2">
                <IdcardOutlined className="mr-4"
                />
                <span className="text-[18px]">Giới tính</span>
              </span>
            </Divider>

            <span className="ml-[30px]">{gender || "None"}</span>

            <Divider orientation="left">
              <span className="flex items-center font-bold p-2">
                <PhoneOutlined className="mr-4"
                />
                <span className="text-[18px]">Số điện thoại</span>
              </span>
            </Divider>

            <span className="ml-[30px]">{user?.phone || "None"}</span>

            <Link
              to={`/users/${user?.userId}/reviews`}
              className="block  rounded-md transition-colors"
            >
              <Divider orientation="left">
                <span className="hover:bg-gray-100 flex items-center font-bold p-2">
                  <SolutionOutlined className="mr-4 text-[20px]" />
                  <span className="text-[18px]">Click để xem sách đánh giá</span>
                </span>
              </Divider>
            </Link>

          </Col>

        </Row>
      </div>
    </User>
  );
};

export default Profile;
