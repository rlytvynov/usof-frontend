import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsRegistered } from '../redux/slices/register';
import './styles/login.css'
import { Link } from 'react-router-dom';

import { FaUser, FaLock, FaAddressCard, FaEnvelope, FaUserCheck } from 'react-icons/fa';

function Register() {
    const isRegistered = useSelector(selectIsRegistered)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if (!data.payload) {
            return alert('Unable to register')
        }
        if ('activationToken' in data.payload) {
            window.localStorage.setItem('activationToken', data.payload.activationToken)
        } else {
            alert('Unable to to register')
        }
    }

    return (
        <div className='login'>
            {
                isRegistered ? 
                <div className='registered'>
                    <h1>Succesfull Registered! <br /> Please, confirm your email to log in!</h1> 
                    <FaUserCheck/>
                </div>
                : 
                <div>
                    <h1 style={{textAlign: 'center'}}>SIGN UP NOW!</h1>
                    <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className='inputLogin'><FaUser/><input type="text" placeholder='Login' {...register('login', { required: true })} /></div>
                        <div className='inputLogin'><FaAddressCard/><input type="text" placeholder='Full Name' {...register('fullName')} /></div>
                        <div className='inputLogin'><FaEnvelope/><input type="email" placeholder='Email' {...register('email', { required: true })} /></div>
                        {errors.email && <p className='loginError'>Email is required.</p>}
                        <div className='inputLogin'><FaLock/><input type="password" placeholder='Password' {...register('password', { required: true })} /></div>
                        {errors.password && <p className='loginError'>Password is required.</p>}
                        <div className='inputLogin'><input type="submit" value="Register"/></div>
                        <div className='inputLogin toRegister' style={{textAlign: 'center'}}>Already have an account? <Link to='/login'> Sign in</Link></div>
                    </form>
                </div>
            }
        </div>
    );
  }
  
  export default Register;