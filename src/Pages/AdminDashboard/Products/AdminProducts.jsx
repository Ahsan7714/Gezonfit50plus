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
  getActiveProducts,
  getPendingProducts,
  deletePendingProduct,
  deleteActiveProduct,
  updatePendingProduct,
  clearState,
} from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import toast from "react-hot-toast";



const AdminProducts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newModalOpen , setNewModalOpen ] = useState(false);
  const [selectPartner,setSelectPartner]=useState(null);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    isPendingProductDeleted,
    isPendingProductUpdated,
    isActiveProductDeleted,
    pendingproducts,
    activeproducts
  } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getActiveProducts());
    dispatch(getPendingProducts());
  }, [dispatch]);
  useEffect(() => {
    if(isPendingProductDeleted){
      dispatch(getActiveProducts());
    dispatch(getPendingProducts());
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
      toast.success("Product Deleted Successfully");
    }
    if(isPendingProductUpdated){
      dispatch(getActiveProducts());
    dispatch(getPendingProducts());
      dispatch(clearState());
      // close the modal
      setModalIsOpen(false);
      toast.success("Product Approved Successfully");
    }
    if(isActiveProductDeleted){
      dispatch(getActiveProducts());
    dispatch(getPendingProducts());
      dispatch(clearState());
      // close the modal
      setNewModalOpen(false);
      toast.success("Product Deleted Successfully");
    }
  }, [isPendingProductDeleted,isPendingProductUpdated,isActiveProductDeleted]);

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
    dispatch(deletePendingProduct(id));
  };

  const handleDeleteActive = (id) => {
    dispatch(deleteActiveProduct(id));
  };
  const handleApprove = (id) => {
    dispatch(updatePendingProduct(id));
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
                Product Requests
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
                            Product Name
                          </TableCell>
                          <TableCell
                            align="center"
                            className="text-white text-[475px] !important"
                          >
                            Price
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
                        {pendingproducts && pendingproducts.length>0 ? (pendingproducts.map((user, index) => (
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
                              {user.productName}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="text-[475px] !important"
                            >
                              <div className=" flex gap-1 justify-center items-center">
                            {user.price}
                            <p>€</p>
                            </div>
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
                        ) )) : ( <TableRow> <TableCell colSpan={5} align="center">No Pending Products</TableCell> </TableRow>
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
                      {selectedEvent.productName}
                    </h2>
                    <button onClick={closeModal}>
                      <IoMdClose className="text-[30px]" />
                    </button>
                  </div>
                  <img
                    src={selectedEvent.image}
                    className="w-[150px] h-[100px] object-cover rounded-md mt-4"
                  />
                  <p className="mt-4 flex">
                    <strong className=" pr-2">Price:</strong> {selectedEvent.price} <p>€</p>
                  </p>
                  <p>
                    <strong>Product Details:</strong> {selectedEvent.productDetails}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedEvent.contact}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedEvent.address}
                  </p>
                  <p className="max-h-[70px] overflow-y-auto">
                    <strong>Description:</strong> {selectedEvent.description}
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
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
                Active Products
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
                            Product Name
                          </TableCell>
                          <TableCell
                            align="center"
                            className="text-white text-[475px] !important"
                          >
                            Price
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
                        {activeproducts && activeproducts.length>0 ?  (activeproducts.map((user, index) => (
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
                             {user.productName}
                           </TableCell>
                           <TableCell
                             align="center"
                             className="text-[475px] !important"
                           >
                            <div className=" flex gap-1 justify-center items-center">
                            {user.price}
                            <p>€</p>
                            </div>
                             
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
                        )))  : ( <TableRow> <TableCell colSpan={5} align="center">No Active Products</TableCell> </TableRow> )}
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
                      {selectPartner.productName}
                    </h2>
                    <button onClick={closePartnerModal}>
                      <IoMdClose className="text-[30px]" />
                    </button>
                  </div>
                  <img
                    src={selectPartner.image}
                    className="w-[150px] h-[100px] object-cover rounded-md mt-4"
                  />
                  <p className="mt-4 flex">
                    <strong className=" pr-2">Price:</strong> {selectPartner.price}<p>€</p>
                  </p>
                  <p>
                    <strong>Product Details:</strong> {selectPartner.productDetails}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectPartner.contact}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectPartner.address}
                  </p>
                  <p className="max-h-[70px] overflow-y-auto">
                    <strong>Description:</strong> {selectPartner.description}
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
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

export default AdminProducts;
