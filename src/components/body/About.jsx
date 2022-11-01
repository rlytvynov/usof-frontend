import React from 'react';
//import axios from 'axios';
import './styles/about.css'
import { FaPhone, FaEnvelope} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function About() {

    return(
        <div className="about">

            <div className="about-text">
                <h3>About Us</h3>
                <p>One of the best things about working with people who have different skills and backgroundsis experience exchange. This is the idea behind StackOverflow, a popular question anda nswer system Q&amp;A about programming </p>
            </div>

            <div className="about-qua-logo">
                <h1>Q&amp;A</h1>
            </div>

            <div className='about-logo'>
                <img alt='' src={require('../../assets/q&a.png')}/>
            </div>
            
            <div className="contact-links">
                <h3>CONTACTS</h3>
                <a alt='' target="_blank" rel="noreferrer" href="tel:+380977322447"> <FaPhone/> +380977322447 </a>
                <a alt='' target="_blank" rel="noreferrer" href="mailto:litvinromeo@gmail.com"> <FaEnvelope/> litvinromeo@gmail.com </a>
                <a alt='' target="_blank" rel="noreferrer" href="https://www.google.com.ua/maps/place/%D0%9E%D0%B1%D1%89%D0%B5%D0%B6%D0%B8%D1%82%D0%B8%D0%B5+%E2%84%961+%22%D0%93%D0%B8%D0%B3%D0%B0%D0%BD%D1%82%22/@50.0061598,36.2498619,18.7z/data=!4m5!3m4!1s0x4127a0db339f76ab:0xe9488a89800aee6e!8m2!3d50.0063164!4d36.2498398?hl=ru"> <FontAwesomeIcon icon={faLocationDot}/> Kharkov, Ukraine </a>
            </div>

        </div>

    )
}

  
export default About;