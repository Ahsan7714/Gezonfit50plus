// SignInSignUp.jsx

import React, { useState, useEffect } from "react";
import "./SignInSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signUp, signIn, clearState,loadUser } from "../../store/reducers/userReducers";
import Loader from "../../Components/Loader";
const SignInSignUp = ({ onClose }) => {
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
      toast.success("Succesvol aangemeld");
      dispatch(clearState());
      onClose();
      dispatch(loadUser());
    }
    if (error) {
      toast.error("E-mailadres Al geregistreerd");
      dispatch(clearState());
    }
  }, [isSignUpped]);
  useEffect(() => {
    if (isSignedIn) {
      toast.success("Succesvol aangemeld");
      dispatch(clearState());
      onClose();
      dispatch(loadUser());
    }
    if (error) {
      toast.error("Verkeerde email of wachtwoord");
    }
  }, [isSignedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log(
        `Signing up with Name: ${name}, Email: ${email}, Password: ${password}`
      );
      dispatch(signUp({ name, email, password }));
    } else {
      console.log(`Signing in with Email: ${email}, Password: ${password}`);
      dispatch(signIn({ email, password }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="auth-popup">
      <button className="close-btn text-3xl" onClick={onClose}>
        &times;
      </button>
      <div className="auth-content">
        <h2 className="font-bold text-3xl">
          {isSignUp ? "Create An Account" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <p className="toggle-form-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span onClick={toggleForm} className="toggle-form-span">
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
