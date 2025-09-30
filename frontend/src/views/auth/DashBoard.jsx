import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../views/auth/dashboard.css";
//import { useAuthStore } from "../../store/auth";
import apiInstance from "../../utils/axios";
import '../store/cart.css';
import hero1 from "../../assets/Family-Togetherness-in-Joyful-Poses.png";
import hero2 from "../../assets/Arranging-Hoodies-in-Retail-Space.png";
import hero3 from "../../assets/Contemplative-Moment-in-the-Rain.png";
import hero4 from "../../assets/Confident-Professional-in-Modern-Office.png";



export default function DashBoard() {
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const heroImages = [hero1, hero2, hero3, hero4];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        apiInstance.get(`/category`).then((res) => {
          setCategory(res.data)
        })
      }, [])

    useEffect(() => {
        apiInstance.get(`/sub-category`).then((res) => {
            setSubCategory(res.data)
        })
    }, [])

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);
    

  return (

    <>
      {/* Hero Section */}
      <section className="hero"
  style={{
    backgroundImage: `url(${heroImages[currentImage]})`,
  }}>
  <div className="container">
    <div className="hero-content">
      <div className="hero-text">
        <h1>Find clothes that match your style</h1>
        <p>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>
        <a href="#" className="shop-now-btn">Shop Now</a>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-text">International Brands</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2,000+</div>
            <div className="stat-text">High-Quality Products</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30,000+</div>
            <div className="stat-text">Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    <section className="brands">
        <div className="container">
            <div className="brands-list">
                <div className="brand-item">VERSACE</div>
                <div className="brand-item">ZARA</div>
                <div className="brand-item">GUCCI</div>
                <div className="brand-item">PRADA</div>
                <div className="brand-item">Calvin Klein</div>
            </div>
        </div>
    </section>

    <section className='text-center'>
          <div className='row mt-4 mb-3'>
            <div className='col-lg-6 col-md-8 mx-auto'>
              <h1 className="fw-light">Hot Category🔥</h1>
                <p className="lead text-muted">
                    Our Latest Categories
              </p>
            </div> 
          </div>
        </section>
        <div className='d-flex justify-content-center'>
          {category.map((c, index) => (
            <div className='align-items-center d-flex flex-column' style={{ background: '#e8e8e8', marginLeft: '10px', borderRadius: '10px', padding: '30px' }}>
              <Link>
                <img src={c.image} alt=""
                  style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                />
              </Link>
              <p><a href='' className='text-dark'>{c.title}</a>  </p>
            </div>

          ))}
        </div>


<div className="category-section">
  <h2 className="category-heading">Trending Collections <span className="fire-icon">🔥</span></h2>
  <p className="category-subheading">Discover this season's most coveted styles</p>
  
  <div className="category-grid">
    {subCategory.map((s, index) => (
      <div key={index} className="category-item">
        <Link to={`/category/${s.slug}`} className="category-link">
          <div className="category-image-container">
            <img 
              src={s.image} 
              alt={s.title}
              className="category-image"
            />
          </div>
          <h3 className="category-title">{s.title}</h3>
        </Link>
      </div>
    ))}
  </div>
</div>



      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "40px" }}>
            Our Happy Customers
          </h2>

          {/* Testimonial Navigation Controls */}
          <div className="testimonial-controls">
            <button className="control-btn">
              <FaChevronLeft />
            </button>
            <button className="control-btn">
              <FaChevronRight />
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="testimonial-container">
            <div className="testimonial-grid">
              {/* Testimonial 1 */}
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "The attention to detail and the quality of the product
                  exceeded my expectations. Highly recommended!"
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://via.placeholder.com/40"
                    className="author-image"
                    alt="Customer Sarah M"
                  />
                  <div>
                    <div className="author-name">
                      Sarah M. <FaCheckCircle className="verified-icon" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "The clothes are just what I was looking for! Perfect fit,
                  amazing style, and quick delivery."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://via.placeholder.com/40"
                    className="author-image"
                    alt="Customer Alex K"
                  />
                  <div>
                    <div className="author-name">
                      Alex K. <FaCheckCircle className="verified-icon" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "The customer service was outstanding! They went above and
                  beyond to ensure I was satisfied."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://via.placeholder.com/40"
                    className="author-image"
                    alt="Customer John D"
                  />
                  <div>
                    <div className="author-name">
                      John D. <FaCheckCircle className="verified-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}
