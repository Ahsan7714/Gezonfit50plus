import React,{useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
// import logo from "../../assets/logo.png";
import { logout , clearState } from "../../store/reducers/adminReducers";
import toast from "react-hot-toast";
import { MdEventNote } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { TiContacts } from "react-icons/ti";
import { useDispatch , useSelector } from "react-redux";
import logo from "../../assets/admin.png";
import './AdminSidebar.css';
import Loader from "../../Components/Loader";


const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedOut , loading ,error } = useSelector((state) => state.admin);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (isLoggedOut) {
      dispatch(clearState());
      navigate("/");
      // toast.success("Logout Successfully");
    }
  }, [isLoggedOut, dispatch, navigate]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  if(loading){
    return <Loader/>
  }
  return (
    <div className="fixed left-0 top-0 bg-[#f8fafb] h-full overflow-y-auto w-[22%] content-scrollbar font-outfit">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" className=" w-[200px]" />
        <h1 className="py-5 font-bold text-[30px] text-black"></h1>
      </div>
      <div className="flex flex-col  px-12 py-10  gap-10">
        <Link
          to="/dashboard"
          className={`
        ${
          location.pathname == "/dashboard"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/dashboard/blogs"
          className={`
        ${
          location.pathname == "/dashboard/blogs"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <ImBlog />
          <p>Blogs</p>
        </Link>
        <Link
          to="/dashboard/events"
          className={`
        ${
          location.pathname == "/dashboard/events"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <MdEventNote />
          <p>Events</p>
        </Link>
        <Link
          to="/dashboard/partners"
          className={`
        ${
          location.pathname == "/dashboard/partners"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <GoPeople />
          <p>Partners</p>
        </Link>
        <Link
          to="/dashboard/products"
          className={`
        ${
          location.pathname == "/dashboard/products"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <RiShoppingCartLine />
          <p>Products</p>
        </Link>
        <Link
          to="/dashboard/services"
          className={`
        ${
          location.pathname == "/dashboard/services"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <MdMiscellaneousServices />
          <p>Services</p>
        </Link>
        <Link
          to="/dashboard/news-letters"
          className={`
        ${
          location.pathname == "/dashboard/news-letters"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <IoNewspaperOutline />
          <p>Newsletters</p>
        </Link>
        <Link
          to="/dashboard/contact-us"
          className={`
        ${
          location.pathname == "/dashboard/contact-us"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <TiContacts />
          <p>Contact Us</p>
        </Link>
        
        
       
        
       
        <Link
          
          className={`
        ${
          location.pathname == "/manage-employees"
            ? "bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        onClick={handleLogout}
        >
          <BiLogOutCircle />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;