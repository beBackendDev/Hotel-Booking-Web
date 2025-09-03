import { UserOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../common/UploadImage";
import { rules } from "../../constant/rules";
import { updateMe } from "../../slices/auth.slice";
import { formatDate } from "../../utils/helper";
import User from "./User";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.profile);
  console.log(">>user profile:", user);
  const [banner, setBanner] = useState("");
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  // Khởi tạo giá trị form
  const initialFormValues = {
    username: user?.username || "",
    fullname: user?.fullname || "",
    phone: user?.phone || "",
    birthday: user?.birthday ? moment(user.birthday, "YYYY-MM-DD") : null,
    gender: user?.gender ?? true, // mặc định true nếu không có
    image: banner.url || user.urlImg,
  };

  const onFinish = async (values) => {
    try {
      const _data = {
        userId: user.userId,
        username: user.username,
        fullname: values.fullname,
        phone: values.phone,
        gender: values.gender,
        birthday: values.birthday.format("YYYY-MM-DD"),
        imgUrl: banner.url || user.urlImg,
      };
      const res = await dispatch(updateMe(_data)).unwrap();
      console.log("Cập nhật thành công:", res.data);
    } catch (error) {
      console.log("Lỗi cập nhật:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <User>
      <div className="px-8 bg-white h-screen rounded">
        <Typography.Text className="inline-block font-bold text-3xl mt-6 mb-16">
          Chỉnh sửa trang cá nhân
        </Typography.Text>
        <Form
          name="profile"
          initialValues={initialFormValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          key={user.userId} // Để reset form khi user thay đổi
        >
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Form.Item label="Tên tài khoản" name="username" rules={rules.userName}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="fullname"
                rules={[{ required: true, message: "Trường này không được bỏ trống" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Trường này không được bỏ trống" }]}
              >
                <Input />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                    rules={[{ required: true, message: "Trường này không được bỏ trống" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Giới tính" name="gender">
                    <Radio.Group>
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Nếu dùng avatar và upload ảnh thì bỏ comment */}
            <Col span={6}>
              <Avatar
                src={banner.url || user.urlImg}
                size={160}
                icon={<UserOutlined />}
              />
              <UploadImage onChange={setBanner} setProgress={setProgress} progress={progress} />
            </Col>
          </Row>

          <div className="flex justify-center my-10">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhập thông tin
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </User>
  );
};

export default Profile;
