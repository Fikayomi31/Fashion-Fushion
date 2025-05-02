import {useState, useEffect} from 'react';
import './cart.css';
import apiInstance from '../../utils/axios';
import CardID from '../plugin/CardID';
import UserData from '../plugin/UserData';

function Cart() {
  const [cart, setCart] = useState([])
  const cart_id = CardID()
  const userData = UserData()

  const fetchCartData = (cartId, userId) => {
    const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cart}/`
    apiInstance.get(url).then((res) => {
      console.log(res.data)
    })
  }
  if (cart_id !== null || cart_id !== undefined) {
    if (UserData !== undefined) {
      // Send Cart Data with UserId and CartId
      useEffect(() => {
        fetchCartData(cart_id, userData?.user_id)
      })
    } else {
      // Send cart data without UserId but only cartId

    }

  }


  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-grid">
          {/* Cart Items Section */}
          <div className="cart-items">
            <div className="cart-item">
              <div className="item-info">
                <img src="https://via.placeholder.com/100" alt="Product 1" />
                <div>
                  <h3>Gradient Graphic T-shirt</h3>
                  <p>Size: Large</p>
                  <p>Color: White</p>
                  <p className="price">$145</p>
                </div>
              </div>
              <div className="item-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
                <button className="remove-btn">Remove</button>
              </div>
            </div>

            
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div><span>Subtotal</span><span>$565</span></div>
              <div><span>Discount (20%)</span><span className="discount">-$113</span></div>
              <div><span>Delivery Fee</span><span>$15</span></div>
              <div><span>Service Fee</span><span>$15</span></div>
              <div><span>Tax Fee</span><span>$15</span></div>

              <hr />
              <div className="summary-total"><span>Total</span><span>$467</span></div>
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
