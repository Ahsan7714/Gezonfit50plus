import React, { useState, useEffect } from "react";
import "./events.css";
import NavbarA from "../../Components/NavbarA/NavbarA";
import Cards from "../../Components/Cards/Cards";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveEvents,
  clearState,
  postEvent,
  loadUser
} from "../../store/reducers/userReducers";
import { nl } from "date-fns/locale";
import Loader from "../../Components/Loader";

function Events() {
  const dispatch = useDispatch();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { activeEvent, isEventPosted, loading, error ,user} = useSelector(
    (state) => state.user
  );
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(getActiveEvents());
  }, [dispatch]);

  useEffect(() => {
    if (isEventPosted) {
      setTitle("");
      setLocation("");
      setDate("");
      setTime("");
      setDescription("");
      setImage(null);
      toast.success("Evenement geplaatst");
      dispatch(clearState());
      dispatch(getActiveEvents())
    }
    if (error) {
      toast.error(error);
    }
  }, [isEventPosted, error, dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(activeEvent);

  useEffect(() => {
    setFilteredEvents(activeEvent);
  }, [activeEvent]);

  const handleDateChanged = (date) => {
    setSelectedDate(date);
    filterEvents(date);
  };

  const filterEvents = (date) => {
    if (date === null) {
      setFilteredEvents(activeEvent);
    } else {
      const formattedDate = format(date, "yyyy-MM-dd");
      const filtered = activeEvent.filter(
        (event) => event.date === formattedDate
      );
      setFilteredEvents(filtered);
    }
  };

  const handleEventSubmit = () => {
    const formData = {
      title,
      location,
      date,
      time,
      description,
      image,
    };

    dispatch(postEvent(formData));
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <NavbarA /> */}
      {screenSize > 786 ? (
        <>
          <Cards />
        </>
      ) : (
        <></>
      )}
      <div className="container font-outfit">
        <div className="header">
          <h1>Evenementen</h1>
          <div className="flex items-center gap-2">
            <div className="date-picker-wrapper">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChanged}
                placeholderText="Selecteer een datum"
                dateFormat="yyyy-MM-dd"
                className=""
                locale={nl}
              />
            </div>
            <div>
              {user ? (
                <button
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] px-3 py-2 text-white rounded-md"
              >
                Post Event
              </button>
              )  : (
               <button  onClick={()=>toast.error("Please SignUp or login to post events")}  className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] px-3 py-2 text-white rounded-md"
>Post Event</button>
              )}
              
            </div>
          </div>
        </div>
        {/* modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Evenement Uploaden
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Sluiten"
                ></button>
              </div>
              <div className="modal-body flex flex-col w-full">
                <div className="flex flex-col">
                  <label htmlFor="" className="">
                    Evenement Naam
                  </label>
                  <input
                    type="text"
                    name="title"
                    id=""
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Voer evenement naam in"
                    className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  />
                  <label htmlFor="" className="pt-2">
                    Evenement Locatie
                  </label>
                  <input
                    type="text"
                    name="location"
                    id=""
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Voer evenement locatie in"
                    className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  />
                  <p className="text-[17px] pt-2 pb-2">
                    Voer Evenement Datum en Tijd in
                  </p>
                  <div className="flex gap-3 pb-2">
                    <input
                      type="date"
                      name="date"
                      id=""
                      value={date}
                      onChange={handleDateChange}
                      placeholder="Voer evenement datum in"
                      className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                    />
                    <input
                      type="time"
                      name="time"
                      id=""
                      value={time}
                      onChange={handleTimeChange}
                      placeholder="Voer evenement tijd in"
                      className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                    />
                  </div>
                  <label htmlFor="">Evenement Details</label>
                  <textarea
                    name="description"
                    id=""
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                    placeholder="Schrijf gebeurtenisdetails (maximaal 50 woorden)"
                  ></textarea>
                  <label htmlFor="" className="pt-1">
                    Upload Evenement Afbeelding
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    className="mb-2 w-full border-2 border-gray-400 rounded-md py-1 px-1 outline-none"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Sluiten
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEventSubmit}
                  aria-label="Close"
                  data-bs-dismiss="modal"
                >
                  Uploaden
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="events-list">
          {filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={index} className="event-card">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-details">
                  <h2>{event.title}</h2>
                  <p>
                    <strong>Datum:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Tijd:</strong>  {formatTime(event.time)}
                  </p>
                  <p>
                    <strong>Locatie:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Beschrijving:</strong>{" "}
                    {expandedDescriptions[index]
                      ? event.description || ""
                      : truncateText(event.description, 20)}
                    {event.description && event.description.split(" ").length > 20 && (
                      <span className="toggle-description" onClick={() => toggleDescription(index)}>
                        {expandedDescriptions[index] ? " Lees minder" : " Lees meer"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">Geen evenementen gevonden</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Events;