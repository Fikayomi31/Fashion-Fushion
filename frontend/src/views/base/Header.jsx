import {useState} from 'react'
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "../../views/store/home.css";
import FFH_logo from '../../assets/FFH_logo.webp'
import Icondashboard from '../../assets/Icondashboard.png'
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/auth';
import { CartContext } from "../plugin/Context";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.allUserDate);  // Access allUserDate directly
  
  // Check if user is a vendor
  const isVendor = user && user.role === 'vendor';
  
  console.log(user?.user_id, user?.username, user?.role);
  
  const [userDropdown, setUserDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search)
  }
  
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    navigate(`/search?query=${search}`);
  }
  
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

      <header className="header p-0" >
        <div className="container">
          <div className="nav-container">
            <Link className="logo"  to="/">
              <img style={{ width: 60, height: 40, borderRadius: 50 }} src={FFH_logo} alt="" />
            </Link>
            
            <nav className="nav-menu">
              <a href="#">Explore</a>
              <a href="#">Boutiques</a>
              <a href="#">Brand</a>
              <a href="#">Sell Here</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav>
            
            <div className="d-flex">
              <input 
                onChange={handleSearchChange} 
                name='search' 
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
            
            <div className="nav-icons">
              <a href="#">
                <FaHeart />
              </a>
              <Link to="/cart/">
                <FaShoppingCart />
              </Link>
            </div>
            
            {/* User/Vendor Menu */}
            <div style={{ position: 'relative', marginRight: '15px', display: 'block' }}>
              {isLoggedIn() 
                ? 
                  <div style={{ display: 'block' }}>
                    <button 
                      onClick={() => setMenuDropdown(!menuDropdown)} 
                      style={{ 
                        background: 'transparent', 
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '10px',
                      }}
                    >
                      <img src={Icondashboard} alt="Menu" style={{ width: '35px', height: '20px', marginTop: '5px' }} />
                    </button>
                    
                    {menuDropdown && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        marginTop: '8px',
                        width: '180px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '4px',
                        padding: '8px 0',
                        zIndex: 10
                      }}>
                        {/* Show different menu based on user role */}
                        {isVendor ? (
                          <>
                            {/* Vendor Menu */}
                            <Link to="/vendor/dashboard" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              Vendor Dashboard
                            </Link>
                            <Link to="/vendor/products" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              My Products
                            </Link>
                            <Link to="/vendor/orders" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              Orders
                            </Link>
                            <Link to="/vendor/settings" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              Shop Settings
                            </Link>
                          </>
                        ) : (
                          <>
                            {/* Customer Menu */}
                            <Link to="/customer/account" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              Dashboard
                            </Link>
                            <Link to="/wishlist" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              My Wishlist
                            </Link>
                            <Link to="/customer/order" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                              Orders
                            </Link>
                          </>
                        )}
                        
                        {/* Common menu items */}
                        <Link to="/help" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                          Help
                        </Link>
                        <Link to="/logout" style={{ display: 'block', padding: '8px 16px', color: 'red', fontWeight: 'bold', textDecoration: 'none' }}>
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                : 
                  <div style={{ display: 'block' }}>
                    <button 
                      onClick={() => setUserDropdown(!userDropdown)} 
                      style={{ 
                        background: 'transparent', 
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '10px',
                      }}
                    >
                      <FaUser style={{ width: '20px', height: '20px', color: '#444' }} />
                    </button>
                    
                    {userDropdown && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        marginTop: '8px',
                        width: '150px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '4px',
                        padding: '8px 0',
                        zIndex: 10
                      }}>
                        <Link to="/login" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                          Login
                        </Link>
                        <Link to="/register" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                          Register
                        </Link>
                        <Link to="/help" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>
                          Help
                        </Link>
                      </div>
                    )}
                  </div>
              }
            </div>
          </div>
        </div>
      </header>
    </div> 
  )
}