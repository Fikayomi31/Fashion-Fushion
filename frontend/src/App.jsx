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

          {/** Store Components */}
          <Route path='/products' element={<Product/>} />


        </Routes>
      </MainWrapper>


      <Footer />

    </BrowserRouter>
  )
}

export default App
