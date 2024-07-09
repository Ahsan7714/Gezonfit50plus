import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./LandingCarasoul.css";
import { LuMousePointerClick } from "react-icons/lu";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Import arrow icons

const LandingCarasoul = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 464);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 464);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div id="landingPageCarasoule">
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        arrows={!isMobile} // Conditionally render arrows
        dotListClass="custom-dot-list-style"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {/* Show only on laptop */}
        {!isMobile ? (
          <div className=" font-outfit h-[70vh]">
            <div className=" flex bg-[#237ba1] ">
              <div className="shadow_heading flex-1">
                <img src="" alt="" />
                <img
                  src="./images/h1.jpg"
                  alt=""
                  className=" w-full object-cover h-[70vh]"
                />
              </div>
              <div className=" flex-1 flex flex-col justify-center items-center">
                <h1 className=" text-white font-semi-bold text-[30px] w-[80%]">
                  Blijf actief, blijf gelukkig, blijf jong! Gezondfit50plus is
                  jouw platform voor inspiratie en vitaliteit.
                </h1>
              </div>
            </div>
          </div>
        ) : null}

        {/* Show only on mobile */}
        {isMobile ? (
          <div className="font-outfit">
            <div className="content flex flex-col bg-[#237ba1] gap-3">
              <div className="shadow_heading flex-1">
                <img src="" alt="" />
                <img
                  src="./images/h1.jpg"
                  alt=""
                  className=" w-full object-cover"
                />
              </div>
              <div className=" flex-1 flex flex-col justify-center items-center">
                <h1 className=" text-white font-semi-bold text-[25px] w-[95%]">
                  Blijf actief, blijf gelukkig, blijf jong! Gezondfit50plus is
                  jouw platform voor inspiratie en vitaliteit.
                </h1>
              </div>
            </div>
          </div>
        ) : null}

        {/* Show only on laptop */}
        {!isMobile ? (
          <div className="carasoule-item_2 slide_2 font-outfit">
            {/* Content for laptop */}
            <h1 className=" text-white text-[40px] w-[70%] text-center font-semibold">
              Op 50+ draait het om uw fitheid, blijf sterk en geniet van het
              leven.
            </h1>
          </div>
        ) : null}

        {/* Show only on mobile */}
        {isMobile ? (
          <div className="carasoule-item_2 slide_2 font-outfit">
            {/* Content for laptop */}
            <h1 className=" text-white text-[25px] w-[80%] text-center font-semibold">
              Op 50+ draait het om uw fitheid, blijf sterk en geniet van het
              leven. 
            </h1>
          </div>
        ) : null}
      </Carousel>
    </div>
  );
};

// Custom arrow components
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full"
      onClick={onClick}
    >
      <FaArrowLeft />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full"
      onClick={onClick}
    >
      <FaArrowRight />
    </button>
  );
};

export default LandingCarasoul;
