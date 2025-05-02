import {useState} from 'react'
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "../../views/auth/dashboard.css";
import FFH_logo from '../../assets/FFH_logo.webp'
import Icondashboard from '../../assets/Icondashboard.png'
import { Link } from "react-router-dom";
import { useAuthStore } from '../../store/auth';
import { CartContext } from "../plugin/Context";




export default function Header() {

  //const cartCount = useContext(CartContext)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  //const user = useAuthStore((state) => state.user);

  const [userDropdown, setUserDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);


  

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
              <Link to="/cart/">
                <FaShoppingCart />
              </Link>
             
          </div>
            {/* User icon - always visible regardless of login state */}
            <div style={{ position: 'relative', marginRight: '15px', display: 'block' }}>
                {isLoggedIn() 
                  ? 
                    // When logged in: Show dashboard icon
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
                          <Link to="/dashboard" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Dashboard</Link>
                          <Link to="/profile" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Profile</Link>
                          <Link to="/wishlist" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>My Wishlist</Link>
                          <Link to="/history" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>History</Link>
                          <Link to="/help" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Help</Link>
                          <Link to="/logout" style={{ display: 'block', padding: '8px 16px', color: 'red', fontWeight: 'bold', textDecoration: 'none' }}>Logout</Link>
                        </div>
                      )}
                    </div>
                  
                 : 
                  // When not logged in: Show user icon
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
                        <Link to="/login" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Register</Link>
                        <Link to="/help" style={{ display: 'block', padding: '8px 16px', color: '#333', textDecoration: 'none' }}>Help</Link>
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
