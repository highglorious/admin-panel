import React, { Component } from "react";
import { Avatar, Drawer, Divider } from "antd";
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  CompassOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

export class UserView extends Component {
  render() {
    const { data, visible, close } = this.props;
    return (
      <Drawer
        width={300}
        placement="right"
        onClose={close}
        closable={true}
        visible={visible}
      >
        <div className="text-center mt-3">
          <Avatar size={80} src={`https://i.pravatar.cc/150?img=${data?.id}`} />
          <h3 className="mt-2 mb-0">{data?.name}</h3>
        </div>
        <Divider dashed />
        <div className="">
          <h6 className="text-muted text-uppercase mb-3">Account details</h6>
          <p>
            <UserOutlined />
            <span className="ml-3 text-dark">id: {data?.username}</span>
          </p>
          {/* <p>
            <CalendarOutlined />
            <span className="ml-3 text-dark">
              Born in {data?.personalInfo.birthday}
            </span>
          </p> */}
        </div>
        <div className="mt-5">
          <h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
          <p>
            <MobileOutlined />
            <span className="ml-3 text-dark">{data?.phone}</span>
          </p>
          <p>
            <MailOutlined />
            <span className="ml-3 text-dark">
              {data?.email ? data?.email : "-"}
            </span>
          </p>
          <p>
            <CompassOutlined />
            <span className="ml-3 text-dark">{data?.address.city}</span>
          </p>
        </div>
        <div className="mt-5">
          <h6 className="text-muted text-uppercase mb-3">Social profiles</h6>
          {/* <p>
            <FacebookOutlined />
            <a href="/#" className="ml-3 text-dark">
              {data?.personalInfo.facebook ? data?.personalInfo.facebook : "-"}
            </a>
          </p> */}
          {/* <p>
            <TwitterOutlined />
            <a href="/#" className="ml-3 text-dark">
              {data?.personalInfo.twitter ? data?.personalInfo.twitter : "-"}
            </a>
          </p> */}
          {/* <p>
            <InstagramOutlined />
            <a href="/#" className="ml-3 text-dark">
              {data?.personalInfo.instagram
                ? data?.personalInfo.instagram
                : "-"}
            </a>
          </p> */}
          <p>
            <GlobalOutlined />
            <a href="/#" className="ml-3 text-dark">
              {data?.website ? data?.website : "-"}
            </a>
          </p>
        </div>
      </Drawer>
    );
  }
}

export default UserView;
