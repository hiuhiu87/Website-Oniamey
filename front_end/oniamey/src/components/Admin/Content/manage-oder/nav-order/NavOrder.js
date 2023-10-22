import {useResolvedPath, useMatch} from 'react-router-dom'
import * as OrdersApi from '../../../../../services/OrdersApi'
import {FaMoneyBill} from 'react-icons/fa'
import './NavOrder.scss'
import {Link} from "react-router-dom"
import {useEffect, useState} from 'react'

const NavOrder = (Props) => {
    const [countStatus, setCountStatus] = useState({});
    const getCountStatus = async () => {
        const result = await OrdersApi.getCountStatus();
        setCountStatus(result);
    }
    useEffect(() => {
        getCountStatus();
    }, []);
    const CustomNav = ({children, to, ...props}) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({path: resolved.pathname, end: true})
        return (
            <li className={`${match ? 'nav-order-active' : ''} nav-item-order`}>
                <Link className={`${match ? 'active-order-item' : ''} nav-link nav-link-order`}
                      to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
    const CustomMess = ({number}) => {
        return <div className={`${number === 0 ? '' : 'mess'}`}>{number === 0 ? null : number}</div>
    }
    return <div className="manage-order-nav">
        
        <ul className="nav nav-pills nav-orderrr">
            <div className='nav-btn'>
                <CustomNav to='../all'>Tất cả</CustomNav>
                <CustomMess number={countStatus.allStatus}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../pending'>Chờ xác nhận</CustomNav>
                <CustomMess number={countStatus.pending}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../confirmed'>Đã xác nhận</CustomNav>
                <CustomMess number={countStatus.confirmed}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../shipping'>Đang giao</CustomNav>
                <CustomMess number={countStatus.shipping}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../shipped'>Đã giao</CustomNav>
                <CustomMess number={countStatus.shipped}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../success'>Hoàn thành</CustomNav>
                <CustomMess number={countStatus.success}/>
            </div>
            <div className='nav-btn'>
                <CustomNav to='../cancel'>Hủy</CustomNav>
                <CustomMess number={countStatus.cancel}/>
            </div>
        </ul>
    </div>

}

export default NavOrder;