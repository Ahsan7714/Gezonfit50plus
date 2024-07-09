import React, { useState, useEffect } from "react";
import "./mainNewsLetter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToNewsletter,
  clearState,
} from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import Loader from "../Loader";

const MainNewsletter = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const { isNewsletterSubscribed, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isNewsletterSubscribed) {
      setEmail("");
      toast.success("Subscribed to newsletter successfully");
      dispatch(clearState());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isNewsletterSubscribed, error]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch(subscribeToNewsletter({ email }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="newsletter-popup font-outfit">
      <button className=" text-4xl close-btn" onClick={onClose}>
        &times;{" "}
      </button>
      <div className="newsletter-content">
        <h2 className="font-bold text-4xl text-[#0f8ceb]">
          Meld je aan voor onze nieuwsbrief
        </h2>
        <p className="text-xl">
          Blijf op de hoogte, gemotiveerd en verbonden met Gezondfit50+.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Voer je e-mail in"
            required
            className=" outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1]"
          >
            Abonneren
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainNewsletter;
