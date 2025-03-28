import { useState, useEffect } from 'react'
import "../../views/store/ProductDetail.css";
import apiInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';


export default function ProductDetail() {
    
    const [product, setProduct] =  useState({})
    const [specification, setSpecification] = useState([])
    const [gallery, setGallery] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])

    const param = useParams()
    console.log(param)

    useEffect(() => {
        apiInstance.get(`product/${param.slug}/`).then((res) => {
            setProduct(res.data)
            setSpecification(res.data.specification)
            setGallery(res.data.gallery)
            setColor(res.data.color)
            setSize(res.data.size)
        })
    }, [])
     


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
                                        
                                        min={1}
                                        
                                />
                            </div>

                        </div>

                        
                        <div className="color-selection">
                            <span>Select Colors:</span>
                            <div className="color-options">
                                {color?.map((c, index)=> (
                                    <buttton className='btn p-3 ms-2' style={{ backgroundColor: `${c.color_code}` }} ></buttton>
                                ))}
                                
                            </div>
                        </div>

                        
                        <div className="size-selection">
                            <span>Choose Size:</span>
                            <div className="d-flex">
                            {size?.map((s, index)=> (
                                    <div className={index}>
                                        <input  type='hidden' className='size_name' value={s.name}/>
                                        <button className='btn btn-secondary m-1 size_button' type='button'  >{s.name}</button>
                                </div>
                                ))}
                                
                            </div>
                        </div>

                    
                        <button type='button'
                                className='btn btn-primary btn-rounded me-2'
                                
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

        
        
      
    </div>
  )
}
