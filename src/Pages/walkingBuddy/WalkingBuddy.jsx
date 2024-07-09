import React from "react";
import NavbarA from "../../Components/NavbarA/NavbarA";
import { Link } from "react-router-dom";
import Cards from "../../Components/Cards/Cards";

const WalkingBuddy = () => {
  return (
    <div>
      {" "}
      <NavbarA />
      <Cards />
    </div>
  );
};

export default WalkingBuddy;
