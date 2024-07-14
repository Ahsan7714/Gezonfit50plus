import React, { useState, useEffect } from "react";
import "./services.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getServices } from "../../store/reducers/postReducers";
import { loadUser } from "../../store/reducers/userReducers";
import Loader from "../../Components/Loader";
import Cards from "../../Components/Cards/Cards";

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const dispatch = useDispatch();
  const { activeservices,loading} = useSelector((state) => state.post);
  const { user} = useSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);


  const handleSearch = () => {
    const filtered = activeservices.filter((service) =>
      service.postalCode.includes(postalCode)
    );
    setFilteredServices(filtered);
  };

  const openModal = (service, index) => {
    setSelectedService({ ...service, index });
    // Trigger Bootstrap modal manually
    const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    myModal.show();
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
    <>
    {screenSize > 786 ? (
        <>
          <Cards />
        </>
      ) : (
        <></>
      )}
    <div className="services-container  font-outfit">
      <div className="services-header">
        <h1>Onze Diensten</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Zoek op postcode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button onClick={handleSearch}>Zoeken</button>
        </div>
        {user ? (<Link
          to="/my-services"
          className="bg-green-500 px-3 py-2 text-white rounded-md"
        >
          Mijn Diensten
        </Link>):(
          <button onClick={() => toast.error("Meld u aan om deze functie te gebruiken")}
          className="bg-green-500 px-3 py-2 text-white rounded-md"
>
            Mijn Diensten
          </button>
        )}
        
      </div>
      <div className="service-list">
        {activeservices && activeservices.length > 0 ? (
          activeservices.map((service, index) => (
            <div className="service-card" key={index}>
              <img src={service.image} alt={service.serviceName} />
              <div className="service-info">
                <h2 className="flex text-3xl">{service.serviceName}</h2>
                <p className="flex justify-between">
                  <strong>Kosten</strong> € {service.rate} per uur
                </p>
                <p className="flex justify-between">
                <strong>Contact</strong>{service.contact}
                </p>
                <button
                  className="details-btn"
                  onClick={() => openModal(service, index)}
                >
                  lees details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
      {/* Modal Start */}
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="font-bold text-3xl">
                {selectedService?.serviceName}
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body flex flex-col w-full">
              {selectedService && (
                <>
                  <p className="text-xl flex flex-column gap-[5px]">
                    <strong>Kosten</strong> € {selectedService.rate} per uur
                  </p>
                  <p className="text-xl flex flex-column gap-[5px]">
                    <strong>Bijkomende kosten</strong>{" "}
                    {selectedService.serviceDetails}
                  </p>
                  <p className="text-xl flex flex-column gap-[5px]">
                    <strong>Telefoonnummer</strong> {selectedService.contact}
                  </p>
                  <p className="text-xl flex flex-column gap-[5px]">
                    <strong>Postcode</strong> {selectedService.postalCode}
                  </p>
                  <p className="text-xl flex flex-column gap-[5px]">
                    <strong>Beschrijving</strong>{" "}
                    {expandedDescriptions[selectedService.index]
                      ? selectedService.description || ""
                      : truncateText(selectedService.description, 15)}
                    {selectedService.description && selectedService.description.split(" ").length > 20 && (
                      <span
                        className="toggle-description cursor-pointer text-blue-700"
                        onClick={() => toggleDescription(selectedService.index)}
                      >
                        {expandedDescriptions[selectedService.index] ? " Lees minder" : " Lees meer"}
                      </span>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
    </div>
    </>

  );
}

export default Services;