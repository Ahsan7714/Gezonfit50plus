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
import { getNewsletters , deleteNewsletter,clearState} from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import toast from 'react-hot-toast';


const Newsletter = () => {
    const dispatch = useDispatch();
  const {newsletter , loading ,error,isNewsletterDeleted } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(getNewsletters());
    }, [dispatch]);
    const handleDownloadExcel = () => {
        // Create a new workbook and a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetData = newsletter.map(({ id, email }) => ({ id, email }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Newsletter Data");

        // Generate the Excel file and download it
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Newsletters.xlsx');
        // after downloading detele the newsletter
        dispatch(deleteNewsletter());
    };
    useEffect(() => {
        if (isNewsletterDeleted) {
            toast.success("Newsletter Deleted Successfully");
            dispatch(getNewsletters());
            dispatch(getNewsletters())
            dispatch(clearState());
        }
        if (error) {
            toast.error(error);
            dispatch(clearState());
        }
    }, [isNewsletterDeleted, error, dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <AdminSidebar />
            <div className="ml-[24%] w-[76%]  pt-[3%]">
                <div className="w-[50%] mx-auto">
                    <h1 className="text-[30px] font-semibold py-3">NewsLetters</h1>
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
                                                Email Address
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {newsletter && newsletter.length>0 ? (newsletter.map((user, index) => (
                                            <TableRow key={user._id}>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center" className="text-[475px] !important">
                                                    {user.email}
                                                </TableCell>
                                            </TableRow>
                                        ) )) : (<TableRow>
                                            <TableCell colSpan={2} align="center" className="text-[475px] !important">
                                                No Newsletters Found
                                            </TableCell>
                                            </TableRow>)
}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <button 
                            onClick={handleDownloadExcel} 
                            className='bg-[#0f8ceb] px-3 py-2 rounded-md text-white mt-2'
                        >
                            Download Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
