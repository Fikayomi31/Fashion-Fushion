import React, { useState, useEffect } from 'react'
 
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'
import UserData from '../plugin/UserData'
import GetCurrentAddress from '../plugin/UserCountry'
import CardID from '../plugin/CardID'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast:true,
  position:'top',
  showConfirmButton:false,
  timer:1500,
  timerProgressBar:true


})

export default function Products() {

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

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    try {
     const formdata = new FormData()
     formdata.append('product_id', product_id)
     formdata.append('user_id', userData?.user_id)
     formdata.append('qty', qtyValue)
     formdata.append('price', price)
     formdata.append('shipping_amount', shipping_amount)
     formdata.append('country', currentAddress)
     formdata.append('size', sizeValue)
     formdata.append('color', colorValue)
     formdata.append('cart_id', cart_id)

     const response = await apiInstance.post('cart/', formdata)
     console.log(response.data)

     Toast.fire({
      icon: 'success',
      title: response.data.message
     })

    } catch (error) {
     console.log(error)
    }


 }

  const itemsPerPage = 6 // items to be display per page
  const [currentPage, setCurrentPage] = useState(1) // manage the current page display

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;

  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);  


  return (
   <>
   
   
   </>
    
  )
}
