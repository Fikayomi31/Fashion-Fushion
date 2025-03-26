import React from 'react'
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <div>
        
      <div className="announcement-bar">
        <div className="container">
          Sign up and get 20% off on your first order.{" "}
          <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
            Sign Up Now
          </a>
          <button className="close-btn">×</button>
        </div>
      </div>

      
      <header className="header">
        <div className="container">
          <div className="nav-container">
            <a href="#" className="logo">
              <img
                src="https://via.placeholder.com/100x40"
                alt="SHOP.CO"
              />
            </a>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button>
                <FaSearch />
              </button>
            </div>
            <div className="nav-icons">
              <a href="#">
                <FaHeart />
              </a>
              <a href="#">
                <FaShoppingCart />
              </a>
              <a href="#">
                <FaUser />
              </a>
            </div>
          </div>
        </div>
      </header>
      
    </div>
  )
}
