import React, { useState , useEffect} from 'react';
import './Contact.css';
import { useDispatch,useSelector } from 'react-redux';
import { contactUs,clearState } from '../../store/reducers/userReducers';
import toast, { LoaderIcon } from 'react-hot-toast'
import Loader from '../Loader';

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { isContactUsSubmitted , loading,error } = useSelector((state) => state.user); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if(isContactUsSubmitted){
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      toast.success('Bericht verzonden');
      clearState();
    }
    if(error){
      toast.error(error);
    }
  }, [isContactUsSubmitted,clearState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactUs(formData));
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div className="contact-container font-outfit">
      <h2>Laten we in contact komen!</h2>
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
            placeholder='Voer je naam in'
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
            placeholder='Voer je e-mail in'
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
            placeholder='Voer je bericht in'
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Verzenden</button>
      </form>
    </div>
  );
}

export default Contact;
