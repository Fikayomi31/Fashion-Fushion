import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import FFH_logo from "../../assets/FFH_logo.webp";
import Icondashboard from "../../assets/Icondashboard.png";
import "../../views/store/home.css";

export default function Header() {
  const navigate = useNavigate();

  // Get auth info from Zustand store
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const [search, setSearch] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
    }
  };

  return (
    <div>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          Sign up and get 20% off on your first order.{" "}
          <Link to="/register" style={{ color: "#fff", textDecoration: "underline" }}>
            Sign Up Now
          </Link>
          <button className="close-btn">×</button>
        </div>
      </div>

      {/* Header */}
      <header className="header p-0">
        <div className="container">
          <div className="nav-container">
            {/* Logo */}
            <Link className="logo" to="/">
              <img
                style={{ width: 60, height: 40, borderRadius: 50 }}
                src={FFH_logo}
                alt="Logo"
              />
            </Link>

            {/* Navigation Menu */}
            <nav className="nav-menu">
              <a href="#">Explore</a>
              <a href="#">Boutiques</a>
              <a href="#">Brand</a>
              <a href="#">Sell Here</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav>

            {/* Search Bar */}
            <div className="d-flex">
              <input
                onChange={handleSearchChange}
                value={search}
                name="search"
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={handleSearchSubmit}
                className="btn btn-outline-success me-2"
                type="submit"
              >
                Search
              </button>
            </div>

            {/* Icons Section */}
            <div className="nav-icons">
              <a href="#">
                <FaHeart />
              </a>
              <Link to="/cart/">
                <FaShoppingCart />
              </Link>
            </div>

            {/* User Section */}
            <div
              style={{
                position: "relative",
                marginRight: "15px",
                display: "block",
              }}
            >
              {isLoggedIn() && user ? (
                // When logged in
                <div style={{ display: "block" }}>
                  <button
                    onClick={() => setMenuDropdown(!menuDropdown)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <img
                      src={Icondashboard}
                      alt="Menu"
                      style={{
                        width: "35px",
                        height: "20px",
                        marginTop: "5px",
                      }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {menuDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        marginTop: "8px",
                        width: "200px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                        padding: "8px 0",
                        zIndex: 10,
                      }}
                    >
                      {/* Vendor Menu */}
                      {user.is_vendor ? (
                        <>
                          <Link
                            to="/vendor/dashboard"
                            className="dropdown-item"
                          >
                            Dashboard
                          </Link>
                          <Link to="/vendor/products" className="dropdown-item">
                            Products
                          </Link>
                          <Link to="/vendor/orders" className="dropdown-item">
                            Orders
                          </Link>
                          <Link to="/vendor/earning" className="dropdown-item">
                            Earning
                          </Link>
                          <Link to="/vendor/settings" className="dropdown-item">
                            Settings
                          </Link>
                        </>
                      ) : (
                        // Customer Menu
                        <>
                          <Link
                            to="/customer/account"
                            className="dropdown-item"
                          >
                            Dashboard
                          </Link>
                          <Link to="/wishlist" className="dropdown-item">
                            My Wishlist
                          </Link>
                          <Link to="/customer/order" className="dropdown-item">
                            Orders
                          </Link>
                          <Link to="/help" className="dropdown-item">
                            Help
                          </Link>
                        </>
                      )}

                      {/* Logout */}
                      <Link
                        to="/logout"
                        className="dropdown-item"
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                // When NOT logged in
                <div style={{ display: "block" }}>
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <FaUser
                      style={{ width: "20px", height: "20px", color: "#444" }}
                    />
                  </button>

                  {/* Guest Dropdown */}
                  {userDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        marginTop: "8px",
                        width: "150px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                        padding: "8px 0",
                        zIndex: 10,
                      }}
                    >
                      <Link
                        to="/login"
                        className="dropdown-item"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        Register
                      </Link>
                      <Link
                        to="/help"
                        className="dropdown-item"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        Help
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
