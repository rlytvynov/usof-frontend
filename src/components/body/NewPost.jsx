import React, { useEffect, useState } from "react";
import API from "../API/api";
import './styles/newPost.css'
import { useForm } from 'react-hook-form';

function NewPost() {

    const [categories, setCategories] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const getCategories = () => {
        API.get('categories')
            .then (function(response) {
                setCategories(response.data)
            })
            .catch(function(error){
                console.log(error);
            }) 
    }

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (values) => {
        API.post('posts', values)
        .then (function(response) {
            console.log(response.data)
            window.location.href = window.location.href.replace('newPost', 'posts')
        })
        .catch(function(error){
            console.log(error);
        }) 
    }

    return(
        <form className="newPost" onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{textAlign: 'center', marginBottom: '50px', color: 'var(--mainColor)'}}>Create Post</h1>
            <div className="newPost_heading">
                <h4>HEADING</h4>
                <input type="text" name="title" {...register('title', { required: true })}/>
                {errors.title && <p className='postDataError'>Title is required.</p>}
            </div>
            <div className="newPost_content">
                <div className="newPost_text">
                    <h4>CONTENT</h4>
                    <textarea className='newPost_textArea' name="content" id="content" placeholder='Text here...' {...register('content', { required: true })}></textarea>
                    {errors.content && <p className='postDataError'>Content is required.</p>}
                </div>
                <div className="newPost_categories">
                    <h4>CATEGORIES</h4>
                    <div className='newPost_categories-list'>
                        {
                            categories.map((item, index) => (
                                <div className='newPost_category-item' key={index}>
                                    <span>{item.title}</span>
                                    <input type="checkbox"
                                        name='categories'   
                                        value={item.title} 
                                        {...register('categories')}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="newPost_submit"><input type="submit" value="Create Post"/></div>
        </form>
    )

}

export default NewPost