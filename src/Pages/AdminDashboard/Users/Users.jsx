import React,{useState,useEffect} from "react";
import { CgProfile } from "react-icons/cg";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import "./Users.css";
import { getUsers,clearState,getTotalPartners,getTotalProducts,getTotalServices } from "../../../store/reducers/adminReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import { GoPeople } from "react-icons/go";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";


const Users = () => {
  const dispatch = useDispatch();
  const { users, loading,totalProducts,totalServices,totalPartners } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTotalPartners());
    dispatch(getTotalProducts());
    dispatch(getTotalServices());
  }, [dispatch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" flex font-outfit">
      <AdminSidebar />
      <div className=" ml-[23%] w-[77%] pt-[3%] ">
        <div className=" flex flex-col">
          <div className="flex w-[90%] mx-auto bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-[20px]  text-white font-semibold justify-between  p-3 rounded-md">
            <h1>Dashboard</h1>
            <h1>Admin</h1>
          </div>
          {/*  */}
          <div className="flex justify-around w-full px-7  my-4">
          <div className="flex gap-10 p-9 h-[160px] w-[300px] items-center rounded-lg  bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Active Partners</h1>
                <p className="text-[30px] font-bold">
                  {totalPartners && totalPartners}
                </p>
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <CgProfile className="text-[30px] font-light text-[#ff3b5c]" />
              </div>
            </div>
            <div className="flex gap-10 p-9 h-[160px] w-[300px] items-center rounded-lg  bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Active Products</h1>
                <p className="text-[30px] font-bold">
                  {totalProducts && totalProducts}
                </p>
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <RiShoppingCartLine className="text-[30px] font-light text-[#222286aa]" />
              </div>
            </div>
            <div className="flex gap-10 p-9 h-[160px] w-[300px] items-center rounded-lg  bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Active Services</h1>
                <p className="text-[30px] font-bold">
                  {totalServices && totalServices}
                </p>
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <MdMiscellaneousServices className="text-[30px] font-light text-[green]  shadow-[green]" />
              </div>
            </div>
           
          </div>
          {/*  */}
          <div className=" w-[77%] mx-auto">
            <h1 className=" text-[30px] font-semibold py-3">All Users</h1>
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
                      Email
                    </TableCell>
                    {/* <TableCell
                      align="center"
                      className="text-white text-[475px] !important"
                    >
                      Status
                    </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users &&  users.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell align="center" className="text-[475px] !important">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center" className="text-[475px] !important">
                            {user.name}
                          </TableCell>
                          <TableCell align="center" className="text-[475px] !important">
                            {user.email}
                          </TableCell>
                          {/* <TableCell align="center" className="text-[475px] !important">
                            {user.status}
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Users;
