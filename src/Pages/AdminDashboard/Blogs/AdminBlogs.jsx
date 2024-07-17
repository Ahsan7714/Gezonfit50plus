import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  clearState,
  getPendingBlogs,
  getActiveBlogs,
  postBlog,
  deleteActiveBlog,
  deletePendingBlog,
  updatePendingBlog,
} from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import toast from "react-hot-toast";
import BlogCustomModal from "./BlogCustomModal";
import ActiveBlogs from "./ActiveBlogs";

const AdminBlogs = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    pendingblogs,
    activeblogs,
    isPendingBlogDeleted,
    isActiveBlogDeleted,
    isPendingBlogUpdated,
    isBlogPosted,
  } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    image: null,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(getPendingBlogs());
    dispatch(getActiveBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (isPendingBlogDeleted) {
      toast.success("Blog Deleted Successfully");
      dispatch(getPendingBlogs());
      dispatch(getActiveBlogs());
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
    }
    if (isActiveBlogDeleted) {
      toast.success("Blog Deleted Successfully");
      dispatch(getPendingBlogs());
      dispatch(getActiveBlogs());
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
    }
    if (isPendingBlogUpdated) {
      toast.success("Blog Updated Successfully");
      dispatch(getPendingBlogs());
      dispatch(getActiveBlogs());
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
    }
  }, [
    isPendingBlogDeleted,
    isActiveBlogDeleted,
    isPendingBlogUpdated,
    ,
    dispatch,
  ]);
  useEffect(() => {
    if (isBlogPosted) {
      toast.success("Blog Posted Successfully");
      dispatch(getActiveBlogs());
      dispatch(getPendingBlogs());
      dispatch(clearState());
      setFormData({
        title: "",
        content: "",
        image: null,
      });
      setImagePreview(null);
    }
  }, [isBlogPosted, dispatch]);

  const handleDeletePending = (id) => {
    dispatch(deletePendingBlog(id));
  };

  const handleDeleteActive = (id) => {
    dispatch(deleteActiveBlog(id));
  };
  const handleApprove = (id) => {
    dispatch(updatePendingBlog(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postBlog(formData));
  };

  if (loading) {
    return <Loader />;
  }

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const handleEditorChange = (content) => {
    if (content.length > 20000) {
      toast.error("Content cannot exceed 20000 characters");
    } else {
      setFormData({ ...formData, content });
    }
  };

  return (
    <div className=" font-outfit">
      <AdminSidebar />
      <div className="ml-[24%] w-[76%]">
        <form action="" onSubmit={handleSubmit}>
          <div className=" bg-[#f8fafb] rounded-md shadow-lg w-[70%] mx-auto my-5 flex flex-col p-4">
            <h1 className=" text-[30px] font-semibold pb-7 text-center">
              Post Blog
            </h1>
            <div className=" flex justify-between items-center gap-8">
              <div className=" flex flex-col w-full">
                <label htmlFor="" className=" text-[23px]">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  onChange={handleChange}
                  className=" outline-none border-2 border-[#00000083] bg-transparent w-full"
                />
              </div>
            </div>
            <div className=" flex justify-between items-center">
              <div className=" flex flex-col w-full">
                <label htmlFor="" className=" text-[23px]">
                  Content
                </label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleEditorChange}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["clean"],
                      ["link", "image", "video"],
                    ],
                  }}
                />

                {/* className=" outline-none border-2 border-[#0000002d] bg-transparent w-full p-2 h-[200px]" */}
              </div>
            </div>
            <div className="flex justify-between items-center w-full pt-4">
              <div className=" flex gap-4">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-[#000000e4] text-[18px] ">
                    Event Picture
                  </label>
                  <div className="relative">
                    <h1 className="cursor-pointer bg-white shadow-xl h-[42px] text-center px-3 pt-2 rounded-lg text-[15px]">
                      Choose Picture
                    </h1>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute left-0 top-0 outline-none border text-[1px] text-white rounded-md w-[150px] py-3 placeholder:text-[#000000b8] opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Series Preview"
                    className=" w-[150px] h-[100px] object-cover rounded-md"
                  />
                )}
              </div>

              <button className=" bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white px-3 py-2 rounded-md h-[40px]">
                Post Blog
              </button>
            </div>
          </div>
        </form>
        {/*event request */}
        <section>
          <div className="w-[77%] mx-auto">
            <h1 className="text-[30px] font-semibold py-3">
              Blogs Post Request
            </h1>
            <div>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className="text-white text-[475px] !important"
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[475px] !important"
                        >
                          User Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[475px] !important"
                        >
                          Title
                        </TableCell>

                        <TableCell
                          align="center"
                          className="text-white text-[475px] !important"
                        >
                          View
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingblogs && pendingblogs.length > 0 ? (
                        pendingblogs.map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.user?.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.title}
                            </TableCell>

                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              <div>
                                <button
                                  className="bg-green-600 text-white px-2 py-1 rounded-md"
                                  onClick={() => openModal(user)}
                                >
                                  view
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          {" "}
                          <TableCell
                            colSpan={5}
                            align="center"
                            className="text-[475px] !important"
                          >
                            No Blogs Post Request Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
          <BlogCustomModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            event={selectedEvent}
            handleDeletePending={handleDeletePending}
            handleApprove={handleApprove}
            formatTime={formatTime}
          />
        </section>
        {/* Active Events */}
        <ActiveBlogs
          handleDeleteActive={handleDeleteActive}
          activeblogs={activeblogs}
        />
        {/*  */}
      </div>
    </div>
  );
};

export default AdminBlogs;
