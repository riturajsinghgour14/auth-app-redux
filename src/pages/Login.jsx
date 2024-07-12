import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
     
    const {user,isLoading,isError,messsage} = useSelector((state) => state.auth)


    const [formData, setFormData] = useState({
        email : "",
        password : "",
    });

    const { email, password} = formData;

   const handleChannge = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData))
    }

    useEffect(() => {
      
    if(user){
       navigate("/");
    }

    if(isError || messsage){
      toast.error(messsage)  
    }
    }, [user,isError,messsage]);



    if(isLoading){
        return(
          <h1 className='display-3 text-center p-5'>Loading...</h1> 
        )
     }

  return (
    <div className='container p-5'>
    <h1 className="text-center display-5">Login Here</h1>
      <div className="card my-3 p-2">
         <form onSubmit={handleSubmit}>
             <input type="email" 
             placeholder='Enter Email' 
             className='form-control my-2'
             name='email'
             value={email}
             onChange={handleChannge}
             required
             />
             <input type="password" 
             placeholder='Enter Password' 
             className='form-control my-2'
             name='password'
             value={password}
             onChange={handleChannge}
             required
             />
             <button className="btn btn-dark w-100 my-2">Login</button>
         </form>
      </div>
 </div>
  )
}

export default Login
