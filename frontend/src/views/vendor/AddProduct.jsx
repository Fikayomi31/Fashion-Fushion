import React, { useState } from 'react'
import SideBar from './SideBar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'


function AddProduct() {
    const userData = UserData()
    const [product, setProduct] = useState({
        title: '',
        image: null,
        description: '',
        category: '',
        price: '',
        old_price: '',
        shipping_amount: '',
        stock_qty: '',
        vendor: userData?.vendor_id
    })
    const [specification]

  return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            {/* Sidebar Here */}


            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="container">
                <div className="main-body">
                <div className="tab-content" id="pills-tabContent">
                    <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Product Details</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <form
                                className="form-group"
                                method="POST"
                                noValidate=""
                                encType="multipart/form-data"
                            >
                                <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Product Thumbnail
                                    </label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Title
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Description
                                    </label>
                                    <textarea
                                    name=""
                                    className="form-control"
                                    id=""
                                    cols={30}
                                    rows={10}
                                    defaultValue={""}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Category
                                    </label>
                                    <select
                                    name=""
                                    className="select form-control"
                                    id=""
                                    >
                                    <option value="">- Select -</option>
                                    <option value="">Cloths</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Brand
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Sale Price
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Regular Price
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Shipping Amount
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Stock Qty
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                    />
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Product Image</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row text-dark">
                                <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Product Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Product Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Product Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5">
                                <i className="fas fa-plus" /> Add Image
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Specifications</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Content
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Content
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Content
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5">
                                <i className="fas fa-plus" /> Add Specifications
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Size</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Content
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5">
                                <i className="fas fa-plus" /> Add Specifications
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-size"
                    role="tabpanel"
                    aria-labelledby="pills-size-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Size</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="XXL"
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="$20"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="SM"
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="$10"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="LS"
                                    id=""
                                />
                                </div>
                                <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="$40"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5">
                                <i className="fas fa-plus" /> Add Size
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-color"
                    role="tabpanel"
                    aria-labelledby="pills-color-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <h4 className="mb-4">Color</h4>
                        <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row text-dark">
                                <div className="col-lg-4 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="Green"
                                    id=""
                                />
                                </div>
                                <div className="col-lg-4 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="#f4f7f6"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                                <div className="col-lg-4 mb-2">
                                <label htmlFor="" className="mb-2">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5">
                                <i className="fas fa-plus" /> Add Color
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <ul
                        className="nav nav-pills mb-3 d-flex justify-content-center mt-5"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            Basic Information
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                        >
                            Gallery
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="pills-contact-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-contact"
                            type="button"
                            role="tab"
                            aria-controls="pills-contact"
                            aria-selected="false"
                        >
                            Specifications
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="pills-size-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-size"
                            type="button"
                            role="tab"
                            aria-controls="pills-size"
                            aria-selected="false"
                        >
                            Size
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="pills-color-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-color"
                            type="button"
                            role="tab"
                            aria-controls="pills-color"
                            aria-selected="false"
                        >
                            Color
                        </button>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center mb-5">
                        <button className="btn btn-success w-50">
                        Create Product <i className="fa fa-check-circle" />{" "}
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddProduct
