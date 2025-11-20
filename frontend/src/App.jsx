import { useState } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'

import MainWrapper from "./layout/MainWrapper"

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Footer from './views/base/Footer'
import Header from './views/base/Header'
import Logout from './views/auth/Logout'
import Home from './views/store/Home'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import Product from './views/store/Product'
import Category from './views/store/Category'
//import Cart from './views/store/Cart'
import ProductDetail from './views/store/ProductDetail'
import Carts from './views/store/Carts'
import Checkout from './views/store/Checkout'
import PaymentSuccess from './views/store/PaymentSuccess'
import Search from './views/store/Search'
import Account from './views/customer/Account' 
import PrivateRoute from './layout/PrivateRoute'
import Orders from './views/customer/Orders'
import OrderDetail from './views/customer/OrderDetail'
import Wishlist from './views/customer/Wishlist'
import Dashboard from './views/vendor/Dashboard'
import Products from './views/vendor/Products'
import VendorOrders from './views/vendor/VendorOrders'
import Earning from './views/vendor/Earning'
import Reviews from './views/vendor/Reviews'
import Coupon from './views/vendor/Coupon'
import VendorRegister from './views/vendor/VendorRegister'
import Notification from './views/vendor/Notification'
import VendorSetting from './views/vendor/vendorSetting'  
import Shop from './views/vendor/Shop'
import AddProduct from './views/vendor/AddProduct'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />

      <MainWrapper>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/password-change' element={<CreatePassword/>} />

          {/* Store Components */}
          <Route path='/products' element={<Product />} />
          <Route path='/category' element={<Category />} />
          <Route path='/detail/:slug/' element={<ProductDetail />} />
          <Route path='/cart' element={<Carts />} />
          <Route path='/checkout/:order_oid/' element={<Checkout />} />
          <Route path='/payment-success/:order_oid/' element={<PaymentSuccess />} />
          <Route path='/search/' element={<Search />} />

          {/* Customer Components */}
          <Route path='/customer/account/' element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path='/customer/orders/' element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path='/customer/orders/:order_oid/' element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
          <Route path='/customer/wishlist/' element={<PrivateRoute><Wishlist /></PrivateRoute>} />

          {/* Vendor Components */}
          <Route path='/vendor/dashboard/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/vendor/products/' element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path='/vendor/orders/' element={<PrivateRoute><VendorOrders /></PrivateRoute>} />
          <Route path='/vendor/earnings/' element={<PrivateRoute><Earning /></PrivateRoute>} />
          <Route path='/vendor/reviews/' element={<PrivateRoute><Reviews /></PrivateRoute>} />
          <Route path='/vendor/coupon/' element={<PrivateRoute><Coupon /></PrivateRoute>} />
          <Route path='/vendor/register/' element={<PrivateRoute><VendorRegister/></PrivateRoute>} />
          <Route path='/vendor/notifications/' element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path='/vendor/settings/' element={<PrivateRoute><VendorSetting /></PrivateRoute>} />
          <Route path='/vendor/:slug/' element={<PrivateRoute><Shop /></PrivateRoute>} />
          <Route path='/vendor/add-product/' element={<PrivateRoute><AddProduct /></PrivateRoute>} />


        </Routes>
      </MainWrapper>


      <Footer />

    </BrowserRouter>
  )
}

export default App
