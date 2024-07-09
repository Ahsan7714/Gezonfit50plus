import React from "react";
import "./Footer.css";
import logo from "../../assets/footer.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/", { state: { scrollToContact: true } });
  };

  return (
    <div className="footer -mb-6">
      <div className="top-footer py-7">
        <div className="left-footer">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="right-footer text-white hover:text-white">
          <ul>
            <li>
              <Link to="/about-us">Over Ons</Link>
            </li>
            <li>
              <button onClick={handleContactClick}>Neem Contact Op</button>
            </li>
            <li>
              <Link to="/privacy-policy">Privacybeleid</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-footer">
        <p>Copyright © Gezondfit50+ 2024</p>
      </div>
    </div>
  );
};

export default Footer;
