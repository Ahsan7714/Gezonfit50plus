import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarA from '../../Components/NavbarA/NavbarA';
import Cards from '../../Components/Cards/Cards';
import LandingCarasoul from '../../Components/landingCarasoul/LandingCarasoul';
import Vision from '../../Components/Vision/Vision';
import Contact from '../../Components/contact/Contact';
import Footer from '../../Components/Footer/Footer';
import MobileCards from '../../Components/MobileCards/MobileCards';
import MainNewsletter from '../../Components/mainNewsLetter/MainNewsletter';
import { scroller } from 'react-scroll';

const Home = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const location = useLocation();

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToContact) {
      scroller.scrollTo("contact-section", {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [location.state]);
  return (
    <div className=' '>
      {
      screenSize > 786?
      <>
        <Cards/>
      </>:
      <>
        <MobileCards/>
      </>
      }
     
      <LandingCarasoul/>
      <Vision/>
      <div id="contact-section">
        <Contact/>
      </div>

    </div>
  )
}

export default Home