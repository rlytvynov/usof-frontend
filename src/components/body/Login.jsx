import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import './styles/login.css'
import { Link } from 'react-router-dom';

import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if (!data.payload) {
            return alert('Unable to authorize')
        }
        if ('accessToken' in data.payload) {
            window.localStorage.setItem('accessToken', data.payload.accessToken)
        } else {
            alert('Unable to authorize')
        }
    }

    if(isAuth) {
        return <Navigate to ='/posts'/>
    }

    return (
        <div className='login'>
            <h1>WELCOME BACK!</h1>
            <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                <div className='inputLogin'><FaUser/><input type="email" placeholder='Email' {...register('email', { required: true })} /></div>
                {errors.email && <p className='loginError'>Email is required.</p>}
                <div className='inputLogin'><FaLock/><input type="password" placeholder='Password' {...register('password', { required: true })} /></div>
                {errors.password && <p className='loginError'>Password is required.</p>}
                <div className='inputLogin toForget' style={{textAlign: 'right'}}> <Link to='/register'>Forgot password?</Link></div>
                <div className='inputLogin'><input type="submit" value="Login"/></div>
                <div className='inputLogin toRegister' style={{textAlign: 'center'}}>Don't have an account yet? <Link to='/register'> Sign up</Link></div>
            </form>
        </div>
    );
  }
  
  export default Login;