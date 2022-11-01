import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuth } from '../redux/slices/auth';
import './styles/account.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMessage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import API from '../API/api';
import { useForm } from 'react-hook-form';

import { FaArrowLeft,  FaUser, FaLock, FaAddressCard} from 'react-icons/fa';
import axios from 'axios';

function Account() {

    const authUser = useSelector(selectAuthUser)
    const isAuth = useSelector(selectIsAuth)
    const [settings, setSettings] = useState('unactive')
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const inputFileRef = useRef(null)

    const {
        register,
        handleSubmit,
      } = useForm();

    const getPosts = () => {

        API.get( `posts/withoutPagination` )
        .then(function (response) {
            setPosts(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
            getPosts()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (values) => {
        API.patch(`users/${authUser.id}`, values)
            .then((response) => {
                console.log(response.data)
                setSettings('unactive')
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const handleCloseSettings = () => {
        setSettings('unactive')
    }

    const handleOpenSettings = () => {
        setSettings('active')
    }

    const handleUploadPhoto = async (event) => {
        try {
            let formData = new FormData()
            const file = event.target.files[0]
            console.log(file)
            formData.append('avatar', file)
            console.log(formData)

            const { data } = await axios({
                method: "patch",
                url: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}/api/users/avatar`,
                data: formData,
                headers: {'Access-Control-Allow-Origin': '*', "Content-Type": "multipart/form-data" },
                credentials: 'include',   
                withCredentials: true
            })

            console.log(data);
        } catch (error) {
            console.warn(error)
            alert('Error occured!')
        }
    }

    return(
        <div className='account_block'>
            {
                isAuth ?
                <div className='account'>
                    <div className={`update_profile ${settings}`}>
                        <form className="update_profile_center" onSubmit={handleSubmit(onSubmit)}>
                            <div className="crossButton" onClick={handleCloseSettings}><FontAwesomeIcon icon={faXmark}/></div>
                            <div className='inputLogin'><FaUser/><input type="text" placeholder='Login' {...register('login')}/></div>
                            <div className='inputLogin'><FaAddressCard/><input type="text" placeholder='Full Name' {...register('fullName')}/></div>
                            <div className='inputLogin'><FaLock/><input type="password" placeholder='Password' {...register('password')}/></div>
                            <div className='inputLogin'><input type="submit" value="Submit"/></div>
                        </form>
                    </div>
                    <div onClick={() => navigate(-1)} className='go_back'>
                        <FaArrowLeft/> <h1>ACCOUNT</h1>
                    </div>
                    <div className="account_info">
                        <div className="user_info">
                            <img style={{borderRadius: '50%', marginBottom: '10px'}} src={authUser.profilePicture} alt="" />
                            <h3 style={{margin: '0'}}>{authUser.fullName}</h3>
                            <p style={{fontWeight: '300',fontSize: '13px',lineHeight: '16px',color: '#023047',marginBottom: '15px'}}>{authUser.login}</p>
                            <p style={{marginBottom: '35px'}}><FontAwesomeIcon icon={faStar} color='gold'/> {authUser.rating}</p>
                            <button className='settings' onClick={handleOpenSettings}>Settings</button>
                            <button className='upload_photo' onClick={() => inputFileRef.current.click()}>Upload Photo</button>
                            <input ref={inputFileRef} onChange={handleUploadPhoto} type="file" hidden/>
                        </div>
                        <div className="user_posts">
                            {
                                posts.map(item => (
                                    item.userID === authUser.id ?
                                    <Link key={item.id} to={"/posts/" + item.id} className="post__link">
                                        <div className='post__item' style={{marginBottom: '20px'}}>
                                            <div className='post__additional-info'>
            
                                                <div className='post-rate'>
                                                    <div><FontAwesomeIcon icon={faStar}/> {item.rating} </div>
                                                    <div><FontAwesomeIcon icon={faMessage}/> {item.comments} </div>
                                                </div>
            
                                                <div className='post-creator'>
                                                    <div>
                                                        {authUser.login}
                                                    </div>
                                                    <div>asked</div>
                                                </div>
            
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} className='post__info'>
                                                <h3>{item.title}</h3>
                                                <p style={{margin: '16px 0px'}} className='postContent'>{item.content}</p>
                                                <p style={{margin: '0px'}} className='createdAt'>{item.publishDate}</p>       
                                            </div>
                                        </div>
                                    </Link> : null
                                ))
                            }
                        </div>
                    </div>
                </div>
                :
                <div className='empty_account'>
                    <h1>Guest can not have profile page, please, log in the system</h1>
                    <Link to="/login">Login</Link>
                </div>
            }
        </div>
    )
}

  
export default Account;