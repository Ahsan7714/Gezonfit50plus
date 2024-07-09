import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IoMdClose } from "react-icons/io";
import {
  getActivePartners,
  getPendingPartners,
  updatePendingPartner,
  deletePendingPartner,
  deleteActivePartner,
  clearState,
} from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import toast from "react-hot-toast";


const Partners = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newModalOpen , setNewModalOpen ] = useState(false);
  const [selectPartner,setSelectPartner]=useState(null);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    isPendingPartnerDeleted,
    isPendingPartnerUpdated,
    isActivePartnerDeleted,
    pendingpartners,
    activepartners
  } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getActivePartners());
    dispatch(getPendingPartners());
  }, [dispatch]);
  useEffect(() => {
    if(isPendingPartnerDeleted){
      dispatch(getPendingPartners());
      dispatch(getActivePartners());
      toast.success(" Deleted Successfully");
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
    }
   
    if(isActivePartnerDeleted){
      dispatch(getActivePartners());
      dispatch(getPendingPartners());
      toast.success(" Deleted Successfully");
      dispatch(clearState());
      // close the modal
      setNewModalOpen(false);
    }
  }, [isPendingPartnerDeleted,dispatch,isActivePartnerDeleted]);
  useEffect(() => {
    if(isPendingPartnerUpdated){
      dispatch(getPendingPartners());
      dispatch(getActivePartners());
      toast.success(" Approved Successfully");
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
    }
  }, [isPendingPartnerUpdated,dispatch]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const openPartnerModal = (event) => {
    setSelectPartner(event);
    setNewModalOpen(true);
  }; 
  const closePartnerModal = () => {
    setNewModalOpen(false);
    setSelectPartner(null);
  };

  const handleDeletePending = (id) => {
    dispatch(deletePendingPartner(id));
  };

  const handleDeleteActive = (id) => {
    dispatch(deleteActivePartner(id));
  };
  const handleApprove = (id) => {
    dispatch(updatePendingPartner(id));
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

  if(loading){
    return <Loader/>
  }


  return (
    <div>
      <AdminSidebar />
      <div className="ml-[23%] w-[77%]">
        <div className="flex flex-col justify-center">
            {/*  */}
          <section>
            <div className="w-[77%] mx-auto pt-7">
              <h1 className="text-[30px] font-semibold py-3">
                Partner Requests
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
                             Name
                          </TableCell>
                          <TableCell
                            align="center"
                            className="text-white text-[475px] !important"
                          >
                            Category
                          </TableCell>
                          <TableCell
                            align="center"
                            className="text-white text-[475px] !important"
                          >
                            City
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
                        {pendingpartners && pendingpartners.length>0 ?  (pendingpartners.map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] capitalize !important"
                            >
                              {user.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.category}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.city}
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
                        ) )) : ( <TableRow> <TableCell colSpan={5} align="center">No Pending Requests</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>

            {modalIsOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-[24px] font-semibold">
                    <span  className=" capitalize text-[#13b6ef]"> {selectedEvent.category}</span>  with  <span className=" capitalize text-[#13b6ef]">{selectedEvent.name}</span>
                    </h2>
                    <button onClick={closeModal}>
                      <IoMdClose className="text-[30px]" />
                    </button>
                  </div>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.category}
                    className="w-[150px] h-[100px] object-cover rounded-md mt-4"
                  />
                  <p className="mt-4">
                    <strong>Age:</strong> {selectedEvent.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedEvent.gender}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedEvent.city}
                  </p>
                  <p>
                    <strong>Route:</strong> {selectedEvent.route}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {formatTime(selectedEvent.startTime)}
                  </p>
                  <p>
                    <strong>End Time:</strong> {formatTime(selectedEvent.endTime)}
                  </p>
                  <p className="h-[70px] overflow-y-auto">
                    <strong>Description:</strong> {selectedEvent.description}
                  </p>
                  <div className="flex justify-end gap-4 mt-4" onClick={closeModal}>
                  <button className="bg-red-600 text-white px-3 py-2 rounded-md " onClick={()=>handleDeletePending(selectedEvent._id)}>
                      Delete
                    </button>
                    <button className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white px-3 py-2 rounded-md " onClick={()=>handleApprove(selectedEvent._id)}>
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
          {/*  */}
          <section>
            <div className="w-[77%] mx-auto pt-7">
              <h1 className="text-[30px] font-semibold py-3">
                Active Posts
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
                            Category
                          </TableCell>
                          <TableCell
                            align="center"
                            className="text-white text-[475px] !important"
                          >
                            City
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
                      {activepartners && activepartners.length>0 ? (activepartners.map((user, index) => (
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
                              {user.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.category}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              {user.city}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              <div>
                              <button
                                 className="bg-green-600 text-white px-2 py-1 rounded-md"
                                 onClick={() => openPartnerModal(user)}
                               >
                                 view
                               </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) ) ) : <TableRow> <TableCell colSpan={5} align="center">No Active Posts</TableCell></TableRow> }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>

            {newModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-[24px] font-semibold">
                    <span  className=" capitalize text-[#13b6ef]"> {selectPartner.category}</span>  with  <span className=" capitalize text-[#13b6ef]">{selectPartner.name}</span>
                    </h2>
                    <button onClick={closePartnerModal}>
                      <IoMdClose className="text-[30px]" />
                    </button>
                  </div>
                  <img
                    src={selectPartner.image}
                    alt={selectPartner.category}
                    className="w-[150px] h-[100px] object-cover rounded-md mt-4"
                  />
                  <p className="mt-4">
                    <strong>Age:</strong> {selectPartner.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectPartner.gender}
                  </p>
                  <p>
                    <strong>City:</strong> {selectPartner.city}
                  </p>
                  <p>
                    <strong>Route:</strong> {selectPartner.route}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {formatTime(selectPartner.startTime)}
                  </p>
                  <p>
                    <strong>End Time:</strong> {formatTime(selectPartner.endTime)}
                  </p>
                  <p className="h-[70px] overflow-y-auto">
                    <strong>Description:</strong> {selectPartner.description}
                  </p>
                  <div className="flex justify-end gap-4 mt-4" onClick={closeModal}>
                    <button className="bg-red-600 text-white px-3 py-2 rounded-md " onClick={()=>handleDeleteActive(selectPartner._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Partners;
