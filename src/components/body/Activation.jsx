import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../API/api';
import { useEffect } from 'react';
import './styles/activation.css'


function Activation() {
    const isAuth = useSelector(selectIsAuth)
    const params = useParams()

    const confirmEmail = () => {
        api.post(`/auth/activation/${params.activationToken}`)
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    useEffect(() => {
        confirmEmail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {    
        window.localStorage.removeItem('activationToken')
    }


    if(isAuth) {
        return <Navigate to ='/posts'/>
    }
    return (
        <div className='login'>
            {
                params.activationToken === window.localStorage.getItem('activationToken') ? 
                    <div className='activation_block'>
                        <img src={require('../../assets/confirmed.png')} alt="" />
                        <h1>Email has been successfully confirmed </h1>
                        <button className='login_button' onClick={handleClick}><Link to='/login'> Log in</Link></button>
                    </div> 
                : 
                    <h1>404 Not Found</h1>
            }
        </div>
    );
  }
  
  export default Activation;