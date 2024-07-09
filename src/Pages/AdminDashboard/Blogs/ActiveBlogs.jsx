import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IoMdClose } from "react-icons/io";

const ActiveBlogs = ({ handleDeleteActive, activeblogs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <section>
      <div className="w-[77%] mx-auto pt-7  ">
        <h1 className="text-[30px] font-semibold py-3">Active Blogs</h1>
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
                  {activeblogs && activeblogs.length > 0 ? (
                    activeblogs.map((user, index) => (
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
                          {user.user?.name ? user.user.name : "Admin"}
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
                        No Active Blogs Found
                      </TableCell>{" "}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
            <div className=" flex justify-end items-center">
              
              <button onClick={closeModal}>
                <IoMdClose className=" text-[30px]" />
              </button>
            </div>
            <img
              src={selectedEvent.image}
              className="w-[150px] h-[100px] object-cover rounded-md mt-4"
            />
            <h2 className="text-[24px] font-semibold my-2">
                {selectedEvent.title}
              </h2>
             <p className="max-h-[140px] overflow-y-auto ">
              <strong>Description:</strong>  <div dangerouslySetInnerHTML={{ __html: selectedEvent.content }} ></div>
            </p>
            <div>
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md mt-4"
                onClick={() => handleDeleteActive(selectedEvent._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActiveBlogs;
