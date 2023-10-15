import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Order.scss'
import NavOrder from './nav-order/NavOrder';
import OrderContent from './order-content/OrderContent'

const Order = (props) => {
    
    return (
        <div>
            <div className='nav-order'>
                <NavOrder />
            </div>
            <div className='order-content'>
                <Routes>
                <Route path="pending" element={<OrderContent status="PENDING"/>} />
                <Route path="awaiting-pickup" element={<OrderContent status="AWAITING_PICKUP"/>} />
                <Route path="shipping" element={<OrderContent status="SHIPPING"/>} />
                <Route path="shipped" element={<OrderContent status="SHIPPED"/>} />
                <Route path="cancel" element={<OrderContent status="CANCEL"/>} />
                <Route path="awaiting-payment" element={<OrderContent status="AWAITING_PAYMENT" />} />
                </Routes>
            </div>
        </div>

    );
}

export default Order;