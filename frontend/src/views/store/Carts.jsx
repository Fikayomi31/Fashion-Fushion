import React from 'react';
import './cart.css';

const CartPage = () => {
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
                  <p>Size: Large, Color: White</p>
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

            <div className="cart-item">
              <div className="item-info">
                <img src="https://via.placeholder.com/100" alt="Product 2" />
                <div>
                  <h3>Checkered Shirt</h3>
                  <p>Size: Medium, Color: Red</p>
                  <p className="price">$180</p>
                </div>
              </div>
              <div className="item-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
                <button className="remove-btn">Remove</button>
              </div>
            </div>

            <div className="cart-item">
              <div className="item-info">
                <img src="https://via.placeholder.com/100" alt="Product 3" />
                <div>
                  <h3>Skinny Fit Jeans</h3>
                  <p>Size: Large, Color: Blue</p>
                  <p className="price">$240</p>
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

export default CartPage;
