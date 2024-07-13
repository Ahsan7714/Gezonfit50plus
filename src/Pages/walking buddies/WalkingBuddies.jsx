import NavbarA from "../../Components/NavbarA/NavbarA";
import Cards from "../../Components/Cards/Cards";
import "./walkingbuddies.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getAllActivePartners,
  clearState,
  sendInvite,
  loadUser,
} from "../../store/reducers/userReducers";
import Loader from "../../Components/Loader";

function WalkingBuddies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { activepartners, isInviteSent, loading, error, user } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [postId, setPostId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    dispatch(getAllActivePartners());
    dispatch(loadUser());
  }, [dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredPosts =
    activepartners?.filter((post) => {
      const conditions = [
        searchTerm
          ? post.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.city?.toLowerCase().includes(searchTerm.toLowerCase())
          : true,
        ageRange
          ? post.age >= parseInt(ageRange.split("-")[0]) &&
            post.age <= parseInt(ageRange.split("-")[1])
          : true,
        gender ? post.gender === gender : true,
        category ? post.category === category : true,
      ];
      return conditions.every(Boolean);
    }) ?? [];

  useEffect(() => {
    if (isInviteSent) {
      setName("");
      setContactInfo("");
      setMessage("");
      toast.success("Uitnodiging succesvol verzonden");
      dispatch(clearState());
      dispatch(getAllActivePartners());
    }
  }, [isInviteSent, dispatch]);

  const handleSubmit = () => {
    if (!postId) {
      console.error("postId is not set properly");
      return;
    }
    if (!name || !contactInfo || !message) {
      toast.error("alle velden zijn verplicht");
      return;
    }
    const data = { name, contactInfo, message };
    dispatch(sendInvite({ id: postId, data }));
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hours12 = hours % 12 || 12;
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${hours12}:${minutes} ${amPm}`;
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {screenSize > 786 ? (
        <>
          <Cards />
        </>
      ) : (
        <></>
      )}
      <div className="main-container capitalize">
        <div className="header-1 flex flex-col lg:flex-row gap-3 items-center justify-between lg:py-4">
          <h1 className="lg:text-4xl font-semibold">
            Zoek activiteitenpartners
          </h1>
          {/* if user the navite to link page elso show toast error */}
          {user ? (
            <Link
              to="/posts"
              className="bg-[#37a8d8] shadow-[#ade6ff] shadow-lg text-white px-4 py-2 rounded hover:bg-[#247394]"
            >
              Mijn Posts
            </Link>
          ) : (
            <button
              onClick={() =>
                toast.error("Meld u aan om deze functie te gebruiken")
              }
              className="bg-[#37a8d8] shadow-[#ade6ff] shadow-lg text-white px-4 py-2 rounded hover:bg-[#247394]"
            >
              Mijn Posts
            </button>
          )}
        </div>
        <div className="filters flex gap-3 mb-4 justify-center items-center">
          <h1 className="text-center text-[30px]">zoekopdracht</h1>
          <input
            type="text"
            placeholder="zoeken op naam of stad"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 rounded p-2 border-[#00000077] lg:w-full"
          />
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="border-2 rounded p-2 border-[#00000077]"
          >
            <option value="">Selecteer Leeftijdsgroep</option>
            <option value="50-55">50-55</option>
            <option value="56-60">56-60</option>
            <option value="61-65">61-65</option>
            <option value="66-70">66-70</option>
            <option value="71-75">71-75</option>
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border-2 rounded p-2 border-[#00000077]"
          >
            <option value="">Selecteer Geslacht</option>
            <option value="Male">Man</option>
            <option value="Female">Vrouw</option>
            <option value="Other">Anders</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded p-2 border-[#00000077]"
          >
            <option value="">Selecteer Categorie</option>
            <option value="Walking">Wandelen</option>
            <option value="Cycling">Fietsen</option>
            <option value="Swimming">Zwemmen</option>
            <option value="Exercise">Fitnes/Yoga</option>
          </select>
        </div>
        <div className="walk-posts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              No person found
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <div
                className="walk-post border  rounded-lg p-4 shadow-md bg-[#f5f5f5]"
                key={index}
              >
                <div className="post-header flex items-center space-x-4 lg:mb-0">
                  <h2 className="text-xl font-semibold capitalize">
                    {post.name}
                  </h2>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="post-body  bg-white rounded-lg">
                  <p className="flex  justify-between  ">
                    <strong>Leeftijd:</strong> {""}
                    {post.age}
                  </p>
                  <p className="flex  justify-between">
                    <strong>Geslacht:</strong> {""}
                    {post.gender}
                  </p>
                  <p className="flex justify-between">
                    <strong>Woonplaats:</strong> {""}
                    {post.city}
                  </p>
                  <p className="flex  gap-[5px] justify-between">
                    <strong>Route:</strong> {""}
                    {post.route}
                  </p>
                  <p className="flex  justify-between ">
                    <strong>Starttijd:</strong> {""}
                    {convertTo12HourFormat(post.startTime)}
                  </p>
                  <p className="flex  justify-between">
                    <strong>Eindtijd:</strong> {""}
                    {convertTo12HourFormat(post.endTime)}
                  </p>
                  <p className="flex justify-between">
                    <strong>Categorie:</strong> {""}
                    {post.category}
                  </p>
                  <p className="  gap-[5px]">
                    <strong>Beschrijving:</strong>{" "}
                    {expandedDescriptions[index]
                      ? post.description
                      : truncateText(post.description, 15)}
                    {post.description.split(" ").length > 15 && (
                      <button
                        onClick={() => toggleDescription(index)}
                        className="text-blue-500 ml-2"
                      >
                        {expandedDescriptions[index]
                          ? "Lees minder"
                          : "Lees meer"}
                      </button>
                    )}
                  </p>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => setPostId(post._id)}
                  >
                    Accepteer Uitnodiging
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title font-bold text-2xl"
                id="staticBackdropLabel"
              >
                Uitnodiging Versturen
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="flex flex-col">
                <label htmlFor="name" className="">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Voer uw naam in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="contact" className="pt-2">
                  Contact
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Voer uw contactgegevens in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                />
                <label htmlFor="message" className="pt-2">
                  Bericht
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  placeholder="Schrijf uw bericht"
                ></textarea>
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
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Versturen
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
}

export default WalkingBuddies;