import React from 'react'
import banner1 from '../../src/assets/banner1.png'
import banner2 from '../../src/assets/banner1.png'
import '../Authentecation/Auth.css'
import {Rigster} from '../../components/Authentecation/Register/Rigster'
import { Route , Routes , BrowserRouter } from 'react-router-dom'
import { Login } from './Login/Login'
import { Home } from '../App-pages/home/Home'
import { Forget } from './Forget_password/Forget'
import { Otb } from './Forget_password/Otb'
import { Successreset } from './Forget_password/Successreset'
export const Auth = () => {
    return (
        <div className='Auth'>
            {/* banners */}
                <img className='banner1'  alt="" srcSet={banner1} />
                <img className='banner2'  alt="" srcSet={banner2} />
                <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Register' element={<Rigster />} />
                <Route path='/Forget-password' element={<Forget />} />
                <Route path='/Forget-password/otb' element={<Otb />} />
                <Route path='/Forget-password/otb/success' element={<Successreset />} />
            </Routes>
        </div>
    )
}
