import React, { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import {
  faCartShopping,
  faMoneyBillTrendUp,
  faUsers,
  faMoneyBill,
  faShirt,
  faTag,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/style/Sidemenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [submenu1Open, setSubmenu1Open] = useState(false);
  const [submenu2Open, setSubmenu2Open] = useState(false);

  const toggleSubmenu1 = () => setSubmenu1Open(!submenu1Open);
  const toggleSubmenu2 = () => setSubmenu2Open(!submenu2Open);

  return (
    <Nav className="sidebar card py-2 mb-4 pt-3" id="nav_accordion">
      <Nav.Item className="nav-main">
        <NavLink href="#" className="nav-link" >
          <p className="text-nowrap">
            <FontAwesomeIcon icon={faCartShopping} className="me-1" />
            Bán Hàng Tại Quầy
          </p>
        </NavLink>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link onClick={toggleSubmenu1}>
          <p className="text-nowrap">
            <FontAwesomeIcon icon={faShirt} className="me-1" />
            Quản Lý Sản Phẩm
          </p>
        </Nav.Link>
        <Collapse in={submenu1Open}>
          <Nav className="submenu" data-parent="#nav_accordion">
            <Nav.Item>
              <NavLink href="#" className="nav-link">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Sản Phẩm
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink href="#" className="nav-link">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Thương Hiệu
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink href="#" className="nav-link">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Kích Cỡ
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink href="#" className="nav-link">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Màu Sắc
              </NavLink>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <NavLink href="#" className="nav-link">
          <FontAwesomeIcon icon={faMoneyBill} className="me-1" />
          Quản Lý Hóa Đơn
        </NavLink>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <NavLink href="#" className="nav-link">
          <FontAwesomeIcon icon={faTag} className="me-1" />
          Khuyến Mãi
        </NavLink>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link onClick={toggleSubmenu2}>
          <FontAwesomeIcon icon={faUsers} className="me-1" />
          Quản Lý Tài Khoản
          <FontAwesomeIcon
            // icon={submenu2Open ? faCaretUp : faCaretDown}
            className="me-1"
          />
        </Nav.Link>
        <Collapse in={submenu2Open}>
          <Nav className="submenu" data-parent="#nav_accordion">
            <Nav.Item>
              <NavLink to="/manage-customer" className="nav-link nav-sub-menu mb-2">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Khách Hàng
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/manage-user" className="nav-link nav-sub-menu ">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Nhân Viên
              </NavLink>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <NavLink href="#" className="nav-link">
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className="me-1" />
          Thống Kê
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
