import './NavOrder.scss'
import { Link } from "react-router-dom"
const  NavOrder= ()=>{

    return <div className="nav-order">
            <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link className="nav-link active" to='xa'>Chờ xác nhận</Link>
                </li>
             <li className="nav-item">
                   <a className="nav-link" href="#">Chờ lấy hàng</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Chờ đang giao</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Hoàn thành</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Hủy</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Chờ thanh toán</a>
             </li>
        </ul>
    </div>

}

export default NavOrder;