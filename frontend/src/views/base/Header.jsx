import React from 'react'
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "../../views/auth/dashboard.css";
import FFH_logo from '../../assets/FFH_logo.webp'
import { Link } from "react-router-dom";


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
            <Link className="logo"  to="/">
              <img style={{ width: 60, height: 40, borderRadius: 50 }} src={FFH_logo} alt="" />
            </Link>
            <div className="container">
              <nav className="nav-menu">
                  <a href="#">Explore</a>
                  <a href="#">Boutiques</a>
                  <a href="#">Brand</a>
                  <a href="#">Sell Here</a>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
              </nav>
            </div>
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
