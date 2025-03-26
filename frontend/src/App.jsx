import { useState } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'

import MainWrapper from "./layout/MainWrapper"

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import DashBoard from './views/auth/DashBoard'
import Footer from './views/base/Footer'
import Header from './views/base/Header'



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

        </Routes>
      </MainWrapper>
      <Footer />

    </BrowserRouter>
  )
}

export default App
