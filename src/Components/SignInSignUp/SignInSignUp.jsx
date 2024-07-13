// SignInSignUp.jsx

import React, { useState, useEffect } from "react";
import "./SignInSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signUp, signIn, clearState, loadUser } from "../../store/reducers/userReducers";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";

const SignInSignUp = ({ onClose }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, isSignedIn, isSignUpped } = useSelector(
    (state) => state.user
  );

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isSignUpped) {
      toast.success("Succesvol geregistreerd");
      dispatch(clearState());
      onClose();
      dispatch(loadUser());
      navigate("/");
    }
    if (error) {
      toast.error("E-mailadres al geregistreerd");
      dispatch(clearState());
    }
  }, [isSignUpped]);

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Succesvol aangemeld");
      dispatch(clearState());
      onClose();
      dispatch(loadUser());
      navigate("/");
    }
    if (error) {
      toast.error("Verkeerd e-mailadres of wachtwoord");
      dispatch(clearState());
    }
  }, [isSignedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log(
        `Registreren met Naam: ${name}, E-mailadres: ${email}, Wachtwoord: ${password}`
      );
      dispatch(signUp({ name, email, password }));
    } else {
      console.log(`Aanmelden met E-mailadres: ${email}, Wachtwoord: ${password}`);
      dispatch(signIn({ email, password }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="auth-popup capitalize font-outfit">
      <button className="close-btn text-3xl" onClick={onClose}>
        &times;
      </button>
      <div className="auth-content">
        <h2 className="font-bold text-3xl">
          {isSignUp ? "Maak een account aan" : "Aanmelden"}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naam"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mailadres"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            required
          />
          <button type="submit">{isSignUp ? "Registreren" : "Aanmelden"}</button>
        </form>
        <p className="toggle-form-text">
          {isSignUp ? "Heb je al een account? " : "Heb je geen account? "}
          <span onClick={toggleForm} className="toggle-form-span">
            {isSignUp ? "Aanmelden" : "Registreren"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
