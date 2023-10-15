import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/dashboard/DashBoard";
import SalesAtTheCounter from "./components/Admin/Content/sales-at-the-counter/SalesAtTheCounter";
import ManageProduct from "./components/Admin/Content/manage-product/product/Product";
import ManageCategory from "./components/Admin/Content/manage-product/category/ManageCategory";
import ManageBrand from "./components/Admin/Content/manage-product/brand/ManageBrand";
import ManageMaterial from "./components/Admin/Content/manage-product/material/ManageMaterial";
import ManageSize from "./components/Admin/Content/manage-product/size/ManageSize";
import ManageColor from "./components/Admin/Content/manage-product/color/ManageColor";
import ManageCollar from "./components/Admin/Content/manage-product/collar/ManageCollar";
import ManageSleeveLength from "./components/Admin/Content/manage-product/sleeve-length/ManageSleeveLength";
import ManageOrder from "./components/Admin/Content/manage-oder/Order";
import ManageVoucher from "./components/Admin/Content/manage-voucher/Voucher";
import ManageEmployee from "./components/Admin/Content/manage-user/Employee";
import ManageCustomer from "./components/Admin/Content/manage-user/Customer";
import ManageStatistical from "./components/Admin/Content/manage-statistical/Statistical";
import ModifyUserComponent from "./components/Admin/Content/manage-user/ModifyUserComponent";
import DetaiCustomer from "./components/Admin/Content/manage-user/DetailCustomer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="users" element={<User />}></Route>
        </Route>

        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />}></Route>
          <Route
            path="sales-at-the-counter"
            element={<SalesAtTheCounter />}
          ></Route>
          <Route path="manage-products" element={<ManageProduct />}></Route>
          <Route path="manage-categories" element={<ManageCategory />}></Route>
          <Route path="manage-brands" element={<ManageBrand />}></Route>
          <Route path="manage-materials" element={<ManageMaterial />}></Route>
          <Route path="manage-sizes" element={<ManageSize />}></Route>
          <Route path="manage-colors" element={<ManageColor />}></Route>
          <Route path="manage-collars" element={<ManageCollar />}></Route>
          <Route
            path="manage-sleeve-lengths"
            element={<ManageSleeveLength />}
          ></Route>
          <Route path="manage-orders" element={<ManageOrder />}></Route>
          <Route path="manage-vouchers" element={<ManageVoucher />}></Route>
          <Route path="manage-employees" element={<ManageEmployee />}></Route>
          <Route path="manage-customers" element={<ManageCustomer />}></Route>
          <Route
            path="manage-statisticals"
            element={<ManageStatistical />}
          ></Route>
          <Route
            path="manage-customers/add-employee"
            element={<ModifyUserComponent />}
          ></Route>
          <Route
            path="manage-customers/update-employee"
            element={<ModifyUserComponent />}
          ></Route>
          <Route
            path="manage-customers/detail-customer/:id"
            element={<DetaiCustomer />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
