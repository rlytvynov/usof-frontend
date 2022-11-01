import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownShortWide, faFilter, faStar, faMessage} from '@fortawesome/free-solid-svg-icons'
import  Pagination from 'react-js-pagination'
import './styles/posts.css'
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';

import API from '../API/api';

function Posts() {

    const isAuth = useSelector(selectIsAuth)

    const [posts, setPosts] = useState({
        totalPages: 0,
        currentPage: 1,
        totalItems: 0,
        itemsCountPerPage: 0,
        posts: []
    });
    const [drpdwnSort, setDrpdwnSort] = useState('dropdown-sort nonactive')
    const [sortType, setSortType] = useState('')
    const [drpdwnFilter, setDrpdwnFilter] = useState('dropdown-filter nonactive')

    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    const [checkedState, setCheckedState] = useState([])

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [AuthError, setAuthError] = useState('AuhtErrorUnactive')

    const getAllPosts = () => {
       
        API.get( 'posts' )
            .then(function (response) {
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        API.get('categories')
            .then (function(response) {
                setCategories(response.data)
                setCheckedState(new Array(response.data.length).fill(false))
            })
            .catch(function(error){
                console.log(error);
            }) 

        API.get('users')
            .then (function(response) {
                setUsers(response.data)
            })
            .catch(function(error){
                console.log(error);
            }) 

    }

    const handlePageChange = (page) => {

        let categoryTitles = ''
        for (let i = 0; i < checkedState.length; i++) {
            if(checkedState[i]) categoryTitles += `category[]=${checkedState[i]}&`
        }

        API.get(`posts?page=${page}&sort=${sortType}&${categoryTitles}&from=${fromDate}&to=${toDate}`)
            .then(response => {
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSortChoose = (sortType) => {
        setSortType(sortType)
        drpdwnSort === 'dropdown-sort nonactive' ?
        setDrpdwnSort('dropdown-sort active') :
        setDrpdwnSort('dropdown-sort nonactive')

        let categoryTitles = ''
        for (let i = 0; i < checkedState.length; i++) {
            if(checkedState[i]) categoryTitles += `category[]=${checkedState[i]}`
            if(i + 1 !== checkedState.length && checkedState[i+1] !== false) categoryTitles += '&'
        }

        console.log(`posts?sort=${sortType}&${categoryTitles}&from=${fromDate}&to=${toDate}`)
        
        API.get(`posts?sort=${sortType}&${categoryTitles}&from=${fromDate}&to=${toDate}`)
            .then(response => {
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleFilterChoose = () => {
        drpdwnFilter === 'dropdown-filter nonactive' ?
        setDrpdwnFilter('dropdown-filter active') :
        setDrpdwnFilter('dropdown-filter nonactive')

        let categoryTitles = ''
        for (let i = 0; i < checkedState.length; i++) {
            if(checkedState[i]) categoryTitles += `category[]=${checkedState[i]}&`
        }
        console.log(categoryTitles)

        API.get(`posts?sort=${sortType}&${categoryTitles}&from=${fromDate}&to=${toDate}`)
            .then(response => {
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );

        for (let i = 0; i < categories.length; i++) {
            if(updatedCheckedState[i] === true) {
                updatedCheckedState[i] = categories[i].title
            }
        }

        setCheckedState(updatedCheckedState);
    }

    const handleDate = (event) => {
        if(event.target.id === 'from') {
            console.log(event.target.value)
            setFromDate(event.target.value)
        }
        if(event.target.id === 'to') {
            console.log(event.target.value)
            setToDate(event.target.value)
        }
    }

    const handleClear = () => {
        // console.log('hello')
        // setFromDate('')
        // setToDate('')
        // setCheckedState(new Array(checkedState.length).fill(false))

        // setPosts({
        //     totalPages: 0,
        //     currentPage: 1,
        //     totalItems: 0,
        //     itemsCountPerPage: 0,
        //     posts: []
        // })
        // getAllPosts();
        window.location.reload();
    }

    const handleSortClick = () => {
        drpdwnSort === 'dropdown-sort nonactive' ?
        setDrpdwnSort('dropdown-sort active') :
        setDrpdwnSort('dropdown-sort nonactive')

        if(drpdwnFilter === 'dropdown-filter active') {
            setDrpdwnFilter('dropdown-filter nonactive')
        }
    }
    const handleFilterClick = () => {
        drpdwnFilter === 'dropdown-filter nonactive' ?
        setDrpdwnFilter('dropdown-filter active') :
        setDrpdwnFilter('dropdown-filter nonactive')

        if(drpdwnSort === 'dropdown-sort active') {
            setDrpdwnSort('dropdown-sort nonactive')
        }
    }
    const handleNewPostClick = () => {
        if(!isAuth) {
            setAuthError('AuhtErrorActive')
            setTimeout(() => {
                setAuthError('AuhtErrorUnactive')
            }, 5000)
        } else {
            window.location.href = window.location.href.replace('posts', 'newPost')
        }
    }

    useEffect(() => {
        getAllPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        
        <div className='post-page'>

            <div className='heading'>
                <h1 className='page-heading'>Questions</h1>
                <div style={{position: 'relative'}}>
                    <button onClick={handleNewPostClick}>New Post</button>
                    <div className={AuthError}>You should log in the system <br /> to create posts!</div>
                </div>
            </div>

            <div className='filters'>
                <div className="sorting">
                    <button className="dropbtn" onClick={ handleSortClick }>
                        <FontAwesomeIcon icon={faArrowDownShortWide}/> Sort
                    </button>
                    <div className={drpdwnSort}>
                        <div onClick={() => { handleSortChoose('onDates')}} className="sort-item">
                           <FontAwesomeIcon icon={faArrowDownShortWide}/> Date
                        </div>
                        <div onClick={() => { handleSortChoose('onLikes')} } className="sort-item">
                            <FontAwesomeIcon icon={faArrowDownShortWide}/> Rate
                        </div>
                    </div> 
                </div>  
                <div className="filtering">
                    <button className="dropbtn" onClick={handleFilterClick}>
                        <FontAwesomeIcon icon={faFilter}/> Filter
                    </button>
                    <div className={drpdwnFilter}> 
                        <h3>TOPIC</h3>
                        <div className='categories-list'>
                            {
                                categories.map((item, index) => (
                                    <div className='category-item' key={index}>
                                        <span>{item.title}</span>
                                        <input value={item.title} type="checkbox"                    
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}/>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>DATE</h3>
                        <div className="date-list">
                            <input type="date" name="from" id="from" value={fromDate} onChange={handleDate}/><span style={{
                                width: '12px',
                                height: '2px',
                                background: '#023047',
                                margin: '0px 5px'
                            }}></span>
                            <input type="date" name="to" id="to" value={toDate} onChange={handleDate}/>
                        </div>
                        <div className='filtering-buttons'>
                            <button className='fsave' onClick={handleFilterChoose}>Save</button>   
                            <button className='fclear' onClick={() => { handleFilterChoose(); handleClear();}}>Clear all</button> 
                        </div>
                    </div> 
                </div>
            </div>

            <div className='post_wraper'>
                {
                    posts.posts.map(item => (
                        <Link key={item.id} to={"/posts/" + item.id} className="post__link">
                            <div className='post__item'>
                                <div className='post__additional-info'>

                                    <div className='post-rate'>
                                        <div><FontAwesomeIcon icon={faStar}/> {item.rating} </div>
                                        <div><FontAwesomeIcon icon={faMessage}/> {item.comments} </div>
                                    </div>

                                    <div className='post-creator'>
                                        <div>
                                            {
                                                users.map(uitem => (
                                                    uitem.id === item.userID ? uitem.login : null
                                                ))
                                            }
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
                        </Link>
                    ))
                }
            </div>

            <Pagination className="pagination"
                activePage={posts.currentPage}
                itemsCountPerPage={posts.itemsCountPerPage}
                totalItemsCount={posts.totalItems}
                pageRangeDisplayed={posts.totalPages}
                onChange={handlePageChange}
            />
        </div>
    );
  }
  
  export default Posts;