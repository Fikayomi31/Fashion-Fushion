import { useState, useEffect } from 'react';
import './cart.css';
import apiInstance from '../../utils/axios';
import CardID from '../plugin/CardID';
import UserData from '../plugin/UserData';
import GetCurrentAddress from '../plugin/UserCountry';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast:true,
    position:'top',
    showConfirmButton:false,
    timer:1500,
    timerProgressBar:true
  })


function Cart() {
  const [cart, setCart] = useState([])
  const cart_id = CardID()
  const userData = UserData()
  const [productQuantity, setProductQuantity] = useState('')
  const [cartTotal, setCartTotal] = useState([])

  const currentAddress = GetCurrentAddress()

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
    
  }

  useEffect(() => {
    const initialQuantity = {}
    cart.forEach((c) => {
      initialQuantity[c.product?.id] = c.qty

    })
    setProductQuantity(initialQuantity)  
  }, [cart])

  const handleQtyChange = (event, product_id) => {
    const quantity = event.target.value

    setProductQuantity((preQuantities) => ({
      ...preQuantities,
      [product_id]:quantity
    }))
  }

  const updateCart = async (product_id, price, shipping_amount, size, color) => {
    const qtyValue = productQuantity[product_id]

    const formdata = new FormData()

    formdata.append('product_id', product_id)
    formdata.append('user_id', userData?.user_id)
    formdata.append('qty', qtyValue)
    formdata.append('price', price)
    formdata.append('shipping_amount', shipping_amount)
    formdata.append('country', currentAddress.country)
    formdata.append('size', size)
    formdata.append('color', color)
    formdata.append('cart_id', cart_id)
    
    const response = await apiInstance.post('cart-view/', formdata)
    console.log(response.data)
    
    fetchCartData(cart_id, userData?.user_id)
    fetchCartTotal(cart_id, UserData?.user_id)
 
      Toast.fire({
        icon: 'success',
        title: response.data.message
      })
 
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
                    {c.size !== "No Size" &&
                      <p>Size: {c.size}</p>
                    }
                    {c.color !== "No Color" &&                    
                      <p>Color: {c.color}</p>
                    }
                    <p className="price">{c.product?.price}</p>
                  </div>
                </div>
                {/* Quantity */}
                <div className='col-md-2 mb-4 mb-md-0' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <div className='form-outline d-flex mb-4 '>                  
                    <input
                      style={{width: '70px'}}
                      type='number'
                      id='typeNumber'
                      className='form-control'
                      value={productQuantity[c.product?.id] || c.qty}
                      min={1}
                      onChange={(e) => handleQtyChange(e, c.product.id)}                                        
                    />
                    <button onClick={() => updateCart(cart_id, c.id, c.product.id, c.product.price, c.product.shipping_amount, c.color, c.size)} className='btn btn-primary ms-2'><i className='fas fa-rotate-right'></i>  </button>
                  </div>
                  
                    <a href="" className='text-danger pe-3'>
                      <small>
                        <i className='fas fa-trash me-2'/>
                          Remove
                      </small>
                    </a>
                  
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
