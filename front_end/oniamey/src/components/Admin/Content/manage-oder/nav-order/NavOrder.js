<<<<<<< HEAD
import {useResolvedPath, useMatch} from 'react-router-dom'
import * as OrdersApi from '../../../../../services/OrdersApi'
import {FaMoneyBill} from 'react-icons/fa'
import './NavOrder.scss'
import {Link} from "react-router-dom"
import {useEffect, useState} from 'react'

const NavOrder = (Props) => { 
    const CustomNav = ({children, to, ...props}) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({path: resolved.pathname, end: true})
        return (
            <li className={`${match ? 'nav-order-active' : ''} nav-item-order`}>
                <Link className={`${match ? 'active-order-item' : ''} nav-link nav-link-order`}
                      to={to} {...props}>
=======
import { useResolvedPath, useMatch } from 'react-router-dom'
import * as OrdersApi from '../../../../../services/OderApi'
import { FaMoneyBill } from 'react-icons/fa'
import './NavOrder.scss'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
const NavOrder = (Props) => {
    const [countStatus, setCountStatus] = useState({});
    const getCountStatus = async () => {
        const result = await OrdersApi.getCountStatus();
        setCountStatus(result);
    }
    useEffect(() => {
        getCountStatus();
    }, []);
    const CustomNav = ({ children, to, ...props }) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({ path: resolved.pathname, end: true })
        return (
            <li className={`${match ? 'nav-active' : ''} nav-item` }>
                <Link className={`${match ? 'active-item' : ''} nav-link`}  to={to} {...props}>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
                    {children}
                </Link>
            </li>
        )
    }
<<<<<<< HEAD
    const CustomMess = ({number}) => {
        return <div className={`${number === 0 ? '' : 'mess'}`}>{number === 0 ? null : number}</div>
    }
    return <div className="manage-order-nav">
        
        <ul className="nav nav-pills nav-orderrr">
            <div className='nav-btn'>
                <CustomNav to='../all'>Tất cả</CustomNav>
                <CustomMess number={Props.countStatus.allStatus}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../pending'>Chờ xác nhận</CustomNav>
                <CustomMess number={Props.countStatus.pending}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../confirmed'>Đã xác nhận</CustomNav>
                <CustomMess number={Props.countStatus.confirmed}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../shipping'>Đang giao</CustomNav>
                <CustomMess number={Props.countStatus.shipping}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../shipped'>Đã giao</CustomNav>
                <CustomMess number={Props.countStatus.shipped}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../success'>Hoàn thành</CustomNav>
                <CustomMess number={Props.countStatus.success}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../cancel'>Hủy</CustomNav>
                <CustomMess number={Props.countStatus.cancel}/>
=======
    const CustomMess = ({ number }) => {
        return <div className={`${number === 0 ? '' : 'mess'}`}>{number === 0 ? null : number}</div>
    }
    return <div className="manage-order-nav">
        <div className='order-title'>
            <div className="title">
                <FaMoneyBill /> Quản Lý Hóa Đơn
            </div>
        </div>
        <ul className="nav nav-pills">
            <div className='nav-btn' >
            {/* <div className='nav-btn' onClick={()=>{Props.handleChangeStatus('PENDING')}}> */}
                <CustomNav to='pending' >Chờ xác nhận</CustomNav>
                <CustomMess number={countStatus.pending} />
            </div>
            <div className='nav-btn' >
                <CustomNav to='awaiting-pickup'>Chờ lấy hàng</CustomNav>
                <CustomMess number={countStatus.awaitingPickup} />
            </div>
            <div className='nav-btn'>
                <CustomNav to='shipping' >Đang giao</CustomNav>
                <CustomMess number={countStatus.shipping} />
            </div>
            <div className='nav-btn'>
                <CustomNav to='shipped' >Đã giao</CustomNav>
                <CustomMess number={countStatus.shipped} />
            </div>
            <div className='nav-btn'>
                <CustomNav to='cancel' >Hủy</CustomNav>
                <CustomMess number={countStatus.cancel} />
            </div>
            <div className='nav-btn'>
                <CustomNav to='awaiting-payment' >Chờ thanh toán</CustomNav>
                <CustomMess number={countStatus.awaitingPayment} />
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
            </div>
        </ul>
    </div>

}

export default NavOrder;