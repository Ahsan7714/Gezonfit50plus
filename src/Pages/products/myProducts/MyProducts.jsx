import React, { useState, useEffect } from "react";
import "./myProducts.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  postProduct,
  clearState,
  getPendingProducts,
  deleteProduct,
  getActiveProducts,
  deleteActiveProduct,
} from "../../../store/reducers/postReducers";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdPending, MdVerified } from "react-icons/md";
import Loader from "../../../Components/Loader";
const MyProducts = () => {
  const dispatch = useDispatch();
  const {
    isProductPosted,
    pendingproducts,
    loading,
    error,
    isProductDeleted,
    activeproducts,
    isActiveProductDeleted,
  } = useSelector((state) => state.post);

  const [productData, setProductData] = useState({
    productName: "",
    productDetails: "",
    contact: "",
    address: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  // const [imagePreviews, setImagePreviews] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    dispatch(getPendingProducts());
    dispatch(getActiveProducts());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productDetails") {
      const words = value.split(" ");
      if (words.length > 20) {
        toast.error("Productdetails mogen niet langer zijn dan 20 woorden");
        return;
      }
    }
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductData({ ...productData, image: reader.result });
        // setImagePreviews([...imagePreviews, reader.result]);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isProductPosted) {
      setProductData({
        productName: "",
        productDetails: "",
        contact: "",
        address: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
      // setImagePreviews([]);
      toast.success("Product geplaatst");
      dispatch(getPendingProducts());
      dispatch(clearState());
      // close modal
      setShowModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isProductPosted]);

  useEffect(() => {
    if (isProductDeleted ) {
      dispatch(getPendingProducts());
      dispatch(getActiveProducts());
      toast.success("Product verwijderd");
      
      dispatch(clearState());
    }
    if(isActiveProductDeleted){
      toast.success("Product verwijderd");
      dispatch(getPendingProducts());
      dispatch(getActiveProducts());
      dispatch(clearState());
    }

  }, [isProductDeleted,isActiveProductDeleted,dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postProduct(productData));
  };

  const handleDelete = (id, status) => {
    if (status === "active") {
      dispatch(deleteActiveProduct(id));
    } else if (status === "pending") {
      dispatch(deleteProduct(id));
    } else {
      console.log("Unknown product status:", status);
    }
  };

  const combineProducts = [...pendingproducts, ...activeproducts];

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
    <div className="myProducts-container">
      <div className="myProducts-header">
        <h1>Mijn Producten</h1>
        <button
          onClick={openModal}
          className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] px-3 py-2 text-white rounded-md"
        >
          Product maken
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="create-product-sec">
            <div className="modal-header flex justify-between items-center">
              <h2 className="text-2xl font-bold mx-auto">Product aanmelden</h2>
              <button
                className="font-bold text-3xl mr-3 mt-0"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                <div className="form-group">
                  <label>Product Naam</label>
                  <input
                    type="text"
                    name="productName"
                    value={productData.productName}
                    onChange={handleChange}
                    placeholder="Voer productnaam in"
                    required
                  />
                </div>
                <div className="form-group ">
                  <label>Product cateory</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    required
                    className="p-[8px]"
                  >
                    <option value="">Selecteer Categorie</option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Schoenen">Schoenen</option>
                    <option value="Kleding">Kleding</option>
                    <option value="Elektronica">Elektronica</option>
                  </select>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                <div className="form-group">
                  <label>Product Prijs</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Voer productprijs in"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Woonplaats</label>
                  <input
                    type="text"
                    name="address"
                    value={productData.address}
                    onChange={handleChange}
                    placeholder="voer uw Woonplaats in"
                    required
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                <div className="form-group">
                  <label>Telefoonnummer</label>
                  <input
                    type="text"
                    name="contact"
                    value={productData.contact}
                    onChange={handleChange}
                    placeholder="Voer uw Telefoonnummer in"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Product Afbeeldingen</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full justify-between gap-4">
                <div className="form-group">
                  <label>Product Beschrijving</label>
                  <textarea
                    name="productDetails"
                    value={productData.productDetails}
                    onChange={handleChange}
                    placeholder="Servicehoogtepunt invoeren (maximaal 20 woorden)"
                    required
                    className=" border border-[black]"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Productomschrijving</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Voer productbeschrijving in"
                    required
                    className=" border border-[black]"

                  ></textarea>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Lanceer Product
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="my-products-list ">
        {combineProducts && combineProducts.length > 0 ? (
          combineProducts.map((product, index) => (
            <div key={index} className="myproduct-card flex-col ">
              <RiDeleteBin5Fill
                className=" absolute delete-btn text-white bg-red-500 rounded-sm cursor-pointer h-[27px] w-[27px] p-1"
                onClick={() => handleDelete(product._id, product.status)}
              />
              <img
                src={product.image}
                alt={product.name}
                className="myproduct-image "
              />
              <div className="mt-2 p-2 flex flex-row items-center  ">
                <h2 className="text-xl font-bold ">{product.productName}</h2>
                {product.status === "active" ? (
                  <MdVerified className="text-blue-500 ml-2 text-[20px] " />
                ) : (
                  <MdPending className="text-orange-400 ml-2 text-[22px]" />
                )}
              </div>
              <div className="product-body  flex flex-col gap-[5px] p-2">
              <p className="mt-1 ">
                <strong>Prijs:</strong> €{product.price}
              </p>
              <p className="mt-1 ">
                <strong>Product Detail:</strong> {product.productDetails}
              </p>

              <p className="mt-1 ">
                <strong>Contact:</strong> {product.contact}
              </p>
              <p className="mt-1 ">
                <strong>Adres:</strong> {""}    {product.address}
              </p>
              <p className="mt-1 ">
                <strong>Productomschrijving:</strong> {""}
                {expandedDescriptions[index]
                  ? product.description
                  : truncateText(product.description, 15)}
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
          <p>Geen product gevonden</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;