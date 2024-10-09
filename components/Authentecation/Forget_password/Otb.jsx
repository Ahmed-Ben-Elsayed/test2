import React from 'react'
import man from "../../../src/assets/man4.png";
import { Link , useNavigate } from 'react-router-dom';
import '../Forget_password/otb.css'
export const Otb = () => {
    const navigate = useNavigate()
    const success = ()=>{
        navigate('/Forget-password/otb/success')
    }
    return (
        <div className='forget'>
               {/* left inputs */}
        <div className='left-forget'>
        <h1>Forget Password</h1>
        <small>Please enter the OTB Numbers </small>
        <div className='otbs'>
        <input type="number" placeholder='' />
        <input type="number" placeholder='' />
        <input type="number" placeholder='' />
        <input type="number" placeholder='' />
        </div>
        <input onClick={success} className='btn' type="submit" value="Verify"  />
        <p>Don’t Don't get ?   <Link to='/Register'><span>Send Me a New Code </span></Link></p>
        <p>Don’t have an account ?  <Link to='/Register'><span>Signup</span></Link></p>
        </div>
        {/* login right */}
        <div className="log-img">
          <img className="login-img" src={man} alt="Welcome" />
        </div>
        </div>
    )
}
