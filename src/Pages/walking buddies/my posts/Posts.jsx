import React, { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

import {
  postPartner,
  deletePartner,
  getPendingPartners,
  getActivePartners,
  getAllInvites,
  clearState,
  deleteActivePartner,
} from "../../../store/reducers/userReducers";
import toast from "react-hot-toast";
import { Modal } from "bootstrap";
import Loader from "../../../Components/Loader";

const Posts = () => {
  const dispatch = useDispatch();
  const {
    pendingPartners,
    loading,
    error,
    isPartnerPosted,
    activePartners,
    isPartnerDeleted,
    acceptedInvites,
    isActivePartnerDeleted,
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    route: "",
    startTime: "",
    endTime: "",
    city: "",
    image: "",
    category: "",
    description: "",
  });

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    dispatch(getPendingPartners());
    dispatch(getActivePartners());
    dispatch(getAllInvites());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
        // setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isPartnerPosted) {
      toast.success("Succesvol geplaatst");
      dispatch(getPendingPartners());
      dispatch(getActivePartners());
      dispatch(getAllInvites());
      dispatch(clearState());
      setFormData({
        name: "",
        age: "",
        gender: "",
        route: "",
        startTime: "",
        endTime: "",
        city: "",
        image: "",
        category: "",
        description: "",
      });
    }
  }, [isPartnerPosted, isPartnerDeleted]);

  useEffect(() => {
    if (isPartnerDeleted) {
      dispatch(getPendingPartners());
      dispatch(getActivePartners());
      toast.success("Bericht succesvol verwijderd");
      dispatch(clearState());
    }
  }, [isPartnerDeleted, dispatch,clearState]);
  useEffect(() => {
    if (isActivePartnerDeleted) {
      dispatch(getPendingPartners());
      dispatch(getActivePartners());
      toast.success("Bericht succesvol verwijderd");
      dispatch(clearState());
    }
  }, [isActivePartnerDeleted,dispatch,clearState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postPartner(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = (id ,status) => {
    const confirmed = window.confirm(
      "Weet je zeker dat je dit bericht wilt verwijderen?"
    );
    if(confirmed){
      if (status === "pending") {
        dispatch(deletePartner(id));
      } else{
        dispatch(deleteActivePartner(id));
      }
    }
  };

  const combinedPartners = [
    ...(pendingPartners || []),
    ...(activePartners || []),
  ];
  console.log(combinedPartners);

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
    <div className="post-container font-outfit ">
      <div className="post-header">
        <h1 className=" text-4xl font-medium">Mijn Posts</h1>
        <button
          type="button"
          className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] px-3 py-2 text-white rounded-md"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Zoek een activiteitenpartner
        </button>
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
                Zoek een activiteitenpartner
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="post-form" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Voer naam in"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className=" flex flex-row justify-between gap-[10px]">
                  <div className="form-group w-2.9/6">
                    <label>Leeftijd</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Voer leeftijd in"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group w-2.9/6">
                    <label>Woonplaats</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Woonplaats invoeren"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Route</label>
                  <input
                    type="text"
                    name="route"
                    placeholder="Route invoeren"
                    value={formData.route}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="flex flex-row justify-between gap-[10px]">
                  <div className="form-group flex gap-3 pb-2 ">
                    <label>Voer de starttijd in </label>
                    <input
                      type="time"
                      name="startTime"
                      // placeholder="Bijv. 10:00 AM - 12:00 PM"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-control border"
                      required
                    />
                  </div>
                  <div className="form-group flex gap-3 pb-2 ">
                    <label> Voer de eindtijd in</label>

                    <input
                      type="time"
                      name="endTime"
                      // placeholder="Bijv. 10:00 AM - 12:00 PM"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-control border"
                      required
                    />
                  </div>
                </div>
                <div className="flex  flex-row justify-between gap-[10px]">
                  <div className="form-group ">
                    <label>Categorie</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Selecteer Categorie</option>
                      <option value="Walking">Wandelen</option>
                      <option value="Cycling">Fietsen</option>
                      <option value="Swimming">Zwemmen</option>
                      <option value="Exercise">Fitnes/Yoga</option>
                    </select>
                  </div>
                  <div className="form-group ">
                    <label>Geslacht</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control "
                      required
                    >
                      <option value="">Selecteer Geslacht</option>
                      <option value="Male">Man</option>
                      <option value="Female">Vrouw</option>
                      <option value="Other">Anders</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Afbeelding</label>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Beschrijving</label>
                  <textarea
                    name="description"
                    placeholder="Voer beschrijving in"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control border border-[#0000004e]"
                    required
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
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Maak Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="myposts ">
        {combinedPartners && combinedPartners.length > 0 ? (
          combinedPartners.map((post, index) => (
            <div
              className="mypost border rounded-lg px-4 pb-4 shadow-md bg-[#f5f5f5] "
              key={index}
            >
              <div className="mypost-header relative">
                <RiDeleteBin5Fill
                  onClick={() => handleDelete(post._id,post.status)}
                  className=" absolute top-0 -left-2 text-white bg-red-500 rounded-sm cursor-pointer h-[27px] w-[27px] p-1"
                />
                <div className=" flex items-center">
                  <h2 className="text-2xl font-medium capitalize">
                    {post.name}
                  </h2>
                  {post.status === "active" ? (
                    <MdVerified className="text-blue-500 ml-2 text-[20px]" />
                  ) : (
                    <MdPending className="text-orange-400 ml-2 text-[22px]" />
                  )}
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.name}
                    className="w-20 h-20 rounded-full object-cover grid gap-[2.75rem]"
                  />
                )}
              </div>
              <div className="mypost-body  bg-white rounded-lg ">
                <p className=" flex  gap-[5px]">
                  <strong>Leeftijd:</strong> {""}
                  {post.age}
                </p>
                <p className=" flex gap-[5px]">
                  <strong>Geslacht:</strong> {""}
                  {post.gender}
                </p>
                <p className=" flex gap-[5px]">
                  <strong>Route:</strong> {""}
                  {post.route}
                </p>
                <p className=" flex gap-[5px]">
                  <strong>Starttijd:</strong> {""}
                  {convertTo12HourFormat(post.startTime)}
                </p>
                <p className=" flex gap-[5px]">
                  <strong>Eindtijd:</strong> {""}
                  {convertTo12HourFormat(post.endTime)}
                </p>
                <p className=" flex gap-[5px]">
                  <strong>categorie:</strong> {""}
                  {post.category}
                </p>
                <p className="  gap-[5px]">
                  <strong>Beschrijving:</strong> {""}
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
              </div>
            </div>
          ))
        ) : (
          <div>Geen partners in behandeling</div>
        )}
      </div>
      {/* accepted invites */}
      <div className=" ml-4">
        <h1 className=" text-4xl font-medium pb-5">
          Geaccepteerde uitnodigingen
        </h1>
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4">
          {acceptedInvites && acceptedInvites.length > 0 ? (
            acceptedInvites.map((invite, index) => (
              <div className=" flex">
                <div className=" bg-gray-100 rounded-lg shadow-md w-[90%] p-4 h-[250px] overflow-y-auto">
                  <h1 className=" text-center font-semibold pb-2 text-[25px]">
                    Sender Details
                  </h1>
                  <div className=" flex justify-between text-[20px]">
                    <p className=" font-medium">Name : </p>
                    <p>{invite.name}</p>
                  </div>
                  <div className=" flex justify-between text-[20px]">
                    <p className=" font-medium">Contact : </p>
                    <p>{invite.contactInfo}</p>
                  </div>
                  <div className=" flex flex-col justify-between text-[20px]">
                    <p className=" font-medium">Message: </p>
                    <p>{invite.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Geen geaccepteerde uitnodigingen</div>
          )}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Posts;