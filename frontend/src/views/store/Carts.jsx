import { useState, useEffect } from 'react';
import './cart.css';
import apiInstance from '../../utils/axios';
import CardID from '../plugin/CardID';
import UserData from '../plugin/UserData';

function Cart() {
  const [cart, setCart] = useState([])
  const cart_id = CardID()
  const userData = UserData()
  const [quantity, setQuantity] = useState(1);
  const [effectClass, setEffectClass] = useState('');
  const [cartTotal, setCartTotal] = useState([])

  const handleDecrease = () => {
    if (quantity > 1) { // Prevent quantity from going below 1
      setQuantity(prevQuantity => prevQuantity - 1);
      triggerEffect(); // Trigger visual effect
    }
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    triggerEffect(); // Trigger visual effect
  };

  // Function to add a temporary CSS class for visual effect
  const triggerEffect = () => {
    setEffectClass('quantity-effect'); // Add the class
    const timer = setTimeout(() => {
      setEffectClass(''); // Remove the class after a short delay
    }, 300); // Adjust delay as needed for your animation
    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  };

  const fetchCartData = (cartId, userId) => {
    const url = userId ? `cart-list/${cartId}/${userId}` : `cart-list/${cartId}`
    apiInstance.get(url).then((res) => {
      setCart(res.data)
    })
    
  }

  const fetchCartTotal = (cartId, userId) => {
    const url = userId ? `cart-detail/${cartId}/${userId}` : `cart-detail/${cartId}`
    apiInstance.get(url).then((res) => {
      setCartTotal(res.data)
    })
    
  }

  if (cart_id !== null || cart_id !== undefined) {
    if (UserData !== undefined) {
      // Send Cart Data with UserId and CartId
      useEffect(() => {
        fetchCartData(cart_id, userData?.user_id)
        fetchCartTotal(cart_id, userData?.user_id)
      }, [])
      
    } else {
      // Send cart data without UserId but only cartId
      useEffect(() => {
        fetchCartData(cart_id, null)
        fetchCartTotal(cart_id, null)
      }, [])

      
    }
    console.log(cartTotal)

  }
  


  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-grid">
          {/* Cart Items Section */}
          <div className="cart-items">
            {cart?.map((c, index) => (            
              <div className="cart-item" key={index}>
                <div className="item-info">
                  <img src={c.product?.image} alt="Product 1" />
                  <div>
                    <h3>{c.product?.title}</h3>
                    {c.size !== "No size" &&
                      <p>Size: {c.size}</p>
                    }
                    {c.color !== "No color" &&                    
                      <p>Color: {c.color}</p>
                    }
                    <p className="price">{c.product?.price}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={handleDecrease}>-</button>
                  {/* Display the state variable and apply the effect class */}
                  <span className={effectClass}>{c.qty}</span>
                  <button onClick={handleIncrease}>+</button> 
                  <button className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          {cart.length < 1 &&
            <h4>Your Cart is Empty</h4>
          }
            
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div><span>Subtotal</span><span>{cartTotal.sub_total?.toFixed(2)}</span></div>
              <div><span>Discount (20%)</span><span className="discount">-$113</span></div>
              <div><span>Delivery Fee</span><span>{cartTotal.shipping?.toFixed(2)}</span></div>
              <div><span>Service Fee</span><span>{cartTotal.service?.toFixed(2)}</span></div>
              <div><span>Tax Fee</span><span>{cartTotal.tax?.toFixed(2)}</span></div>

              <hr />
              <div className="summary-total"><span>Total</span><span>{cartTotal.total?.toFixed(2)}</span></div>
            </div>
            <div className="promo-section">
              <input type="text" placeholder="Add promo code" />
              <button>Apply</button>
            </div>
            <button className="checkout-btn">Go to Checkout →</button>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="newsletter">
        <h2>Stay Up To Date About Our Latest Offers</h2>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe to Newsletter</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
