import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import logo from "../../assets/admin.png";
import "./navbarA.css";

function NavbarA({ onAuthClick, onNewsletterClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    navigate("/", { state: { scrollToContact: true } });
  };

  return (
    <div className="flex justify-between items-center px-10 py-7 font-outfit shadow-xl">
      <Link to="/" className="">
        <img src={logo} alt="logo" className="h-[40px]" />
      </Link>
      <div className="flex gap-5 text-[20px]">
        <p>
          <Link to="/" className="hover:no-underline text-black">
            Startpagina
          </Link>
        </p>
        <p>
          <button onClick={onAuthClick} className="hover:no-underline text-black">
            Aanmelden en registreren
          </button>
        </p>
        <p>
          <button onClick={onNewsletterClick} className="hover:no-underline text-black">
            Nieuwsbrief
          </button>
        </p>
        <p>
          <button onClick={handleContactClick} className="hover:no-underline text-black">
            Contact
          </button>
        </p>
      </div>
    </div>
  );
}

export default NavbarA;