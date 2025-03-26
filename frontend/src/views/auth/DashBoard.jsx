import React from "react";

// Import FontAwesome for icons
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../views/auth/dashboard.css";

export default function DashBoard() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Find clothes that matches your style</h1>
                    <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <a href="#" class="shop-now-btn">Shop Now</a>
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
                <div className="hero-image">
                    <img src="/api/placeholder/500/450" alt="Fashion Models" />
                    <div className="star-decoration star-1">✦</div>
                    <div className="star-decoration star-2">✦</div>
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

    <section className="product-section">
    <div className="container">
        <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
        </div>
        <div className="product-grid">
            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="T-shirt with Tape Details" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">T-shirt with Tape Details</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.9)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$120</span>
                    </div>
                </div>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Skinny Fit Jeans" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Skinny Fit Jeans</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.8)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$240</span>
                        <span className="original-price">$260</span>
                        <span className="discount-badge">-8%</span>
                    </div>
                </div>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Checkered Shirt" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Checkered Shirt</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.9)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$180</span>
                    </div>
                </div>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Sleeve Striped T-shirt" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Sleeve Striped T-shirt</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.7)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$130</span>
                        <span className="original-price">$160</span>
                        <span className="discount-badge">-20%</span>
                    </div>
                </div>
            </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <a href="#" className="view-all">View All</a>
        </div>
    </div>
</section>

<section className="product-section">
    <div className="container">
        <div className="section-header">
            <h2 className="section-title">Top Selling</h2>
        </div>
        <div className="product-grid">
            {/* Product 1 */}
            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Vertical Striped Shirt" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Vertical Striped Shirt</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.7)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$212</span>
                        <span className="original-price">$232</span>
                        <span className="discount-badge">-9%</span>
                    </div>
                </div>
            </div>

            {/* Product 2 */}
            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Courage Graphic T-shirt" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Courage Graphic T-shirt</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.8)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$145</span>
                    </div>
                </div>
            </div>

            {/* Product 3 */}
            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Loose Fit Bermuda Shorts" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Loose Fit Bermuda Shorts</h3>
                    <div className="product-rating">
                        <span>★★★☆☆</span>
                        <span className="rating-count">(3.4)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$80</span>
                    </div>
                </div>
            </div>

            {/* Product 4 */}
            <div className="product-card">
                <div className="product-image">
                    <img src="https://via.placeholder.com/240x200" alt="Faded Skinny Jeans" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">Faded Skinny Jeans</h3>
                    <div className="product-rating">
                        <span>★★★★★</span>
                        <span className="rating-count">(4.9)</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">$210</span>
                    </div>
                </div>
            </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <a href="#" className="view-all">View All</a>
        </div>
    </div>
</section>

{/* Browse by Dress Style Section */}
<section className="categories">
    <div className="container">
        <h2 className="section-title" style={{ marginBottom: "40px" }}>Browse by Dress Style</h2>
        <div className="category-grid">
            {/* Category 1 */}
            <div className="category-card">
                <img src="https://via.placeholder.com/400x200" alt="Casual Style" />
                <div className="category-overlay">Casual</div>
            </div>

            {/* Category 2 */}
            <div className="category-card">
                <img src="https://via.placeholder.com/400x200" alt="Formal Style" />
                <div className="category-overlay">Formal</div>
            </div>

            {/* Category 3 */}
            <div className="category-card">
                <img src="https://via.placeholder.com/400x200" alt="Party Style" />
                <div className="category-overlay">Party</div>
            </div>

            {/* Category 4 */}
            <div className="category-card">
                <img src="https://via.placeholder.com/400x200" alt="Gym Style" />
                <div className="category-overlay">Gym</div>
            </div>
        </div>
    </div>
</section>



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
    </>
  );
}
