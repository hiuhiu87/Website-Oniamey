import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import './Order.scss';
import NavOrder from './nav-order/NavOrder';
import OrderContent from './order-content/OrderContent';
import OrderDetail from './order-detail/OrderDetail'

const Order = (props) => {

    useEffect(() => {
    }, []);
    const CustomContent = ({ ...props }) => {
        return <OrderContent {...props} />
    }
    return (
        <div >
            <div className='order-content'>
                <Routes>
                    <Route path="/:id" element={<OrderDetail status="ALL" />} />
                    <Route path="all" element={<CustomContent status="ALL" />} />
                    <Route path="pending" element={<CustomContent status="PENDING" />} />
                    <Route path="confirmed" element={<CustomContent status="CONFIRMED" />} />
                    <Route path="shipping" element={<CustomContent status="SHIPPING" />} />
                    <Route path="shipped" element={<CustomContent status="SHIPPED" />} />
                    <Route path="success" element={<CustomContent status="SUCCESS" />} />
                    <Route path="cancel" element={<CustomContent status="CANCEL" />} />
                </Routes>
                <div>
                </div>
            </div>
        </div>

    );
}

export default Order;