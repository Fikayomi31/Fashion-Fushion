import React from 'react'
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    
    <div className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark navbar-dark" id="sidebar" role="navigation" >
        <ul className="nav nav-pills flex-column mb-auto nav flex-column pl-1 pt-2">
            <li className="mb-3">
                <Link to="/vendor/dashboard/" className={"nav-link text-white active"}>
                    <i className="bi bi-speedometer" /> Dashboard{" "}
                </Link>
            </li>
            <li className="mb-3">
                <Link to="/vendor/products/" className={"nav-link text-white"}>
                    <i className="bi bi-grid" /> Products{" "}
                </Link>
            </li>
            <li className="mb-3">
                <Link to="/vendor/orders/" className={"nav-link text-white"}>
                    <i className="bi bi-cart-check" /> Orders{" "}
                </Link>
            </li>
            <li className="mb-3">
                <Link to="/vendor/earning/" className={"nav-link text-white"}>
                    <i className="bi bi-currency-dollar" /> Earning{" "}
                </Link>
            </li>
            <li className="mb-3">
                <Link to="/vendor/reviews/" className={"nav-link text-white"}>
                    <i className="bi bi-star" /> Reviews{" "}
                </Link>
            </li>
            <li className="mb-3">
                <Link to="/vendor/product/new/" className={"nav-link text-white"}>
                    <i className="bi bi-plus-circle" /> Add Product{" "}
                </Link>
            </li>

            <li className="mb-3">
                <Link to={`/vendor/coupon/`} className={"nav-link text-white"}>
                    <i className="bi bi-tag" /> Coupon &amp; Discount{" "}
                </Link>
            </li>

            <li className="mb-3">
                <Link to={`/vendor/notifications/`} className={"nav-link text-white"}>
                    <i className="bi bi-bell" /> Notifications{" "}
                </Link>
            </li>

            <li className="mb-3">
                <Link to="/vendor/settings/" className={"nav-link text-white"}>
                    <i className="bi bi-gear-fill" /> Settings{" "}
                </Link>
            </li>

            <li className="mb-3">
                <Link to="/logout" className={"nav-link text-white"}>
                    <i className="bi bi-box-arrow-left" /> Logout{" "}
                </Link>
            </li>
        </ul>
        <hr />
    </div>
  )
}
