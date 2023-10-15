import { useResolvedPath, useMatch } from 'react-router-dom'
import { FaMoneyBill } from 'react-icons/fa'
import './NavOrder.scss'
import { Link } from "react-router-dom"
const NavOrder = () => {

    const CustomNav = ({ children, to, ...props }) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({ path: resolved.pathname, end: true })
        return (
            <li className={`${match ? 'active' : ''} nav-item`}>
                <Link className="nav-link" to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
 return <div className="nav-order">
        <div className='order-title'>
            <div className="title">
                <FaMoneyBill /> Quản Lý Hóa Đơn
            </div>
        </div>
        <ul className="nav nav-pills">
            <CustomNav to='pending'  >Chờ xác nhận</CustomNav>
            <CustomNav to='awaiting-pickup'  >Chờ lấy hàng</CustomNav>
            <CustomNav to='shipping' >Đang giao</CustomNav>
            <CustomNav to='shipped' >Đã giao</CustomNav>
            <CustomNav to='cancel' >Hủy</CustomNav>
            <CustomNav to='awaiting-payment' >Chờ thanh toán</CustomNav>
        </ul>
    </div>

}

export default NavOrder;