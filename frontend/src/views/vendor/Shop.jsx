import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SideBar from './SideBar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import moment from 'moment'
import Swal from 'sweetalert2'

import CardID from '../plugin/CardID'
import GetCurrentAddress from '../plugin/UserCountry'


function Shop() {
    const [vendor, setVendor] = useState([])
    const [products, setProducts] = useState([])
   
    const [category, setCategory] = useState([])
    const [colorValue, setColorValue] = useState('No Color')
    const [selectedColors, setSelectedColors] = useState({})
    const [selectedProduct, setSelectedProduct] = useState({})
    const [sizeValue, setSizeValue] = useState('No size')
    const [selectedSize, setSelectedSize] = useState({})
    const [qtyValue, setQtyValue] = useState(1)

    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    const cart_id = CardID()

    const param = useParams()

    useEffect(() => {
        apiInstance.get(`vendor/shop-view/${param.slug}/`).then((res) => {
            setVendor(res.data)
            console.log(res.data)
        })
    }, [])

    useEffect(() => {
        apiInstance.get(`vendor/shop-products/${param.slug}/`).then((res) => {
            setProducts(res.data)
            console.log(res.data)
            
        })
    }, [])
    
    const handleColorButtonClick = (event, product_id, colorName) => {
    setColorValue(colorName)
    setSelectedProduct(product_id)

    setSelectedColors((preSelectedColors) => ({
      ...preSelectedColors,
      [product_id]: colorName
    }))
  }
  
  const handleSizeButtonClick = (event, product_id, sizeName) => {
    setSizeValue(sizeName)
    setSelectedProduct(product_id)

    setSelectedSize((prevSelectedSize) => ({
      ...prevSelectedSize,
      [product_id]: sizeName
    }))
  }
  const handleQtyChange = (event, product_id) => {
    setQtyValue(event.target.value)
    setSelectedProduct(product_id)
  }

   const handleAddToCart = async (product_id, price, shipping_amount) => {
    try {
     const formdata = new FormData()
     formdata.append('product_id', product_id)
     formdata.append('user_id', userData?.user_id)
     formdata.append('qty', qtyValue)
     formdata.append('price', price)
     formdata.append('shipping_amount', shipping_amount)
     formdata.append('country', currentAddress.country)
     formdata.append('size', sizeValue)
     formdata.append('color', colorValue)
     formdata.append('cart_id', cart_id)

     const response = await apiInstance.post('cart-view/', formdata)
     console.log(response.data)

     Toast.fire({
      icon: 'success',
      title: response.data.message
     })

    } catch (error) {
     console.log(error)
    }


 }
  useEffect(() => {
    apiInstance.get(`/category`).then((res) => {
      setCategory(res.data)
    })
  }, [])
  useEffect(() => {
    apiInstance.get(`products/`).then((res) => {
      setProducts(res.data)

    })
  }, [])

 const addToWishlist = async (productId, userId) => {
         try {
             const formdata = new FormData();
             formdata.append('product_id', productId);
             formdata.append('user_id', userId);
             
             const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata);
             console.log(response.data);
             //fetchWishlist();
 
             Swal.fire({
                 title: response.data.message,
                 icon: 'success',
             })
 
 
         } catch (error) {
             console.log(error);
         }
     };

  return (
    <main className="mt-5">
        <div className="container">
            <section className="text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <img src={vendor.image} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }} alt="" />
                        <h1 className="fw-light">{vendor.shop_name}</h1>
                        <p className="lead text-muted">{vendor.description}</p>
                    </div>
                </div>
            </section>
            <section className="text-center">
                <h4 className="mb-4">{products.length} Product(s) </h4>
                <div className="row">
                    {/* Run the .map() function here */}
                    {products?.map((product, index) => (
                        <div className="col-lg-4 col-md-12 mb-4" key={index.id}>
                                    <div className="card">
                                      <div
                                        className="bg-image hover-zoom ripple"
                                        data-mdb-ripple-color="light"
                                      >
                                        <Link to={`/detail/${product.slug}`}>
                                          <img
                                            src={product.image}
                                            className="w-100"
                                            style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                          />
                                        </Link>
                                      </div>
                                      <div className="card-body">
                                        <a href='' className='text-reset'>
                                          <h5 className='card-title mb-3'>{product.title}</h5>
                                        </a>
                                        <a href='' className='text-reset'>
                                          <p>{product.category?.title}</p>
                                        </a>
                                        <div className='d-flex justify-content-center'>
                                          <h6 className='mb-3'>${product.price}</h6>
                                          <h6 className='mb-3 text-muted ms-2'><strike>${product.price}</strike></h6>
                                        </div>
                                        <div className='btn-group'>
                                          <button className='btn btn-primary dropdown-toggle'
                                            type='button'
                                            id='dropdownMenuClikable'
                                            data-bs-toggle='dropdown'
                                            data-bs-auto-close='false'
                                            aria-expanded='false'
                                          >
                                            Variation
                                          </button>
                                          <ul className='dropdown-menu'
                                            aria-labelledby='dropdownMenuClikable'
                    
                                          >
                                            <div className='d-flex flex-column'>
                                              <li className='p-1'>
                                                <b>Quantity</b>
                                              </li>
                                              <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                <li>
                                                  <input className='form-control' value={qtyValue} onChange={(e) => handleQtyChange(e, product.id)} type="number" />
                                                </li>
                                              </div>
                                            </div>
                                            {product.size?.length > 0 &&
                                              <div className='d-flex flex-column'>
                                                <li className='p-1'>
                                                  <b>Size</b>: {selectedSize[product.id] || 'Select a Size'}
                                                </li>
                                                <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                  {product.size?.map((s, index) => (
                                                    <li>
                                                      <button onClick={(e) => handleSizeButtonClick(e, product.id, s.name)} 
                                                        className='btn btn-secondary m-1 size_button'>
                                                        {s.name}
                                                      </button>
                                                    </li>
                                                  ))}
                    
                                                </div>
                    
                                              </div> 
                                            
                                            }
                                            {product.color?.length > 0 &&
                                              <div className='d-flex flex-column mt-3'>
                                                <li className='p-1'>
                                                  <b>Color</b>:{selectedColors[product.id] || 'Select a Color'}
                                                </li>
                                                <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                  {product.color?.map((c, index) => (
                                                    <li>
                                                      <button
                                                        className='btn btn-sm me-2 mb-1 p-3'
                                                        style={{ backgroundColor: `${c.color_code}`}}
                                                        onClick={(e) => handleColorButtonClick(e, product.id, c.name)}
                                                      />
                                                    </li>
                                                  ))}
                                                </div>
                                                
                                              </div>
                                            }
                                      
                    
                                          </ul>
                    
                                        </div>
                                       
                                        
                    
                                      </div>
                                      <div>
                                      <button
                                          type='button'
                                          className='btn btn-primary px-3 ms-2'
                                          onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                        >
                                          <i className='fas fa-shopping-cart' />
                                        </button>                                         
                                        <button
                                              
                                              type="button"
                                              className="btn btn-danger px-3 ms-2 "
                                              onClick={() => addToWishlist(product.id, userData?.user_id)}
                                             >
                                              <i className="fas fa-heart" />
                                        </button>
                                      </div>
                                    </div>
                        </div>
                    ))}
                    {/* .map() function end here */}
                </div>
            </section>
        </div>
    </main>
  )
}

export default Shop