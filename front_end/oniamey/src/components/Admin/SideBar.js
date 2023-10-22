import {Link} from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import {MdDashboard} from 'react-icons/md';
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

import {
    FaProductHunt,
    FaGithub,
    FaTshirt,
    FaMoneyBill,
    FaTag,
    FaUserTie,
    FaChartLine,
    FaUsersCog,
    FaUserFriends
} from 'react-icons/fa';
import {HiShoppingCart} from 'react-icons/hi';
import {RiTShirt2Fill} from 'react-icons/ri';
import {MdCategory} from 'react-icons/md';
import {SiBrandfolder, SiZend} from 'react-icons/si';
import {GiExplosiveMaterials, GiHeavyCollar} from 'react-icons/gi';
import {IoIosColorPalette} from 'react-icons/io';
import {CgDetailsLess} from 'react-icons/cg';
import sidebarBg from '../../assets/bg4.png';

const SideBar = (props) => {
    const {collapsed, toggled, handleToggleSidebar} = props;
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
                        <RiTShirt2Fill size={'2em'} color={"#ff7f29"}/>
                        <span>{!collapsed && " Oniamey Shop"}</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard color='#ff7f29'/>}
                        >
                            Dashboard
                            <Link to="/admins"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<HiShoppingCart color='#ff7f29'/>}
                        >
                            Bán Hàng Tại Quầy
                            <Link to="/admins/sales-at-the-counter"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaProductHunt color='#ff7f29'/>}
                            title="Quản Lý Sản Phẩm"
                        >
                            <MenuItem icon={<FaTshirt color='#ff7f29'/>}>
                                Sản Phẩm
                                <Link to="/admins/manage-products"></Link>
                            </MenuItem>
                            <MenuItem icon={<MdCategory color='#ff7f29'/>}>
                                Danh Mục
                                <Link to="/admins/manage-categories"></Link>
                            </MenuItem>
                            <MenuItem icon={<SiBrandfolder color='#ff7f29'/>}>
                                Thương Hiệu
                                <Link to="/admins/manage-brands"></Link>
                            </MenuItem>
                            <MenuItem icon={<GiExplosiveMaterials color='#ff7f29'/>}>
                                Chất Liệu
                                <Link to="/admins/manage-materials"></Link>
                            </MenuItem>
                            <MenuItem icon={<SiZend color='#ff7f29'/>}>
                                Kích Cỡ
                                <Link to="/admins/manage-sizes"></Link>
                            </MenuItem>
                            <MenuItem icon={<IoIosColorPalette color='#ff7f29'/>}>
                                Màu Sắc
                                <Link to="/admins/manage-colors"></Link>
                            </MenuItem>
                            <MenuItem icon={<GiHeavyCollar color='#ff7f29'/>}>
                                Cổ Áo
                                <Link to="/admins/manage-collars"></Link>
                            </MenuItem>
                            <MenuItem icon={<CgDetailsLess color='#ff7f29'/>}>
                                Chiều Dài Tay Áo
                                <Link to="/admins/manage-sleeve-lengths"></Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyBill color='#ff7f29'/>}
                            suffix={<span className='badge red'>New</span>}
                        >
                            Quản Lý Hóa Đơn
                            <Link to="/admins/manage-orders/all"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTag color='#ff7f29'/>}
                        >
                            Khuyến Mãi
                            <Link to="/admins/manage-vouchers"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaUsersCog color='#ff7f29'/>}
                            title="Quản Lý Tài Khoản"
                        >
                            <MenuItem icon={<FaUserTie color='#ff7f29'/>}>
                                Nhân Viên
                                <Link to="/admins/manage-employees"></Link>
                            </MenuItem>
                            <MenuItem icon={<FaUserFriends color='#ff7f29'/>}>
                                Khách Hàng
                                <Link to="/admins/manage-customers"></Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaChartLine color='#ff7f29'/>}>
                            Thống Kê
                            <Link to="/admins/manage-statisticals"></Link>
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{textAlign: 'center'}}>
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
                            <FaGithub/>
                            <span style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
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