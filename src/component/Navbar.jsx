import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutUser } from '../features/auth/authSlice';
const Navbar = () => {

    const {user} = useSelector((state)=> state.auth)
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogoutUser())
    }
    

  return (

    <nav className="navbar bg-dark">
    <div className="container-fluid">
      <Link to={"/"} className="navbar-brand mb-0 text-white h1">Auth App</Link>
       <span>
            {
                user ? (
                     <button onClick={handleLogout} className='btn btn-danger btn-sm mx-1'>Logout</button>
                ) : (
                   <>
                      <Link to={"/register"} className='btn btn-primary btn-sm mx-1'>Register</Link>
                      <Link to={"/login"} className='btn btn-primary btn-sm mx-1'>Login</Link>
                   </>
                )
            }
       </span>

    </div>
  </nav>
  )
}

export default Navbar; 
 