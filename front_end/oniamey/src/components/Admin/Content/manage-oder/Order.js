<<<<<<< HEAD
 import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import './Order.scss';
import NavOrder from './nav-order/NavOrder';
import OrderContent from './order-content/OrderContent';
import OrderDetail from './order-detail/OrderDetail'

const Order = (props) => {

    useEffect(() => {
    }, []);
    const CustomContent = ({...props}) => {
        return <OrderContent {...props} />
    }
    return (
        <div>
            <div className='manage-order-contentt'>
                <Routes>
                    <Route path="/:id" element={<OrderDetail status="ALL"/>}/>
                    <Route path="all" element={<CustomContent status="ALL"/>}/>
                    <Route path="pending" element={<CustomContent status="PENDING"/>}/>
                    <Route path="confirmed" element={<CustomContent status="CONFIRMED"/>}/>
                    <Route path="shipping" element={<CustomContent status="SHIPPING"/>}/>
                    <Route path="shipped" element={<CustomContent status="SHIPPED"/>}/>
                    <Route path="success" element={<CustomContent status="SUCCESS"/>}/>
                    <Route path="cancel" element={<CustomContent status="CANCEL"/>}/>
                </Routes>
                <div>
                </div>
=======
import { Routes, Route } from "react-router-dom";
import {  useEffect} from "react";
import './Order.scss';
import NavOrder from './nav-order/NavOrder';
import OrderContent from './order-content/OrderContent';

const Order = (props) => {
  
    useEffect(() => {
    }, []);
    const CustomContent=({...props})=>{
        return <OrderContent {...props}/>
    }
    return (
        <div >
            <div className='nav-order'>
                <NavOrder/>
            </div>
            <div className='order-content'>
                <Routes>
                <Route path="pending"  element={<CustomContent status="PENDING"  />}/>
                <Route path="awaiting-pickup" element={<CustomContent status="AWAITING_PICKUP" />} />
                <Route path="shipping" element={<CustomContent status="SHIPPING" />} />
                <Route path="shipped" element={<CustomContent status="SHIPPED" />} />
                <Route path="cancel" element={<CustomContent status="CANCEL" />} />
                <Route path="awaiting-payment" element={<CustomContent status="AWAITING_PAYMENT" />} />
                </Routes>
                <div>
            </div>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
            </div>
        </div>

    );
}

export default Order;
