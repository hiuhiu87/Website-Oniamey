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
                {/* <OrderContent/> */}
                <Route path="" element={<OrderContent />} />
            </div>
        </div>

    );
}

export default Order;