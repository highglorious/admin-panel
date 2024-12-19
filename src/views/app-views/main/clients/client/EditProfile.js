import React, { useState, useEffect } from "react";
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersRequest } from "redux/actions/Users";
import { useHistory } from "react-router-dom";

const avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

const EditProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(id, 10))
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsersRequest());
    } else {
      setAvatarUrl(`https://i.pravatar.cc/150?img=${user.id}`);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        username: user.username,
        phoneNumber: user.phone,
        website: user.website,
        address: `${user.address.street}, ${user.address.suite}`,
        city: user.address.city,
        postcode: user.address.zipcode,
      });
    }
  }, [dispatch, user, id, form]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onFinish = (values) => {
    const key = "updatable";
    message.loading({ content: "Updating...", key });
    setTimeout(() => {
      // dispatch to server
      // delay 1 second
      message.success({ content: "Done!", key, duration: 2 });
      history.goBack();
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUploadAvatar = (info) => {
    const key = "updatable";
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key, duration: 1000 });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => setAvatarUrl(imageUrl));
      message.success({ content: "Uploaded!", key, duration: 1.5 });
    }
  };

  const onRemoveAvatar = () => {
    setAvatarUrl("");
  };

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
        <div className="ml-md-3 mt-md-0 mt-3">
          <Upload
            onChange={onUploadAvatar}
            showUploadList={false}
            action={avatarEndpoint}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvatar}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          form={form}
          name="basicInformation"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Date of Birth" name="dateOfBirth">
                    <DatePicker className="w-100" />
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Post code" name="postcode">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
