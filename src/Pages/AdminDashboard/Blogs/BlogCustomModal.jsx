import React from "react";
import { IoMdClose } from "react-icons/io";


const BlogCustomModal = ({ isOpen, onClose, event,handleDeletePending,handleApprove,formatTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
        <div className=" flex justify-end items-center">
          <button onClick={onClose} ><IoMdClose className=' text-[30px]' />
</button>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-[150px] h-[100px] object-cover rounded-md mt-4"
        />
          <h2 className="text-[24px] font-semibold my-2">{event.title}</h2>
          <p className="max-h-[140px] overflow-y-auto ">
          <strong>Description:</strong> {event.content}
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

export default BlogCustomModal;
