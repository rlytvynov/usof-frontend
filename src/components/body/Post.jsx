import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown, faStar, faMessage, faLock} from '@fortawesome/free-solid-svg-icons'
//import API from '../API/api';
import './styles/post.css'
import API from '../API/api';
import { selectIsAuth } from '../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Comment from './Comment';

function Post() {
    const params = useParams();
    const isAuth = useSelector(selectIsAuth)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)
    const [likeState, setLikeState] = useState('unactive')
    const [dislikeState, setDisLikeState] = useState('unactive')

    const getPost = (id) => {
        
        API.get(`posts/${id}`)
            .then(function (response) {
                setPost(response.data);
                if(response.data.like === 'like') {
                    setLikeState('active')
                } else if (response.data.like === 'dislike') {
                    setDisLikeState('active')
                } else {
                    setLikeState('unactive')
                    setDisLikeState('unactive')
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
        API.get(`posts/${id}/comments`)
            .then(function (response) {
                setComments(response.data);
                setIsPending(false)
                setError(null)
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
                setIsPending(false)
                setError('There is no answers yet')
            });
    }

    useEffect(() => {
        getPost(params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (values) => {
        API.post(`posts/${params.id}/comments`, values)
        .then (function(response) {
            console.log(response.data)
            window.location.reload()
        })
        .catch(function(error){
            if(!isAuth) {
                alert('Unauthorized')
            } else {
                console.log(error)
            }
        }) 
    }

    const handleLikeClick = (e) => {
        if(!isAuth) {
            alert('Unauthorized')
        } else {
            if(e.target.value === 'like') {
                if(likeState === 'active') {
                    API.delete(`posts/${params.id}/like`, {likeType: 'like'})
                        .then(() => {
                            setLikeState('unactive')
                            post.rating -= 1
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    API.post(`posts/${params.id}/like`, {likeType: 'like'})
                        .then(() => {
                            setLikeState('active')
                            if(dislikeState === 'active') {
                                setDisLikeState('unactive')
                                post.rating += 1
                            }
                            post.rating += 1
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            } else {
                if(dislikeState === 'active') {
                    API.delete(`posts/${params.id}/like`, {likeType: 'dislike'})
                        .then(() => {
                            setDisLikeState('unactive')
                            post.rating += 1
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    API.post(`posts/${params.id}/like`, {likeType: 'dislike'})
                        .then(() => {
                            setDisLikeState('active')
                            if(likeState === 'active') {
                                setLikeState('unactive')
                                post.rating -= 1
                            }
                            post.rating -= 1
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        }
    }

    return (
        <div className='post'>

            <div className="content">
                <div className="content-title-block">
                    <div>
                        <h2 style={{display: 'inline-block'}}> {post.title} </h2>
                        {post.status === 'locked' ? <FontAwesomeIcon className="locked" icon={faLock}/> : null}
                    </div>
                    <div className='content-date'>{post.date}</div>
                </div>
                <div className="content-text-block">
                    {post.content}
                </div>
                <div className="content-additionals-block">
                    <div className="buttons-liking">
                        <button onClick={handleLikeClick} value='like' className={`like' ${likeState}`}><FontAwesomeIcon icon={faThumbsUp}/></button>
                        <button onClick={handleLikeClick} value='dislike' className={`dislike ${dislikeState}`}><FontAwesomeIcon icon={faThumbsDown}/></button>
                    </div>
                    <div className="short-info">
                        <div> <FontAwesomeIcon icon={faStar}/> {post.rating}</div>
                        <div> <FontAwesomeIcon icon={faMessage}/> {comments.lengh ? comments.lengh : 0}</div>
                        <div><span style={{fontWeight: '400'}}>asked</span> {post.author}</div>
                        <div style={{position: 'relative', width: '20px', height:'20px'}}> <img className="profilePhoto" src={post.authorPhoto} alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="comments">
                <h2 style={{marginBottom: '20px'}}>Answers</h2>

                {error && <div style={{marginBottom: '20px', color: 'lightgray'}}>{error}</div>}
                {isPending && <div>Loading...</div>}

                {
                    comments.map(comment=> (
                        <Comment key={comment.id} comment={comment}/>
                    ))
                }
            </div>
            <form className="newComment" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <textarea className='inputComment' name="content" id="content" placeholder='Your Comment' {...register('content', { required: true })}></textarea>
                    {errors.content && <p className='postDataError'>Content is required.</p>}
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <input type="submit" value="Send"/>
                </div>
            </form>
        </div>
    );
  }
  
  export default Post;