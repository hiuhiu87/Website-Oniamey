import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/dashboard/DashBoard";
import SalesAtTheCounter from "./components/Admin/Content/sales-at-the-counter/SalesAtTheCounter";
import ManageProduct from "./components/Admin/Content/manage-product/product/ManageProduct";
import AddProduct from './components/Admin/Content/manage-product/product/AddProduct'
import UpdateProduct from './components/Admin/Content/manage-product/product/UpdateProduct'
import ManageCategory from "./components/Admin/Content/manage-product/category/ManageCategory";
import ManageBrand from "./components/Admin/Content/manage-product/brand/ManageBrand";
import ManageMaterial from "./components/Admin/Content/manage-product/material/ManageMaterial";
import ManageSize from "./components/Admin/Content/manage-product/size/ManageSize";
import ManageColor from "./components/Admin/Content/manage-product/color/ManageColor";
import ManageCollar from "./components/Admin/Content/manage-product/collar/ManageCollar";
import ManageSleeveLength from "./components/Admin/Content/manage-product/sleeve-length/ManageSleeveLength";
import Order from "./components/Admin/Content/manage-oder/Order";
import OrderDetail from "./components/Admin/Content/manage-oder/order-detail/OrderDetail";
import ManageVoucher from "./components/Admin/Content/manage-voucher/Voucher";
import ManageEmployee from "./components/Admin/Content/manage-user/layout/Employee";
import ManageCustomer from "./components/Admin/Content/manage-user/layout/Customer";
import ManageStatistical from "./components/Admin/Content/manage-statistical/Statistical";
import ModifyUserComponent from "./components/Admin/Content/manage-user/layout/ModifyUserComponent";
import DetailCustomer from "./components/Admin/Content/manage-user/layout/DetailCustomer";
import LoginPage from "./components/Admin/Content/login-page/LoginPage";
import ManagePromotion from "./components/Admin/Content/manage-promotion/ManagePromotion";
import ModifyPromotion from "./components/Admin/Content/manage-promotion/ModifyPromotion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Provider store={store}>
        {/* <React.StrictMode> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}></Route>
                    <Route path="users" element={<User/>}></Route>
                </Route>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="/admins" element={<Admin/>}>
                    <Route index element={<DashBoard/>}></Route>
                    <Route
                        path="sales-at-the-counter"
                        element={<SalesAtTheCounter/>}
                    ></Route>
                </Route>
                <Route path="manage-products" element={<ManageProduct/>}></Route>
                <Route path="update-products/:productId" element={<UpdateProduct/>}></Route>
                <Route path="add-products" element={<AddProduct/>}></Route>
                <Route path="manage-categories" element={<ManageCategory/>}></Route>
                <Route path="manage-brands" element={<ManageBrand/>}></Route>
                <Route path="manage-materials" element={<ManageMaterial/>}></Route>
                <Route path="manage-sizes" element={<ManageSize/>}></Route>
                <Route path="manage-colors" element={<ManageColor/>}></Route>
                <Route path="manage-collars" element={<ManageCollar/>}></Route>
                <Route
                    path="manage-sleeve-lengths"
                    element={<ManageSleeveLength/>}
                ></Route>
                <Route path="manage-orders/*" element={<Order/>}></Route>
                <Route path="manage-vouchers" element={<ManageVoucher/>}></Route>
                <Route path="manage-employees" element={<ManageEmployee/>}></Route>
                <Route
                    path="manage-employees/add-employee"
                    element={<ModifyUserComponent/>}
                ></Route>
                <Route
                    path="manage-employees/update-employee/:id"
                    element={<ModifyUserComponent/>}
                ></Route>
                <Route path="manage-customers" element={<ManageCustomer/>}/>
                <Route
                    path="manage-customers/detail-customer/:id"
                    element={<DetailCustomer/>}
                />
                <Route
                    path="manage-customers/update-customer/:id"
                    element={<DetailCustomer/>}
                />
                <Route
                    path="manage-customers/add-customer"
                    element={<DetailCustomer/>}
                />
                <Route
                    path="manage-statisticals"
                    element={<ManageStatistical/>}
                ></Route>
                <Route path="manage-promotion" element={<ManagePromotion/>}/>
                <Route
                    path="manage-promotion/add-promotion"
                    element={<ModifyPromotion/>}
                />
                <Route
                    path="manage-promotion/update-promotion/:id"
                    element={<ModifyPromotion/>}
                />
            </Routes>
        </BrowserRouter>
    </Provider>
    /* </React.StrictMode> */

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
