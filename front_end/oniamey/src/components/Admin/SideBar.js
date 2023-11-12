import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import './SideBar.scss';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaProductHunt, FaGithub, FaTshirt, FaMoneyBill, FaTag, FaUserTie, FaChartLine, FaUsersCog, FaUserFriends } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { MdCategory } from 'react-icons/md';
import { SiBrandfolder, SiZend } from 'react-icons/si';
import { GiExplosiveMaterials, GiHeavyCollar } from 'react-icons/gi';
import { IoIosColorPalette } from 'react-icons/io';
import { CgDetailsLess } from 'react-icons/cg';
import sidebarBg from '../../assets/bg1.jpeg';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                // image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 18,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span>Oniamey Shop</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to="/admins"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<HiShoppingCart />}
                        >
                            Bán Hàng Tại Quầy
                            <Link to="/admins/sales-at-the-counter"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaProductHunt />}
                            title="Quản Lý Sản Phẩm"
                        >
                            <MenuItem icon={<FaTshirt />}>
                                Sản Phẩm
                                <Link to="/admins/manage-products"></Link>
                            </MenuItem>
                            <MenuItem icon={<MdCategory />}>
                                Danh Mục
                                <Link to="/admins/manage-categories"></Link>
                            </MenuItem>
                            <MenuItem icon={<SiBrandfolder />}>
                                Thương Hiệu
                                <Link to="/admins/manage-brands"></Link>
                            </MenuItem>
                            <MenuItem icon={<GiExplosiveMaterials />}>
                                Chất Liệu
                                <Link to="/admins/manage-materials"></Link>
                            </MenuItem>
                            <MenuItem icon={<SiZend />}>
                                Kích Cỡ
                                <Link to="/admins/manage-sizes"></Link>
                            </MenuItem>
                            <MenuItem icon={<IoIosColorPalette />}>
                                Màu Sắc
                                <Link to="/admins/manage-colors"></Link>
                            </MenuItem>
                            <MenuItem icon={<GiHeavyCollar />}>
                                Cổ Áo
                                <Link to="/admins/manage-collars"></Link>
                            </MenuItem>
                            <MenuItem icon={<CgDetailsLess />}>
                                Chiều Dài Tay Áo
                                <Link to="/admins/manage-sleeve-lengths"></Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyBill />}
                            suffix={<span className='badge red'>New</span>}
                        >
                            Quản Lý Hóa Đơn
                            <Link to="/admins/manage-orders"></Link>
                        </MenuItem>
                    </Menu>
                    {/* <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTag />}
                        >
                            Khuyến Mãi
                            <Link to="/admins/manage-vouchers"></Link>
                        </MenuItem>
                    </Menu> */}
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaTag />}
                            title="Quản lý voucher">
                            <MenuItem>
                                Danh Sách Voucher
                                <Link to="/admins/manage-vouchers"></Link>
                            </MenuItem>
                            <MenuItem>
                                Tạo Voucher
                                <Link to="/admins/create-vouchers"></Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaUsersCog />}
                            title="Quản Lý Tài Khoản"
                        >
                            <MenuItem icon={<FaUserTie />}>
                                Nhân Viên
                                <Link to="/admins/manage-employees"></Link>
                            </MenuItem>
                            <MenuItem icon={<FaUserFriends />}>
                                Khách Hàng
                                <Link to="/admins/manage-customers"></Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaChartLine />}>
                            Thống Kê
                            <Link to="/admins/manage-statisticals"></Link>
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="#"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Oniamey
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default SideBar;