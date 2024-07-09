import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";

const data = [
  {
    image:
      "https://media.istockphoto.com/id/544601144/photo/the-key-to-keeping-fit-is-consistency.jpg?s=612x612&w=0&k=20&c=ocalDQqMN5S5XMnZLRugO6T7ZDz--xG_KnJzCEqlyJw=",
    heading: "Activiteit Partners",
    link: "/walking-buddies",
  },
  {
    image:
      "https://www.sageage.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/01/SAS_63446-December_2023_Blog.jpg.webp",
    heading: "Evenementen",
    link: "/events",
  },
  {
    image:
      "https://images.pexels.com/photos/5632394/pexels-photo-5632394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heading: "Onze Producten",
    link: "/products",
  },
  {
    image:
      "https://images.pexels.com/photos/262028/pexels-photo-262028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heading: "Onze Diensten",
    link: "/services",
  },
  {
    image:
      "https://media.istockphoto.com/id/1145051049/photo/woman-speaking-at-group-neighborhood-meeting-in-community-center.jpg?s=612x612&w=0&k=20&c=hnV5Q7qHaGLsOpD7zU4YfggJGaDv4_wx2-354s0Trjc=",
    heading: "gemeenschap",
    link: "/community",
  },
  {
    image:
      "https://images.pexels.com/photos/2228559/pexels-photo-2228559.jpeg?auto=compress&cs=tinysrgb&w=600",
    heading: "Artikelen en Blogs",
    link: "/blogs",
  },
];
const Cards = () => {
  return (
    <div className="cards">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <Link to={item.link} key={index}>
            <div className="card-content">
              <img src={item.image} alt="image" className=" w-[]" />
              <p>{item.heading}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;