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
import ManageProduct from "./components/Admin/Content/manage-product/product/ManageProduct";
import ManageCategory from "./components/Admin/Content/manage-product/category/ManageCategory";
import ManageBrand from "./components/Admin/Content/manage-product/brand/ManageBrand";
import ManageMaterial from "./components/Admin/Content/manage-product/material/ManageMaterial";
import ManageSize from "./components/Admin/Content/manage-product/size/ManageSize";
import ManageColor from "./components/Admin/Content/manage-product/color/ManageColor";
import ManageCollar from "./components/Admin/Content/manage-product/collar/ManageCollar";
import ManageSleeveLength from "./components/Admin/Content/manage-product/sleeve-length/ManageSleeveLength";
import Order from "./components/Admin/Content/manage-oder/Order";
import ManageVoucher from "./components/Admin/Content/manage-voucher/Voucher";
import ManageEmployee from "./components/Admin/Content/manage-user/layout/Employee";
import ManageCustomer from "./components/Admin/Content/manage-user/layout/Customer";
import ManageStatistical from "./components/Admin/Content/manage-statistical/Statistical";
import ModifyUserComponent from "./components/Admin/Content/manage-user/layout/ModifyUserComponent";
import DetaiCustomer from "./components/Admin/Content/manage-user/layout/DetailCustomer";
import LoginPage from "./components/Admin/Content/login-page/LoginPage";
import { AuthProvider } from "./authentication/AuthCustom";
import ProtectedRoute from "./authentication/ProtectedRoute";
import OAuth2RedirectHandler from "./authentication/OAuth2RedirectHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/facebook_callback/:token"
            element={<OAuth2RedirectHandler />}
          />
          <Route
            path="/google_callback/:token"
            element={<OAuth2RedirectHandler />}
          />
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="users" element={<User />}></Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="login?error=:code" element={<LoginPage />} />
          <Route
            path="/admins"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="sales-at-the-counter"
              element={
                <ProtectedRoute>
                  <SalesAtTheCounter />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-products"
              element={
                <ProtectedRoute>
                  <ManageProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-categories"
              element={
                <ProtectedRoute>
                  <ManageCategory />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-brands"
              element={
                <ProtectedRoute>
                  <ManageBrand />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-materials"
              element={
                <ProtectedRoute>
                  <ManageMaterial />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-sizes"
              element={
                <ProtectedRoute>
                  <ManageSize />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-colors"
              element={
                <ProtectedRoute>
                  <ManageColor />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-collars"
              element={
                <ProtectedRoute>
                  <ManageCollar />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-sleeve-lengths"
              element={
                <ProtectedRoute>
                  <ManageSleeveLength />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-orders/*"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-vouchers"
              element={
                <ProtectedRoute>
                  <ManageVoucher />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-employees"
              element={
                <ProtectedRoute>
                  <ManageEmployee />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-employees/add-employee"
              element={
                <ProtectedRoute>
                  <ModifyUserComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="manage-employees/update-employee/:id"
              element={
                <ProtectedRoute>
                  <ModifyUserComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admins/profile/:id"
              element={<ModifyUserComponent />}
            />
            <Route
              path="manage-customers"
              element={
                <ProtectedRoute>
                  <ManageCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="manage-customers/detail-customer/:id"
              element={
                <ProtectedRoute>
                  <DetaiCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="manage-customers/update-customer/:id"
              element={
                <ProtectedRoute>
                  <DetaiCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="manage-customers/add-customer"
              element={
                <ProtectedRoute>
                  <DetaiCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="manage-statisticals"
              element={
                <ProtectedRoute>
                  <ManageStatistical />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
