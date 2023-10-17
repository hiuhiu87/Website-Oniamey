import SideBar from "./SideBar";
import './Admin.scss';
import { BiSidebar } from 'react-icons/bi';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadcrumbsPage from "./BreadCrumbs/BreadcrumbsPage";
import { Container } from "react-bootstrap";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header d-flex ">
                    <BiSidebar size={25} onClick={() => setCollapsed(!collapsed)}/>
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


    )
}

export default Admin;