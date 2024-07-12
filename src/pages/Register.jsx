import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../features/auth/authSlice';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {user,isLoading,isError,messsage} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        password2 : "",
    });

    const {name, email, password, password2} = formData;

   const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData))
    }

    useEffect(() => {
      if(user) {
        navigate("/");
      }

      if(isError || messsage){
        toast.error(messsage)  
      }
      
    },[user, isError, messsage])

    if(isLoading){
        return(
          <h1 className='display-3 text-center p-5'>Loading...</h1> 
        )
     }

  return (
    <div className='container p-5'>
       <h1 className="text-center display-5">Register Here</h1>
         <div className="card my-3 p-2">
            <form onSubmit={handleSubmit}>
             <input
               type="text"
               className="form-control my-2"
               placeholder="Enter Name"
               name="name"
               required
               value={name}
               onChange={handleChange}
              />

            <input
               type="text"
               className="form-control my-2"
               placeholder="Enter Email"
               name="email"
               required
               value={email}
               onChange={handleChange}
              />

            <input
               type="text"
               className="form-control my-2"
               placeholder="Enter Password"
               name="password"
               required
               value={password}
               onChange={handleChange}
              />

             <input
               type="text"
               className="form-control my-2"
               placeholder="Confirm Password"
               name="password2"
               required
               value={password2}
               onChange={handleChange}
              />    

              <button className="btn btn-dark w-100 my-2">Register</button>          
               

            </form>
         </div>
    </div>
  )
}

export default Register

