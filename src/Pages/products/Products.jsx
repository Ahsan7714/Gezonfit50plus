import React, { useState, useEffect } from "react";
import "./products.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProducts } from "../../store/reducers/postReducers";
import { loadUser } from "../../store/reducers/userReducers";
import Loader from "../../Components/Loader";
import Cards from "../../Components/Cards/Cards";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const dispatch = useDispatch();
  const { activeproducts ,loading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
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
    dispatch(getProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const openModal = (product, index) => {
    setSelectedProduct({ ...product, index });
    const myModal = new bootstrap.Modal(document.getElementById("productModal"));
    myModal.show();
  };

  const closeModal = () => {
    setSelectedProduct(null);
    const myModal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    myModal.hide();
  };

  const filteredProducts = activeproducts.filter((product) => {
    return (
      (selectedCategory === "Alle" || product.category === selectedCategory) &&
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
  if(loading){
    return <Loader/>
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
      <div className="products-main-container">
        <div className="products-main-container-header">
          <h1>Onze Producten</h1>
          <div className="products-filters">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="Alle">Alle</option>
              <option value="Accessoires">Accessoires</option>
              <option value="Schoenen">Schoenen</option>
              <option value="Kleding">Kleding</option>
              <option value="Elektronica">Elektronica</option>
            </select>
            <input
              type="text"
              placeholder="Zoek op naam"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {user ? ( <Link to="/my-products" className="myproducts-btn">
            Mijn Producten
          </Link>):( <button onClick={()=>toast.error("Meld u aan om deze functie te gebruiken")} className="myproducts-btn">
            Mijn Producten
          </button>)}
         
        </div>
        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="product-card" >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
                <h2 className="flex text-3xl m-2">{product.productName}</h2>
                <p className="flex justify-between m-2">
                  <strong>Prijs</strong> €{product.price}
                </p>
                <p className="flex justify-between m-2"> <strong>Contact</strong> {product.contact}</p>
                <button
                  className="details-btn mr-2"
                  onClick={() => openModal(product, index)}
                >
                  lees details
                </button>
              </div>
            ))
          ) : (
            <p>Geen product gevonden</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="font-bold text-3xl">
                  {selectedProduct.productName}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body flex flex-col w-full">
                <p className="text-xl flex flex-column gap-[5px]">
                  <strong>Prijs</strong> €{selectedProduct.price}
                </p>
                <p className="text-xl flex flex-column gap-[5px]">
                  <strong>Details</strong> {selectedProduct.productDetails}
                </p>
                <p className="text-xl flex flex-column gap-[5px]">
                  <strong>Telefoonnummer</strong> {selectedProduct.contact}
                </p>
                <p className="text-xl flex flex-column gap-[5px]">
                  <strong>Woonplaats</strong> {selectedProduct.address}
                </p>
                <p className="text-xl flex flex-column gap-[5px]">
                  <strong>Beschrijving</strong>{" "}
                  {expandedDescriptions[selectedProduct.index]
                    ? selectedProduct.description || ""
                    : truncateText(selectedProduct.description, 15)}
                  {selectedProduct.description && selectedProduct.description.split(" ").length > 20 && (
                    <span
                      className="toggle-description cursor-pointer text-blue-700"
                      onClick={() => toggleDescription(selectedProduct.index)}
                    >
                      {expandedDescriptions[selectedProduct.index] ? " Lees minder" : " Lees meer"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;