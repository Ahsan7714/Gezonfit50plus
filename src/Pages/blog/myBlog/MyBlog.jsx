import React,{useState,useEffect} from "react";
import "./myBlog.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { postBlog , clearState , getPendingBlogs,getActiveBlogs } from "../../../store/reducers/postReducers";
import { MdVerified } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "../../../Components/Loader";
function MyBlog() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const dispatch = useDispatch();
  const {loading, error, isBlogPosted,pendingblogs,activeblogs} = useSelector((state) => state.post);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(getPendingBlogs());
    dispatch(getActiveBlogs());
  }, [dispatch]);
  useEffect(() => {
    if (isBlogPosted) {
      toast.success("Blog is succesvol geplaatst");
      dispatch(clearState());
      dispatch(getPendingBlogs());
      dispatch(getActiveBlogs());
      setFormData({
        title: "",
        image: "",
        content: "",
      });
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isBlogPosted, error, dispatch]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(postBlog(formData));
  };
  const combineBlogs = [...pendingblogs , ...activeblogs];

if(loading){
  return <Loader/>
}



  return (
    <div className="myBlog-container capitalize font-outfit">
      <div className="myBolg-header">
        <h1>Mijn Blog</h1>
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          type="button"
          className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] px-3 py-2 text-white rounded-md"
        >
          Blog Schrijven
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title text-3xl font-bold"
                id="staticBackdropLabel"
              >
                Blog schrijven
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">
                    Blog Titel
                  </label>
                  <input
                    type="text"
                    className="form-control  focus:outline-none outline-none"
                    id="blogTitle"
                    placeholder="Voer de titel van je blog in"
                    name="title"
                    onChange={handleChange}
                    required
                    style={{ outline: "none" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogImage" className="form-label">
                    Blogafbeelding uploaden
                  </label>
                  <input
                    type="file"
                    className="form-control focus:outline-none"
                    id="blogImage"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogContent" className="form-label">
                    Blog Inhoud
                  </label>
                  <textarea
                    className="form-control focus:outline-none"
                    id="blogContent"
                    rows="5"
                    placeholder="Schrijf hier je bloginhoud"
                    name="content"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    aria-label="Close"
                    data-bs-dismiss="modal"

                  >
                    Uploaden
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <div className="blog-container">
        <div className="cards">
          {combineBlogs && combineBlogs.map((item, index) => (
            <div key={index} className="blog-card">
              <img src={item.image} alt={item.title} />
              <div className="content">
                <div className="flex">
                <h2>{item.title}</h2>
                {item.status === "active" ? (
                    <MdVerified className="text-blue-500 ml-2 text-[20px]" />
                  ) : (
                    <MdPending className="text-orange-400 ml-2 text-[22px]" />
                  )}
                </div>
                <div className=" max-h-[100px] overflow-y-auto">
                <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBlog;