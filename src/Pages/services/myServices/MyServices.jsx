import React, { useState, useEffect } from "react";
import "./MyServices.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  postService,
  clearState,
  deleteService,
  getPendingServices,
  getActiveServices,
  deleteActiveService,
} from "../../../store/reducers/postReducers";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdPending, MdVerified } from "react-icons/md";
import Loader from "../../../Components/Loader";

function MyServices() {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDetails: "",
    contact: "",
    description: "",
    postalCode: "",
    rate: "",
    image: null,
  });

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const dispatch = useDispatch();
  const { isServicePosted, isServiceDeleted, pendingservices, loading, error,services,isActiveServiceDeleted } =
    useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPendingServices());
    dispatch(getActiveServices());
    console.log(pendingservices);
  }, [dispatch]);

  useEffect(() => {
    if (isServicePosted) {
      toast.success("Service succesvol geplaatst");
      dispatch(clearState());
      dispatch(getPendingServices());
      dispatch(getActiveServices());
      setFormData({
        serviceName: "",
        serviceDetails: "",
        contact: "",
        description: "",
        postalCode: "",
        rate: "",
        image: "",
      });
    }
    if (isServiceDeleted) {
      toast.success("Dienst succesvol verwijderd");
      dispatch(clearState());
      dispatch(getPendingServices());
      dispatch(getActiveServices());
    }
    if (isActiveServiceDeleted) {
      toast.success("Dienst succesvol verwijderd");
      dispatch(clearState());
      dispatch(getPendingServices());
      dispatch(getActiveServices());
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
      dispatch(getPendingServices());
      dispatch(getActiveServices());
    }
  }, [isServicePosted, isServiceDeleted, error, dispatch]);

  const handleDelete = (id,status) => {
    if(status==="active"){
      dispatch(deleteActiveService(id));
    }else{
      dispatch(deleteService(id));
    }
  };

  const handleUpload = () => {
    dispatch(postService(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "serviceDetails") {
      const words = value.split(" ");
      if (words.length > 11) {
        toast.error("Service highlight should not exceed 10 words");
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: reader.result });
      }
    };

    reader.readAsDataURL(file);
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
  const combinedServices = [...services, ...pendingservices];
  if (loading) {
    return <Loader />;
  }


  return (
    <div className="p-[20px]">
      <div className="myServices-header">
        <h1>Mijn Diensten</h1>
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Dienst Toevoegen
        </button>
      </div>

      {/* Modal Start */}
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
                Upload uw Diensten
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body flex flex-col w-full">
              <div className="flex flex-col">
                <label htmlFor="serviceName" className="">
                  Dienst Titel
                </label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  placeholder="Voer diensttitel in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={formData.serviceName}
                  onChange={handleChange}
                />
                <label htmlFor="rate" className="pt-2">
                  Dienstkosten
                </label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  placeholder="Voer uurtarief in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={formData.rate}
                  onChange={handleChange}
                />
                <label htmlFor="serviceDetails" className="pt-2">
                  Service hoogtepunt
                </label>
                <input
                  type="text"
                  id="serviceDetails"
                  name="serviceDetails"
                  placeholder="Servicehoogtepunt invoeren (maximaal 10 woorden)"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={formData.serviceDetails}
                  onChange={handleChange}
                />
                <label htmlFor="contact" className="pt-2">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Voer contactinformatie in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={formData.contact}
                  onChange={handleChange}
                />

                <label htmlFor="postalCode" className="pt-2">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Voer postcode in"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  value={formData.postalCode}
                  onChange={handleChange}
                />

                <label htmlFor="description" className="pt-2">
                  Dienstbeschrijving
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full border-2 border-gray-400 rounded-md py-2 px-1 outline-none"
                  placeholder="Voer dienstbeschrijving in"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="image" className="pt-2">
                  Upload Dienstafbeelding
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="mb-2 w-full border-2 border-gray-400 rounded-md py-1 px-1 outline-none"
                  onChange={handleFileChange}
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
                onClick={handleUpload}
                data-bs-dismiss="modal"
              >
                Uploaden
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}

      <div className="myService-list">
        {combinedServices && combinedServices.length > 0 ? (
          combinedServices.map((service, index) => (
            <div className="myService-card flex-col" key={index}>
              <RiDeleteBin5Fill
                className=" absolute delete-button text-white bg-red-500 rounded-sm cursor-pointer h-[27px] w-[27px] p-1"
                onClick={() => handleDelete(service._id,service.status)}
              />

              <img src={service.image} />

              <div className=" mt-2 p-2 flex flex-row items-center ">
                <h2 className="text-xl font-bold">{service.serviceName}</h2>
                {service.status === "active" ? (
                  <MdVerified className="text-blue-500 ml-2 text-[20px] " />
                ) : (
                  <MdPending className="text-orange-400 ml-2 text-[22px]" />
                )}
              </div>
              <div className="service-body flex flex-col gap-[5px] p-2">
                <p className="mt-1 ">
                  <strong>Kosten:</strong> ${service.rate} per uur
                </p>
                <p className="mt-1 ">
                  <strong> Service Detail:</strong> {""}
                  {service.serviceDetails}
                </p>
                <p className="mt-1 ">
                  <strong>Contact:</strong>{" "}
                   {service.contact}
                </p>
                <p className="mt-1 ">
                  <strong>Postcode:</strong> {""}
                   {service.postalCode}
                </p>
                <p className="mt-1 ">
                  <strong>Beschrijving:</strong> {""}
                  {expandedDescriptions[index]
                  ? service.description
                  : truncateText(service.description, 15)}
                <button
                  onClick={() => toggleDescription(index)}
                  className="text-blue-500 ml-2"
                >
                  {expandedDescriptions[index] ? "Lees minder" : "Lees meer"}
                </button>
                </p>                
               
              </div>
            </div>
          ))
        ) : (
          <h1>Geen diensten gevonden</h1>
        )}
      </div>
    </div>
  );
}

export default MyServices;