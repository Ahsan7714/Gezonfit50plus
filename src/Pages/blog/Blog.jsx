import React, { useState, useEffect } from "react";
import "./blog.css";
import { Link } from "react-router-dom";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../store/reducers/postReducers";
import { toast } from "react-hot-toast";
import {
  loadUser
} from "../../store/reducers/userReducers";

const Blog = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Utility function to truncate text
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div>
      {screenSize > 786 ? <Cards /> : <></>}
      <div className="blog-container">
        <div className="community-head flex gap-2 py-5 text-3xl lg:text-5xl font-semibold justify-center">
          <h1 className="lg:text-6xl text-2xl">Onze Blogs</h1>
        </div>
        {
          user ? ( <Link to="/my-blog" className="my-blogs-button-container flex justify-end">
            <button className="my-blogs-button">Mijn blog</button>
          </Link>):(
            <div className="my-blogs-button-container flex justify-end">
              <button onClick={()=>toast.error("Please SignUp or login to post events")} className="my-blogs-button">Mijn blog</button>

            </div>
          )
        }
       
        <div className="cards">
          {blogs && blogs.map((item, index) => (
            <div key={index} className="blog-card lg:h-[100vh] flex flex-col">
              <div className=" flex-1 h-[50%]">

              <img src={item.image} alt={item.title} />
              </div>
              <div className="content flex-1 h-[50%] bg-white flex flex-col">
                <h2 className=" font-semibold text-[30px] mb-3">{item.title}</h2>
                <div className="lg:h-[52%] h-[19vh] overflow-hidden">
                <p dangerouslySetInnerHTML={{ __html: item.content }} className="  overflow-hidden" />
                </div>
                <div className=" h-[20%]">
                <Link to={`/blog/${item._id}`} className="button">
                  Lees meer
                </Link>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
