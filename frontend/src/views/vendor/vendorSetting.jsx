import { useState, useEffect } from 'react'
import SideBar from './SideBar'
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import UserData from '../plugin/UserData'
import Swal from 'sweetalert2'


function VendorSetting() {
  const [profileData, setProfileData] = useState([])
  const [profileImage, setProfileImage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [vendorData, setVendorData] = useState([])
  const [vendorImage, setVendorImage] = useState('')

  const fetchProfileData = () => {
  apiInstance.get(`vendor/settings/${UserData()?.user_id}/`).then((res) => {
    setProfileData(res.data)
    setProfileImage(res.data.image)
    
    // If profile data contains vendor shop ID
    if (res.data.vendor_id) {
      fetchVendorData(res.data.vendor_id)
    }
  })
}

  const fetchVendorData = () => {
    apiInstance.get(`vendor/shop-update/${UserData()?.user_id}/`).then((res) => {
    setVendorData(res.data)
    setVendorImage(res.data.image)
    console.log('Vendor Data:', res.data)
  }).catch((error) => {
    console.error('Error fetching vendor data:', error)
  })
}

  useEffect(() => {
    fetchProfileData()
    fetchVendorData()
  }, [])

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file) // Store the actual file
      
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file)
      setProfileImage(previewUrl)
      
      // Also update profileData if needed
      setProfileData({
        ...profileData,
        image: file
      })
    }
  }

    const handleVendorChange = (e) => {
    setVendorData({
      ...vendorData,
      [e.target.name]: e.target.value
    })
  }

    const handleVendorFileChange = (e) => {
    setVendorData({
      ...vendorData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    
    // Only append image if a new one was selected
    if (imageFile) {
      formData.append('image', imageFile)
    }
    
    formData.append('full_name', profileData.full_name || '')
    formData.append('about', profileData.about || '')
    
    try {
      await apiInstance.patch(`vendor/settings/${UserData()?.user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Refresh data to get the updated image URL from server
      fetchProfileData()
      
      // Reset the image file state
      setImageFile(null)
      
      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Your profile has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        timer: 3000,
        timerProgressBar: true
      })
      
    } catch (error) {
      console.error('Error updating profile:', error)
      
      // Show error message with SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      })
    }
  }

  const handleVendorSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    
    // Only append image if a new one was selected
    if (imageFile) {
      formData.append('image', imageFile)
    }
    
    formData.append('shop_name', vendorData.shop_name || '')
    formData.append('email', vendorData.email || '')

    formData.append('description', vendorData.description || '')
    
    try {
      await apiInstance.patch(`vendor/shop-update/${UserData()?.user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Refresh data to get the updated image URL from server
      fetchVendorData()
      
      // Reset the image file state
      setImageFile(null)
      
      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Your Shop has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        timer: 3000,
        timerProgressBar: true
      })
      
    } catch (error) {
      console.error('Error updating shop:', error)
      
      // Show error message with SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Shop. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      })
    }
  }

  return (
    <div className="container-fluid" id="main">
      <div className="row row-offcanvas row-offcanvas-left h-100">
        {/* Add Sidebar Here */}
        <SideBar />
        
        <div className="col-md-9 col-lg-10 main mt-4">
          <div className="container">
            <div className="main-body">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                    Shop
                  </button>
                </li>
              </ul>
              
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div className="row gutters-sm shadow p-4 rounded">
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            <img 
                              src={profileImage || '/default-avatar.png'} 
                              alt="Admin" 
                              className="rounded-circle" 
                              width={150}
                              height={150}
                              style={{objectFit: 'cover'}}
                              onError={(e) => {
                                e.target.src = '/default-avatar.png'
                              }}
                            />
                            <div className="mt-3">
                              <h4 className="text-dark">{profileData?.full_name}</h4>
                              <p className="text-secondary mb-1">{profileData?.about}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div className="card mb-3">
                        <div className="card-body">
                          <form className="form-group" method="POST" noValidate encType="multipart/form-data" onSubmit={handleProfileSubmit}>
                            <div className="row text-dark">
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="profileImage" className="mb-2">Profile Image</label>
                                <input 
                                  type="file" 
                                  className="form-control" 
                                  id="profileImage"
                                  onChange={handleFileChange}
                                  name="image"
                                  accept="image/*"
                                />
                                {imageFile && (
                                  <small className="text-success">New image selected: {imageFile.name}</small>
                                )}
                              </div>
                              
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="fullName" className="mb-2">Full Name</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="fullName"
                                  value={profileData.full_name || ''}
                                  onChange={handleInputChange}
                                  name="full_name"
                                />
                              </div>
                              
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="email" className="mb-2">Email</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="email" 
                                  id="email"
                                  value={profileData?.user?.email || ''} 
                                  readOnly 
                                />
                              </div>
                              
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="phone" className="mb-2">Phone Number</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="phone" 
                                  id="phone"
                                  value={profileData?.user?.phone || ''} 
                                  readOnly
                                />
                              </div>
                              
                              <div className="col-lg-12 mb-2">
                                <label htmlFor="about" className="mb-2">About Me</label>
                                <textarea 
                                  id="about" 
                                  cols={30} 
                                  rows={5} 
                                  className="form-control" 
                                  value={profileData?.about || ''}
                                  onChange={handleInputChange}
                                  name="about"
                                />
                              </div>
                              
                              <div className="col-lg-12 mt-4 mb-3">
                                <button className="btn btn-success" type="submit">
                                  Update Profile <i className="fas fa-check-circle" />
                                </button>
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
                  <div className="col-md-4 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src={vendorData.image}
                            style={{ width: 160, height: 160, objectFit: "cover" }}
                            alt="Admin"
                            className="rounded-circle"
                            width={150}
                          />
                          <div className="mt-3">
                            <h4 className="text-dark">{vendorData.shop_name}</h4>
                            <p className="text-secondary mb-1">{vendorData.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <form
                          className="form-group"
                          method="POST"
                          noValidate=""
                          encType="multipart/form-data"
                          onSubmit={handleVendorSubmit}

                        >
                          <div className="row text-dark">
                            <div className="col-lg-12 mb-2">
                              <label htmlFor="" className="mb-2">
                                Shop Image
                              </label>
                              <input
                                src={vendorImage}
                                type="file"
                                className="form-control"
                                name="image"
                                id=""
                                onChange={handleVendorFileChange}
                                
                              />
                            </div>
                            <div className="col-lg-12 mb-2 ">
                              <label htmlFor="" className="mb-2">
                                Shop Name
                              </label>
                              <input
                                type="text"
                                className="form-control"                                
                                id=""
                                value={vendorData.shop_name}
                                name="shop_name"
                                onChange={handleVendorChange}
                              />
                            </div>
                            <div className="col-lg-6 mb-2">
                              <label htmlFor="" className="mb-2">
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                id=""
                                value={profileData?.user?.email || ''} 
                                onChange={handleVendorChange}
                              />
                            </div>
                            <div className="col-lg-6 mb-2">
                              <label htmlFor="" className="mb-2">
                                Phone Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name=""
                                id=""
                                value={vendorData.mobile}
                              />
                            </div>
                            <div className='col-lg-12 mb-2'>
                              <label htmlFor="" className='mb-2'>
                                Shop Description
                              </label>
                              <textarea onChange={handleVendorChange} value={vendorData.description} name='description' id='' col='10' className='form-control' rows='10'>

                              </textarea>


                            </div>
                            <div className="col-lg-12 mt-4 mb-3 d-flex">
                              <button className="btn btn-success" type="submit">
                                Update Shop <i className="fas fa-check-circle" />{" "}
                              </button>
                              <button className="btn btn-primary ms-2" type="submit">
                                View Shop <i className="fas fa-shop" />{" "}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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

export default VendorSetting;
