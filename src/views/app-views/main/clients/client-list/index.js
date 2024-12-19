import React, { useState, useCallback, useEffect } from "react";
import { Typography, Card, Table, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import UserView from "./ClientView";
import AvatarStatus from "components/shared-components/AvatarStatus";
// import userData from "assets/data/user-list.data.json";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersRequest, deleteUserRequest } from "redux/actions/Users";
import Loading from "components/shared-components/Loading";
import { NavLink } from "react-router-dom";
import ErrorOne from "views/auth-views/errors/error-page-1";

const UserList = ({ match }) => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.users);
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const deleteUser = useCallback(
    (userId) => {
      dispatch(deleteUserRequest(userId));
      message.success({ content: `Deleted user ${userId}`, duration: 2 });
    },
    [dispatch]
  );

  const showUserProfile = useCallback((userInfo) => {
    setUserProfileVisible(true);
    setSelectedUser(userInfo);
  }, []);

  const closeUserProfile = useCallback(() => {
    setUserProfileVisible(false);
    setSelectedUser(null);
  }, []);

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <NavLink to={`${match.url}/${record.id}`}>
          <div className="d-flex">
            <AvatarStatus
              src={`https://i.pravatar.cc/150?img=${record.id}`} //
              name={record.name}
              subTitle={record.email}
            />
          </div>
        </NavLink>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => {
          a = a.phone.toLowerCase();
          b = b.phone.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      render: ({ name }) => <Typography>{`${name}`}</Typography>,
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: ({ city, street, suite }) => (
        <Typography>{`${city}, ${street}, ${suite}`}</Typography>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.address.city.toLowerCase();
          b = b.address.city.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => showUserProfile(elm)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteUser(elm.id)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading) return <Loading />;
  if (error) return <ErrorOne />;

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Table columns={tableColumns} dataSource={users} rowKey="id" />
      <UserView
        data={selectedUser}
        visible={userProfileVisible}
        close={closeUserProfile}
      />
    </Card>
  );
};

export default UserList;
