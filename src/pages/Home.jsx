import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
     
    const {user,isLoading} = useSelector((state) => state.auth)

    useEffect(() => {
      
    if(!user){
        navigate("/login");
      }
    }, [user]);

     if(isLoading){
        return(
          <h1 className='display-3 text-center p-5'>Loading...</h1> 
        )
     }
  return (
    <div className='container p-5 text-center'>
      <h1 className='display-5'>Welcome User</h1>
    </div>
  )
}

export default Home
