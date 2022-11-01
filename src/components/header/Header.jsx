import { useRef } from "react";
import {FaBars, FaTimes, FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import './header.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout, selectIsAuth, selectAuthUser } from "../redux/slices/auth";

function Header() {
	const navRef = useRef();
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const userData = useSelector(selectAuthUser)



	const onClickLogout = (e) => {
		e.preventDefault()
		if(window.confirm('Are you sure to logout?')) {
			dispatch(fetchLogout())
			window.localStorage.removeItem('accessToken')
			window.location.reload()
		}
	}

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3 className="Logo"><Link className="logo" to="/">USOF</Link></h3>
			<nav ref={navRef}>
				<Link onClick={showNavbar} to="/posts">Questions</Link>
				<Link onClick={showNavbar} to="/account">Account</Link>
				<Link onClick={showNavbar} to="/about-us">About Us</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			{
				isAuth ? <div>
							<img style={{borderRadius: '50%', marginRight: '5px'}} src={userData.profilePicture} alt='pic' width={32} height={32}></img>
							<span style={{marginRight: '10px'}}>{userData.login}</span>
							<button className="logout" onClick={onClickLogout}>Logout</button>
						</div> : 
						<Link className="logIn" to="/login">Log in
							<IconContext.Provider value={{ className: 'react-icons' }}>

								<FaUser/>

							</IconContext.Provider>
						</Link>
			}
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Header;