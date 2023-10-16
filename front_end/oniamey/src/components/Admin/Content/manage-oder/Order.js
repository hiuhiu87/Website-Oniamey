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
            </div>
        </div>

    );
}

export default Order;