import React, { useEffect, useState } from "react";
import { BiSidebar } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SideBar";
import "./Admin.scss";
import userService from "../../services/UserService";
import defaultAvatar from "../../assets/man.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useAuth } from "../../authentication/AuthCustom";
import Swal from "sweetalert2";
import {Container} from "react-bootstrap";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    role: "",
  });
  const { logout } = useAuth();

  const items = [
    {
      label: (
        <Link to={`/admins/profile/${currentUser.id}`}>Thông Tin Cá Nhân</Link>
      ),
      key: "0",
    },
    {
      label: (
        <a
          onClick={() => {
            Swal.fire({
              title: "Thông báo",
              icon: "warning",
              text: "Bạn có chắc muốn đăng xuất?",
              showCancelButton: true,
              confirmButtonText: "Đăng xuất",
              cancelButtonText: "Hủy",
                confirmButtonColor: "#d33",
            }).then((result) => {
              if (result.isConfirmed) {
                logout();
              }
            });
          }}
        >
          Đăng Xuất
        </a>
      ),
      key: "1",
    },
  ];

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("user")).email;
    userService
      .getUserByEmail(userEmail)
      .then((res) => {
        setCurrentUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          imageUrl: res.data.imageUrl,
          role: res.data.role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(currentUser);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const adminContentClass = collapsed
    ? "admin-content-collapsed"
    : "admin-content-expanded";

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className={`admin-content ${adminContentClass}`}>
        <div className="admin-header d-flex justify-content-between">
          <BiSidebar className="cick" size={25} onClick={toggleSidebar} />
            <div className="user-infor pe-5 d-flex align-items-center">
              <div className="">
                <img
                    src={
                      currentUser.imageUrl ? currentUser.imageUrl : defaultAvatar
                    }
                    alt="user"
                    className="user-avatar"
                    width={30}
                />
              </div>
              <div>
                <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div className="d-flex flex-column ms-2">
                        <span className="user-name">{currentUser.username}</span>
                        <span className="user-role" style={{fontSize: "12px"}}>
                        {currentUser.role === "ROLE_ADMIN"
                            ? "Quản Lý"
                            : "Nhân Viên"}
                      </span>
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Admin;
