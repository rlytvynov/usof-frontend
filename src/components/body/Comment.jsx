import React, { useEffect } from "react";
import { useState } from "react";
import API from "../API/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';

function Comment (props) {
    const [likeState, setLikeState] = useState('unactive')
    const [dislikeState, setDisLikeState] = useState('unactive')
    const isAuth = useSelector(selectIsAuth)

    const uploadLikes = () => {
        console.log(props.comment.like)
        if(props.comment.like === 'like') {
            setLikeState('active')
        } else if (props.comment.like === 'dislike') {
            setDisLikeState('active')
        } else {
            setLikeState('unactive')
            setDisLikeState('unactive')
        }
    }

    useEffect(() => {
        uploadLikes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLikeClick = (e) => {
        if(!isAuth) {
            alert('Unauthorized')
        } else {
            if(e.target.value === 'like') {
                if(likeState === 'active') {
                    API.delete(`comments/${props.comment.id}/like`, {likeType: 'like'})
                        .then(() => {
                            setLikeState('unactive')
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    API.post(`comments/${props.comment.id}/like`, {likeType: 'like'})
                        .then(() => {
                            setLikeState('active')
                            if(dislikeState === 'active') {
                                setDisLikeState('unactive')
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            } else {
                if(dislikeState === 'active') {
                    API.delete(`comments/${props.comment.id}/like`, {likeType: 'dislike'})
                        .then(() => {
                            setDisLikeState('unactive')
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    API.post(`comments/${props.comment.id}/like`, {likeType: 'dislike'})
                        .then(() => {
                            setDisLikeState('active')
                            if(likeState === 'active') {
                                setLikeState('unactive')
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        }
    }

    return (
        <div key={props.comment.id} className="comment">
            <div className="content-text-block">
                {props.comment.content}
            </div>
            <div className="content-additionals-block">
                <div className="buttons-liking">
                    <button onClick={handleLikeClick} value='like' className={`like' ${likeState}`}><FontAwesomeIcon icon={faThumbsUp}/></button>
                    <button onClick={handleLikeClick} value='dislike' className={`dislike ${dislikeState}`}><FontAwesomeIcon icon={faThumbsDown}/></button>
                </div>
                <div className="content-date">
                    {props.comment.publishDate}
                </div>
                <div className="short-info">
                    <div>{props.comment.author}</div>
                    <div style={{position: 'relative', width: '20px', height:'20px'}}> <img className="profilePhoto" src={props.comment.authorPhoto} alt="" /></div>
                </div>
            </div>
        </div>
    )

}

export default Comment