import { useState, useEffect } from 'react'
import "../../views/store/ProductDetail.css";
import apiInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CardID from '../plugin/CardID';
import './cart.css';

const Toast = Swal.mixin({
    toast:true,
    position:'top',
    showConfirmButton:false,
    timer:1500,
    timerProgressBar:true
  })



export default function ProductDetail() {
    
    const [product, setProduct] =  useState({})
    const [specification, setSpecification] = useState([])
    const [gallery, setGallery] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])

    const [colorValue, setColorValue] = useState('No Color')
    const [sizeValue, setSizeValue] = useState('No Size')
    const [qtyValue, setQtyValue] = useState(1)

    const param = useParams()

    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    const cart_id = CardID()

    console.log(currentAddress)

    console.log(userData)
    console.log(cart_id)

    const handleColorButtonClick = (e) => {
        const colorNameInput = e.target.closest('.color_button').parentNode.querySelector('.color_name')
        setColorValue(colorNameInput.value)
    }
    const handleSizeButtonClick = (e) => {
        const sizeNameInput = e.target.closest('.size_button').parentNode.querySelector('.size_name')
        setSizeValue(sizeNameInput.value)
    }

    const handleQuantityChange = (e) => {
        setQtyValue(e.target.value)
    }


    useEffect(() => {
        apiInstance.get(`product/${param.slug}/`).then((res) => {
            setProduct(res.data)
            setSpecification(res.data.specification)
            setGallery(res.data.gallery)
            setColor(res.data.color)
            setSize(res.data.size)
        })
    }, [])
     
    const handleAddToCart = async () => {
        try {
         const formdata = new FormData()
         formdata.append('product_id', product.id)
         formdata.append('user_id', userData?.user_id)
         formdata.append('qty', qtyValue)
         formdata.append('price', product.price)
         formdata.append('shipping_amount', product.shipping_amount)
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


  return (
    <div>
       
        <section classNameName="product-detail">
            <div className="container">
                <div className="product-content">
                    
                    <div className='col-md-6 mb-4 mb-md-0'>
                            {/* Gallery */}
                            <div className=''>
                                <div className='row gx-2 gx-lg-3'>
                                    <div className='col-12 col-lg-12'>
                                        <div className='lightbox'>
                                            <img src={product.image}
                                                style={{
                                                    width: "100%",
                                                    height: 500,
                                                    objectFit: ConvolverNode,
                                                    borderRadius: 10
                                                }}
                                                alt='gallery image 1'
                                                className='ecommence-gallery-main-img active w-100 rounded-4'
                                            />
                                        </div>
                                    </div>                 
                                </div>
                                <div className='mt-3 d-flex'>
                                    {gallery.map((g, index) => (
                                        <div className='p-3' key={index}>
                                            <img src={g.image}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    objectFit: "cover",
                                                    boarderRadius: 10
                                                }}
                                                alt="Gallery image 1"
                                                className='ecommence-gallery-main-img active w-100 rounded-4'
                                            />

                                        </div>
                                    ))}

                                </div>
                                
                            </div>

                    </div>

                    
                    <div className="product-info">
                        <h1>{product.title}</h1>
                        <div className="rating">
                            ⭐⭐⭐⭐⭐ <span>4.5/5</span>
                        </div>
                        <div className="price">
                            <span className="current-price">{product.price}</span>
                            <span className="original-price">{product.old_price}</span>
                            <span className="discount">{product.discount}</span>
                        </div>
                        <p className="description">
                            {product.description}
                        </p>
                        <div className='table-responsive'>
                            <table className='table table-sm table-borderless mb-0'>
                                <tbody>
                                    <tr>
                                        <th className='ps-0 w-25' scope='row'>
                                            {" "}
                                            <strong>Category</strong>
                                        </th>
                                        <td>{product.category?.title}</td>
                                        </tr>
                                        {specification.map((s, index) => (
                                            <tr className={index}>
                                            <th className='ps-0 w-25' scope='row'>
                                                <strong>{s.title}</strong>
                                            </th>
                                            <td>{s.content}</td>
                                            </tr>
                                        ))}                                                                                                                              
                                        </tbody>
                                    </table>

                                </div>
                        {/* Quantity */}
                        <div className='col-md-6 mb-4'>
                            <div className='form-outline'>
                                <label className='form-label' htmlFor="typeNumber">Quantity</label> 
                                    <input
                                        type='number'
                                        id='typeNumber'
                                        className='form-control'
                                        value={qtyValue}
                                        min={1}
                                        onChange={handleQuantityChange}
                                        
                                />
                            </div>

                        </div>

                        
                        <div className="color-selection">
                            {color.length > 0 &&
                                <>
                                    <span>Select Colors: {colorValue}</span>
                                    <div className="color-options">
                                        {color?.map((c, index)=> (
                                            <div className={index}>
                                                <input type='hidden' className='color_name' value={c.name} name='' id='' />
                                                <button className='btn p-3 m-1 color_button' type='button' onClick={handleColorButtonClick} style={{backgroundColor: `${c.color_code}`}}>
                                                </button>
                                            </div>
                                        ))}
                                
                                    </div>
                                </>
                            }
                            
                        </div>

                        
                        <div className="size-selection">
                            {size.length > 0 &&
                                <>
                                    <span>Choose Size: {sizeValue}</span>
                                    <div className="d-flex">
                                    {size?.map((s, index)=> (
                                        <div className={index}>
                                            <input  type='hidden' className='size_name'  value={s.name}/>
                                            <button className='btn btn-secondary m-1 size_button' type='button' onClick={handleSizeButtonClick}  >{s.name}</button>
                                        </div>
                                    ))}
                                
                                    </div>

                                </>
                            
                            }
                            
                        </div>

                    
                        <button type='button'
                                className='btn btn-primary btn-rounded me-2'
                                onClick={handleAddToCart}
                                
                            >
                            <i className='fas fa-cart-plus me-2' />
                                Add to Cart
                            </button>
                        <button href="#!"
                            type='button'
                            className='btn btn-danger btn-floating'
                            data-mdb-toggle='tooltip'
                            title="Add to wishlist"
                        >
                            <i className='fas fa-heart' />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section className="related-products">
            <div className="container">
                <h2>You Might Also Like</h2>
                <div className="product-grid">
                    <div className="product-card">
                        <img src="https://via.placeholder.com/150" alt="Product" />
                        <h3>Polo with Contrast Trims</h3>
                        <span>⭐⭐⭐⭐ 4.0/5</span>
                        <p>$212 <del>$242</del> <span>-20%</span></p>
                    </div>
                    <div className="product-card">
                        <img src="https://via.placeholder.com/150" alt="Product" />
                        <h3>Gradient Graphic T-shirt</h3>
                        <span>⭐⭐⭐ 3.5/5</span>
                        <p>$145</p>
                    </div>
                    <div className="product-card">
                        <img src="https://via.placeholder.com/150" alt="Product" />
                        <h3>Polo with Tipping Details</h3>
                        <span>⭐⭐⭐⭐⭐ 4.5/5</span>
                        <p>$180</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="reviews">
            <div className="container">
                <h2>All Reviews (451)</h2>
                <div className="reviews-list">
                    <div className="review">
                        <h4>Samantha D. ⭐⭐⭐⭐⭐</h4>
                        <p>"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable."</p>
                    </div>
                    <div className="review">
                        <h4>Alex M. ⭐⭐⭐⭐⭐</h4>
                        <p>"The colors are vibrant and the print quality is top-notch. Definitely gets a thumbs up from me."</p>
                    </div>
                    <div className="review">
                        <h4>Ethan R. ⭐⭐⭐⭐⭐</h4>
                        <p>"This t-shirt is a must-have for anyone who appreciates good design."</p>
                    </div>
                </div>
                <button className="load-more">Load More Reviews</button>
            </div>
        </section>

        {/* Newsletter Subscription */}
      <div className="newsletter">
        <h2>Stay Up To Date About Our Latest Offers</h2>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe to Newsletter</button>
        </div>
      </div>
        
      
    </div>
  )
}
