import { useState } from 'react'
import './App.css'
import { Auth } from '../components/Authentecation/Auth'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import { Login } from '../components/Authentecation/Login/Login'
import { Rigster } from '../components/Authentecation/Register/Rigster'
import { Home } from '../components/App-pages/home/Home'
function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/*' element={<Auth/>}/>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
