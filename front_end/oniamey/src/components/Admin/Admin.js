import React, { useState, useEffect } from "react";
import { BiSidebar } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadcrumbsPage from "./BreadCrumbs/BreadcrumbsPage";
import { Container } from "react-bootstrap";
import SideBar from "./SideBar";
import "./Admin.scss";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

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
        <div className="admin-header d-flex justify-content-around">
          <BiSidebar className="cick" size={25} onClick={toggleSidebar}/>
          {/* <BreadcrumbsPage /> */}
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
