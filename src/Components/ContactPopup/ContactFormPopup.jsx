import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import Loader from "../Loader";

const ContactFormPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { isContactUsSubmitted, loading, error } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isContactUsSubmitted) {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      toast.success("Bericht verzonden");
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [isContactUsSubmitted, error, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactUs(formData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-50 font-outfit">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold items-center flex justify-center mb-4">Contacteer Ons</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Naam</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Voer je naam in"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Voer je e-mail in"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Bericht</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Voer je bericht in"
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Indienen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPopup;