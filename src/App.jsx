import React from 'react'
import LandingPage from './suby/pages/LandingPage'
import { Routes, Route } from "react-router-dom"
import ProductMenu from './suby/components/ProductMenu'
import "./App.css"


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/products/:firmId/:firmname' element={<ProductMenu/>}/>
      </Routes>

  )
}

export default App
