import React from "react";
import { IoMdClose } from "react-icons/io";


const CustomModal = ({ isOpen, onClose, event,handleDeletePending,handleApprove,formatTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
        <div className=" flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">{event.title}</h2>
          <button onClick={onClose} ><IoMdClose className=' text-[30px]' />
</button>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-[150px] h-[100px] object-cover rounded-md mt-4"
        />
        <p className="mt-4">
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {formatTime(event.time)}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p className="max-h-[90px] overflow-y-auto">
          <strong>Description:</strong> {event.description}
        </p>
        <div className=" flex justify-end gap-2 mt-4" onClick={onclose}>
          <button className="bg-red-600 text-white px-3 py-2 rounded-md " onClick={()=>handleDeletePending(event._id)} >
            Delete
          </button>
          <button className="bg-gradient-to-r from-[#0f8ceb] to-[#1ad0f1] text-white px-3 py-2 rounded-md " onClick={()=>handleApprove(event._id)}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
