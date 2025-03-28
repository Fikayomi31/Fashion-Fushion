import {useState, useEffect } from 'react'
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'


export default function Category() {

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    
    useEffect(() => {
        apiInstance.get(`category/`).then((res) => {
          setCategory(res.data) 
        })
    }, [])
    useEffect(() => {
        apiInstance.get(`sub-category/`).then((res) => {
          setSubCategory(res.data) 
        })
    }, [])

    console.log(category)
    console.log(subCategory)
  return (
    <>
        <main className='mt-5'>
            <div className='container'>
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
                {category?.map((c, index) => (
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
            </div>

            <div className='container'>
                <section className='text-center'>
                <div className='row mt-4 mb-3'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                    <h1 className="fw-light">Hot Sub Category🔥</h1>
                        <p className="lead text-muted">
                            Our Latest Sub Categories
                    </p>
                    </div> 
                </div>
                </section>
                <div className='d-flex justify-content-center'>
                {subCategory?.map((c, index) => (
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
            </div>
        </main>
      
    </>
  )
}
