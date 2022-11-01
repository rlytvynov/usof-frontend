import React from 'react';
import './styles/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

function Home() {
    return (
        <div className="admin">

            <div className="profile">
                <div className="profile-img"><img alt='' src={require('../../assets/profile.jpg')}/></div>
                <div style={{textAlign: 'center', alignSelf: 'center', color: 'var(--mainColor)'}}><h2>Roman <br /> Lytvynov</h2></div>
            </div>

            <div className="info">
                <h3>About Project</h3>
                <p>One of the best things about working with people who have different skills and backgroundsis experience exchange. This is the idea behind StackOverflow, a popular question anda nswer system Q&amp;A about programming. <br /> Here on the left you can see creator of USOF </p>
            </div>

            <div className='profile-links'>
                <a alt='' target="_blank" rel="noreferrer" href="https://www.instagram.com/rlytvynov/"> <FaInstagram/> Instagramm </a>
                <a alt='' target="_blank" rel="noreferrer" href="https://www.facebook.com/rlytvynov"> <FaFacebook/> Facebook </a>
                <a alt='' target="_blank" rel="noreferrer" href="https://ru.wikipedia.org/wiki/%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2"> <FontAwesomeIcon icon={faLocationDot}/> Kharkov, Ukraine </a>
            </div>
            
            <div className="github-links">
                <h3>GitHub Links</h3>
                <a alt='' target="_blank" rel="noreferrer" href="https://github.com/rlytvynov/"> <FaGithub/> My Github </a>
                <a alt='' target="_blank" rel="noreferrer" href="https://github.com/rlytvynov/Swiftchat/"> <FaGithub/> Swiftchat </a>
                <a alt='' target="_blank" rel="noreferrer" href="https://github.com/rlytvynov/usof-backend/"> <FaGithub/> USOF </a>
            </div>

        </div>
    );
  }
  
  export default Home;