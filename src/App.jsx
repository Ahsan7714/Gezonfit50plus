import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Pages/Home/Home";
import Blog from "./Pages/blog/Blog";
import Blog1 from "./Pages/blog/blog details pages/blog1/Blog1";
import Community from "./Pages/community/Community";
import Footer from "./Components/Footer/Footer";
import WalkingBuddies from "./Pages/walking buddies/WalkingBuddies";
import Posts from "./Pages/walking buddies/my posts/Posts";
import Events from "./Pages/events/Events";
import NavbarA from "./Components/NavbarA/NavbarA";
import MobileNavbar from "./Components/MobileNavbar/MobileNavbar";
import Cards from "./Components/Cards/Cards";
import Products from "./Pages/products/Products";
import MyProducts from "./Pages/products/myProducts/MyProducts";
import ProductDetail from "./Pages/products/product details/ProductDetail";
import Users from "./Pages/AdminDashboard/Users/Users";
import Newsletter from "./Pages/AdminDashboard/Newsletter/Newsletter";
import AdminEvents from "./Pages/AdminDashboard/AdminEvents/AdminEvents";
import Partners from "./Pages/AdminDashboard/Partners/Partners";
import AdminProducts from "./Pages/AdminDashboard/Products/AdminProducts";
import AdminServices from "./Pages/AdminDashboard/Services/AdminServices";
import MainNewsletter from "./Components/mainNewsLetter/MainNewsletter";
import SignInSignUp from "./Components/SignInSignUp/SignInSignUp";
import Services from "./Pages/services/Services";
import MyServices from "./Pages/services/myServices/MyServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Components/Loader";
import { loadUser } from "./store/reducers/userReducers";
import MyBlog from "./Pages/blog/myBlog/MyBlog";
import AdminBlogs from "./Pages/AdminDashboard/Blogs/AdminBlogs";
import CommunityHome from "./Pages/CommunityHome/CommunityHome";
import Policy from "./Pages/Policy/Policy";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AdminContact from "./Pages/AdminDashboard/ContactUs/AdminContact";

function App() {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowNavbarAndFooter = !location.pathname.includes("/dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAuthPopup = () => {
    setShowAuthPopup(!showAuthPopup);
  };
  const toggleNewsletterPopup = () => {
    setShowNewsletterPopup(!showNewsletterPopup);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    if (user && user.role == "admin") {
      navigate("/dashboard");
    }
    if (loading) {
      return <Loader />;
    }
  }, [user]);

  return (
    <>
      {shouldShowNavbarAndFooter && (
        <>
          {screenSize > 786 ? (
            <NavbarA
              onAuthClick={toggleAuthPopup}
              onNewsletterClick={toggleNewsletterPopup}
            />
          ) : (
            <MobileNavbar />
          )}
        </>
      )}
      <Routes>
        <Route path="/dashboard" element={<Users />} />
        <Route path="/dashboard/news-letters" element={<Newsletter />} />
        <Route path="/dashboard/events" element={<AdminEvents />} />
        <Route path="/dashboard/partners" element={<Partners />} />
        <Route path="/dashboard/products" element={<AdminProducts />} />
        <Route path="/dashboard/services" element={<AdminServices />} />
        <Route path="/dashboard/blogs" element={<AdminBlogs />} />
        <Route path="/dashboard/contact-us" element={<AdminContact />} />
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog1 />} />
        <Route path="/community" element={<CommunityHome />} />
        <Route path="/community-chat" element={<Community />} />
        <Route path="/walking-buddies" element={<WalkingBuddies />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/products" element={<Products />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/product/1" element={<ProductDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/my-blog" element={<MyBlog />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      {shouldShowNavbarAndFooter && <Footer />}

      {showAuthPopup && <SignInSignUp onClose={toggleAuthPopup} />}
      {showNewsletterPopup && (
        <MainNewsletter onClose={toggleNewsletterPopup} />
      )}
    </>
  );
}

export default App;