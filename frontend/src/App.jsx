import { useState } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'

import MainWrapper from "./layout/MainWrapper"

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import DashBoard from './views/auth/DashBoard'
import Footer from './views/base/Footer'
import Header from './views/base/Header'
import Logout from './views/auth/Logout'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />

      <MainWrapper>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<DashBoard />} />
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


        </Routes>
      </MainWrapper>


      <Footer />

    </BrowserRouter>
  )
}

export default App
