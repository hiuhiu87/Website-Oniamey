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

function Sidebar() {
  const [submenu1Open, setSubmenu1Open] = useState(false);
  const [submenu2Open, setSubmenu2Open] = useState(false);

  const toggleSubmenu1 = () => setSubmenu1Open(!submenu1Open);
  const toggleSubmenu2 = () => setSubmenu2Open(!submenu2Open);

  return (
    <Nav className="sidebar card py-2 mb-4 pt-3" id="nav_accordion">
      <Nav.Item className="nav-main">
        <Nav.Link href="#">
          <FontAwesomeIcon icon={faCartShopping} className="me-1" />
          Bán Hàng Tại Quầy
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link onClick={toggleSubmenu1}>
          <FontAwesomeIcon icon={faShirt} className="me-1" />
          Quản Lý Sản Phẩm{" "}
          <i
            className={`bi small ${
              submenu1Open ? "bi-caret-up-fill" : "bi-caret-down-fill"
            }`}
          ></i>
        </Nav.Link>
        <Collapse in={submenu1Open}>
          <Nav className="submenu" data-parent="#nav_accordion">
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Sản Phẩm
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Thương Hiệu
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Kích Cỡ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Màu Sắc
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link href="#">
          <FontAwesomeIcon icon={faMoneyBill} className="me-1" />
          Quản Lý Hóa Đơn
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link href="#">
          <FontAwesomeIcon icon={faTag} className="me-1" />
          Khuyến Mãi
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link onClick={toggleSubmenu2}>
          <FontAwesomeIcon icon={faUsers} className="me-1" />
          Quản Lý Tài Khoản{" "}
          <i
            className={`bi small ${
              submenu2Open ? "bi-caret-up-fill" : "bi-caret-down-fill"
            }`}
          ></i>
        </Nav.Link>
        <Collapse in={submenu2Open}>
          <Nav className="submenu" data-parent="#nav_accordion">
          <Nav.Item>
              {/* <Nav.Link>
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Khách Hàng
              </Nav.Link> */}
              <NavLink to="/manage-customer" className="nav-link">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Khách Hàng
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCaretRight} className="me-1" />
                Nhân Viên
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item className="nav-main">
        <Nav.Link href="#">
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className="me-1" />
          Thống Kê
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;
