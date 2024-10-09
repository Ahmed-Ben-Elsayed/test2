import React from 'react'
import '../Forget_password/forget.css'
import   { Link  ,  useNavigate} from 'react-router-dom'
import man from "../../../src/assets/man3.png";
export const Forget = () => {
            const navigate = useNavigate('');
            const otbb = ()=>{
                navigate('/Forget-password/otb')
            }
    return (
        <div className='forget'>
        {/* left inputs */}
        <div className='left-forget'>
        <h1>Forget Password</h1>
        <small>Please enter the email example @gmail.com </small>
        <input type="text" placeholder='Email Address' />
        <input onClick={otbb} className='btn' type="submit" value="Verify Email"  />
        <p>Don’t have an account ?  <Link to='/Register'><span>Signup</span></Link></p>
        </div>
        {/* login right */}
        <div className="log-img">
          <img className="login-img" src={man} alt="Welcome" />
        </div>
        </div>
    )
}
