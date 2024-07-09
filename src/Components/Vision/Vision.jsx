import React from "react";
import "./Vision.css";
import { Link } from "react-router-dom";

const Vision = () => {
  const events = [
    {
      image:
        "https://media.istockphoto.com/id/175139199/photo/family-walking-together-in-park.jpg?s=612x612&w=0&k=20&c=v-EYSNaxgY1slpomD_BaR3o6Z1BtDqnaOPwaH9JDp3o=",
      title: "Ochtendwandeling in het Park", // Dutch for "Morning Walk in the Park"
      date: "15 juni 2024", // Dutch date format
      description:
        "Doe mee aan een verfrissende ochtendwandeling en ontmoet nieuwe vrienden.", // Dutch for description
      link: "/events",
    },
    {
      image:
        "https://media.istockphoto.com/id/1211100005/photo/happy-big-family-having-lunch-at-summer-garden-party.jpg?s=612x612&w=0&k=20&c=n0MI89dTZx1qlWWYVsZGoHAf65rMk8ECgiRkp7SCt7U=",
      title: "Workshop Gezonde Kookkunst", // Dutch for "Healthy Cooking Workshop"
      date: "20 juni 2024", // Dutch date format
      description:
        "Leer hoe je gemakkelijk en heerlijke gezonde maaltijden kunt koken.", // Dutch for description
      link: "/events",
    },
    {
      image:
        "https://media.istockphoto.com/id/865129522/photo/active-seniors-having-fun-exercising-together.jpg?s=612x612&w=0&k=20&c=2wvJpVjAol1uufCpzZbwf0DZ2vLgifrqdT046i60704=",
      title: "Yoga voor Beginners", // Dutch for "Yoga for Beginners"
      date: "25 juni 2024", // Dutch date format
      description: "Begin je yogareis met deze beginnersvriendelijke les.", // Dutch for description
      link: "/events",
    },
  ];
  return (
    <div className=" py-5 flex flex-col font-outfit">
      <div className="flex flex-col justify-center items-center gap-9 font-outfit">
        <p className="text-[40px]">Onze Visie</p>
        <p className="text-[23px] font-medium px-6 lg:px-10 text-center text-[#6a6c6f]">
        Gezondfit50plus bevordert fysiek, mentaal en sociaal welzijn, zodat iedereen na hun 50ste kan genieten van een gezond en actief leven
        </p>
      </div>

      {/* community */}
      <div className=" flex flex-col justify-center items-center gap-7 py-9">
        <p className=" text-[40px] text-center">
          Word Lid van Onze Gemeenschap
        </p>
        <div className=" flex flex-col lg:flex-row bg-[#3c608a]">
          <div className=" flex flex-col gap-6 justify-center items-center py-6 lg:py-0">
            <p className=" text-white text-center lg:w-[80%] w-[100%]  text-[28px]">
              Sluit je aan bij ons netwerk om je ervaringen te delen, anderen te
              inspireren en onderwerpen te bespreken die je bezighouden in de
              chatroom.
            </p>
            <Link
              to="/community"
              className=" bg-white rounded-lg px-3 py-2 text-[20px] hover:no-underline text-black"
            >
              doe nu mee
            </Link>
          </div>
          <div className=" lg:w-[80%] w-[100]">
            <img
              src="https://media.istockphoto.com/id/1145051049/photo/woman-speaking-at-group-neighborhood-meeting-in-community-center.jpg?s=612x612&w=0&k=20&c=hnV5Q7qHaGLsOpD7zU4YfggJGaDv4_wx2-354s0Trjc="
              alt=""
            />
          </div>
        </div>
      </div>
      {/* buy products */}
      <div className=" flex flex-col justify-center items-center">
        <section class="health-products-a">
          <h1>Bezoek Onze Webwinkel voor Activiteiten en Welzijn</h1>
          <p>
          Ontdek producten die uw actieve levensstijl ondersteunen, van wandelschoenen tot fitnessapparatuur. Bied ook uw eigen activiteiten- en welzijnsproducten aan en draag bij aan de gezondheid en het welzijn van anderen. Onze webwinkel biedt een platform waar leden hun producten kunnen aanbieden om een gezondere levensstijl te bevorderen.
          </p>
          <div class="product-grid-a">
            <div class="product-card-a">
              <img
                src="https://images.pexels.com/photos/7432/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                alt="Product 1"
              />
              <h2>Schoeisel</h2>
              <p>
                {" "}
                Juiste schoenen ontworpen voor wandelen of sporten om
                ondersteuning en comfort te bieden.
              </p>
            </div>
            <div class="product-card-a">
              <img
                src="https://images.pexels.com/photos/4498483/pexels-photo-4498483.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Product 2"
              />
              <h2>Activiteit Trackers</h2>
              <p>
                Fitness horloges of stappentellers om stappen, afstand en andere
                metingen bij te houden.
              </p>
            </div>
            <div class="product-card-a">
              <img
                src="https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Product 3"
              />
              <h2>Hydratatie Uitrusting</h2>
              <p>
                Waterflessen of hydratatierugzakken om gehydrateerd te blijven
                tijdens het sporten.
              </p>
            </div>
            <div class="product-card-a">
              <img
                src="https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Product 4"
              />
              <h2>Boeken</h2>
              <p>Boeken en gidsen over wandelen</p>
            </div>
          </div>
          <a class="cta-button hover:no-underline" href="/products">
            Nu Winkelen
          </a>
        </section>
      </div>
        {/* services */}
        <div className="services-section">
        <div className=" flex flex-col justify-center items-center  w-[90%] mx-auto health-products-a">
          <h1>Onze Diensten</h1>
          <p>
            Maak gebruik van deze mogelijkheid om iets voor een ander te
            betekenen. Help bij tuinieren, klusjes in en om het huis, of zelfs
            boodschappen. Wilt u commerciële diensten aanbieden? Neem dan contact
            met ons op via het contactformulier.
          </p>
          <p>Doe mee en maak een verschil!</p>
        </div>
      </div>
      {/* events */}
      <div className="events-section">
        <div className="hero-section">
          <h1>Aankomende Evenementen voor Actieve Volwassenen van 50+</h1>
          <p>
            Neem deel aan onze gemeenschapsevenementen en blijf actief, gezond
            en verbonden.
          </p>
        </div>

        <div className="event-cards-1">
          {events.map((event, index) => (
            <div className="event-card-1" key={index}>
              <img src={event.image} alt={event.title} />
              <div className="event-info-1">
                <h2>{event.title}</h2>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <Link to={event.link} className="event-link-1">
                  Meer Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vision;
