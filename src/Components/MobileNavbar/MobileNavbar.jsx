// src/Components/MobileNavbar/MobileNavbar.jsx
import React, { useState } from 'react';
import nav from '../../assets/default1.png';
import { FaBars, FaHome, FaBlog, FaWalking, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { MdMiscellaneousServices } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { MdOutlineContactSupport } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import ContactFormPopup from '../ContactPopup/ContactFormPopup';

const MobileNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAuthPopup = () => {
    setShowAuthPopup(!showAuthPopup);
    setIsSidebarOpen(false); // Close the sidebar when the popup is opened
  };

  const toggleContactPopup = () => {
    setShowContactPopup(!showContactPopup);
    setIsSidebarOpen(false); // Close the sidebar when the popup is opened
  };

  return (
    <div>
      <div className="flex items-center justify-between py-1 px-2">
        <Link to="/" className="w-[40%]">
          <img src={nav} alt="" className="h-[50px]" />
        </Link>
        <div className="bg-gray-600 p-2 rounded-md text-white cursor-pointer" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="flex flex-col items-start p-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-xl">Menu</span>
              <button className="text-[40px]" onClick={toggleSidebar}>×</button>
            </div>
            <div className="mt-4 w-full capitalize">
              <Link to="/" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <FaHome className="mr-2" />  Startpagina
              </Link>
              <Link to="/blogs" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <FaBlog className="mr-2" /> Artikelen en Blogs
              </Link>
              <Link to="/walking-buddies" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <FaWalking className="mr-2" /> Activiteit Partners
              </Link>
              <Link to="/community" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <FaUsers className="mr-2" /> gemeenschap
              </Link>
              <Link to="/events" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <FaCalendarAlt className="mr-2" /> Evenementen
              </Link>
              <Link to="/products" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <HiOutlineShoppingBag className="mr-2" /> Products
              </Link>
              <Link to="/services" onClick={toggleSidebar} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <MdMiscellaneousServices className="mr-2" /> Services
              </Link>
              <button onClick={toggleAuthPopup} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <IoMdLogIn className="mr-2" /> SignIn & SignUp
              </button>
              <button onClick={toggleContactPopup} className="flex items-center py-2 px-4 text-[20px] hover:bg-gray-200">
                <MdOutlineContactSupport className="mr-2" /> Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuthPopup && <SignInSignUp onClose={toggleAuthPopup} />}
      {showContactPopup && <ContactFormPopup onClose={toggleContactPopup} />}
    </div>
  );
};

export default MobileNavbar;