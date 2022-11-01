import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Account from "./components/body/Account";
import Posts from "./components/body/Posts";
import Login from "./components/body/Login";
import Register from "./components/body/Register";
import Activation from "./components/body/Activation";
import Post from "./components/body/Post";
import Home from "./components/body/Home";
import About from "./components/body/About"
import NewPost from "./components/body/NewPost";
import './components/body/styles/main.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./components/redux/slices/auth";


function App() {
  const dispatch = useDispatch()
  // eslint-disable-next-line
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
      const updateToken = async () => {
        const data = await dispatch(fetchAuthMe())
        console.log(data)
        if (data.payload && 'accessToken' in data.payload) {
            window.localStorage.setItem('accessToken', data.payload.accessToken)
        }
    }
    updateToken()
  }, [dispatch])

  return (
    <Router>
      <Header/>
      <div className="main">
        <Routes>
          <Route index element={ <Home/> } />

          <Route exact path='/login' element={ <Login/> } />
          <Route exact path='/register' element={ <Register/> } />
          <Route exact path='/activation/:activationToken' element={ <Activation/> } />


          <Route exact path='/posts' element={ <Posts/> } />
          <Route exact path='/newPost' element={ <NewPost/> } />
          <Route exact path='/posts/:id' element={ <Post/> } />
          <Route exact path='/account/' element={ <Account/> } />
          <Route exact path='/about-us/' element={ <About/> } />

        </Routes>
      </div>  
      <Footer/>
    </Router>
  );
}

export default App;
