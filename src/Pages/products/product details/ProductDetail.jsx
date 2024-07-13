import React from "react";
import { useNavigate } from "react-router-dom";
import "./productDetail.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductDetail = () => {
  const navigate = useNavigate();

  const productDetail = {
    name: "Waterfles",
    price: 80,
    description:
      "Blijf gehydrateerd in stijl met onze premium waterfles, gemaakt van BPA-vrij, voedselveilig roestvrij staal. De dubbelwandige vacuümisolatie houdt drankjes tot 24 uur koud en tot 12 uur warm. Het lekvrije ontwerp zorgt voor geen morsen, waardoor het perfect is voor sporttassen, rugzakken of handtassen. Milieuvriendelijk en herbruikbaar, deze fles helpt plastic afval te verminderen. Het slanke, ergonomische ontwerp ligt comfortabel in de hand en past in de meeste bekerhouders. Duurzaam en veilig, onze waterfles is de ideale metgezel voor al je hydratatiebehoeften.",
    images: [
      "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/122803/pexels-photo-122803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    contact: "+31685621360",
    condition: "9",
  };

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
    <div className="productDetail-container capitalize font-outfit">
      <button onClick={() => navigate("/products")} className="back-button">
        Terug
      </button>
      <div className="productDetail-content">
        <div className="productDetail-carousel">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
             ssr={true} 
             infinite={true}
            //  autoPlay={this.props.deviceType !== "mobile" ? true : false}
             autoPlaySpeed={1000}
             keyBoardControl={true}
             customTransition="all .5"
             transitionDuration={500}
             containerClass="carousel-container"
             removeArrowOnDeviceType={["tablet", "mobile"]}
            //  deviceType={this.props.deviceType}
             dotListClass="custom-dot-list-style"
             itemClass="carousel-item-padding-40-px"
          >
            {productDetail.images.map((image, index) => (
              <div key={index} className="carousel-image-wrapper">
                <img
                  src={image}
                  // alt={productDetail.name}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="productDetail-info">
          <h1>{productDetail.name}</h1>
          <p>
            <strong>Prijs:</strong> €{productDetail.price}
          </p>
          <p>
            <strong>Conditie:</strong> {productDetail.condition}{" "}
            <strong>/10</strong>{" "}
          </p>
          <p>
            <strong>Contact:</strong> {productDetail.contact}
          </p>
          <p>
            <strong>Beschrijving:</strong> {productDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
