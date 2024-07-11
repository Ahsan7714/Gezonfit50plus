import React,{useState,useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AdminSidebar from '../../../Components/AdminSidebar/AdminSidebar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getContactForms , deleteContactForm,clearState} from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";



const AdminContact = () => {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const {contactforms , loading ,error,isContactFormDeleted } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(getContactForms());
    }, [dispatch]);
    useEffect(() => {
        if (isContactFormDeleted) {
            toast.success(" Deleted Successfully");
            dispatch(getContactForms());
            dispatch(clearState());
            // close the modal
            setModalIsOpen(false);
        }
        if (error) {
            toast.error(error);
            dispatch(clearState());
        }
    }, [isContactFormDeleted, error, dispatch]);

    const openModal = (event) => {
        setSelectedContact(event);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
        setSelectedContact(null);
      };
      const handleDelete = (id) => {
        dispatch(deleteContactForm(id));
      };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <AdminSidebar />
            <div className="ml-[24%] w-[76%]  pt-[3%]">
                <div className="w-[50%] mx-auto">
                    <h1 className="text-[30px] font-semibold py-3">Contact Us Forms</h1>
                    <div>
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className="text-white text-[475px] !important">
                                                S.No
                                            </TableCell>
                                            <TableCell align="center" className="text-white text-[475px] !important">
                                                Name
                                            </TableCell>
                                            <TableCell align="center" className="text-white text-[475px] !important">
                                                Email Address
                                            </TableCell>
                                            <TableCell align="center" className="text-white text-[475px] !important">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contactforms && contactforms.length > 0 ? (contactforms.map((user, index) => (
                                            <TableRow key={user._id}>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    <div><button className=" bg-green-500 text-white px-2 py-1 rounded-md"  onClick={() => openModal(user)}>view</button></div>
                                                </TableCell>
                                            </TableRow>
                                        ) )) : (<TableRow>
                                            <TableCell colSpan={2} align="center" className="text-[475px] text-center !important">
                                                No Data Found
                                            </TableCell>
                                            </TableRow>)
}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                      
                    </div>
                </div>
                {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
            <div className=" flex justify-between items-center">
              <h2 className="text-[24px] font-semibold">
                {selectedContact.name}
              </h2>
              <button onClick={closeModal}>
                <IoMdClose className=" text-[30px]" />
              </button>
            </div>
            <p className="max-h-[90px] overflow-y-auto mt-4">
              <strong>Message:</strong> {selectedContact.message}
            </p>
            <div className=" flex justify-end items-end">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md mt-4"
                onClick={() => handleDelete(selectedContact._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
        </div>
    );
};

export default AdminContact;
