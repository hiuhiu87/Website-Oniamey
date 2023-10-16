import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../BreadCrumbs/CumbStyle.css";

const BreadcrumbsPage = () => {
  const location = useLocation();

  let currentPath = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb != "")
    .map((crumb, index) => {
      currentPath += "/" + crumb;
      const hasNumber = /\d/.test(crumb);

      if (hasNumber) {
        return null; // Bỏ qua crumb chứa số
      }
      if (index + 1 === location.pathname.split("/").length - 1) {
        return (
          //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
          //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
          //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
           <li key={index} className="breadcrumb-item font-weight-bold mr-0 pr-0"> 
            <Link className={`black-text active-1`} to={currentPath}>
              <span>{crumb}</span>
            </Link>{" "}
          </li>
        );
      }
      return (
        //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
        //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
        //tao thêm key để nó không báo warning nữa chứ ko sửa gì đâu
        <li key={index} className="breadcrumb-item font-weight-bold">
          <Link className={`black-text text-uppercase`} to={currentPath}>
            <span>{crumb}</span>
          </Link>
        </li>
      );
    });

  return (
    <div className=" container container-breadcrumb pl-5">
      {/* <div class="row"> */}
      {/* <div class="col-auto col-md-10"> */}
      <nav aria-label="breadcrumb" className="first d-flex">
        <ol className="breadcrumb indigo lighten-6 first-1">{crumbs}</ol>
      </nav>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default BreadcrumbsPage;
