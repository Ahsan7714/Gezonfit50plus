import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarA from "../../Components/NavbarA/NavbarA";
import Cards from "../../Components/Cards/Cards";
import "./community.css";
import { fetchMessages, sendMessage, fetchCommunityConversation } from "../../store/reducers/chatReducers"; // Adjust import path according to your project structure
import { loadUser } from "../../store/reducers/userReducers";
import { io } from "socket.io-client";
import { socketBaseurl } from "../../store/baseUrl";

function Community() {
  const dispatch = useDispatch();
  const { loading, messages, error, communityConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [messageText, setMessageText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchCommunityConversation());
    dispatch(fetchMessages());

    socket.current = io(socketBaseurl);
    socket.current.emit("addUser", user._id);

    socket.current.on("getCommunityMessage", (message) => {
      dispatch(fetchMessages()); // Refresh messages on new message
    });

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      socket.current.disconnect();
    };
  }, [dispatch, user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      const senderId = user._id;
      dispatch(sendMessage({ senderId, text: messageText })).then(() => {
        socket.current.emit("sendCommunityMessage", { senderId, text: messageText });
      });
      setMessageText('');
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {screenSize > 786 ? (
        <>
          <Cards />
        </>
      ) : null}
      <div className="  font-outfit">
        <div className="community-head flex flex-col justify-center items-center gap-2 py-5 text-[30px]">
          <h1 className="font-semibold">GezondFit50+ Community</h1>
          <p>Doe mee aan het gesprek met andere leden van de gemeenschap.</p>
        </div>
        <div className="flex lg:flex-row flex-col justify-center">
          <div className="bg-slate-100 h-[102vh] w-[100%] px-10">
            <div className="w-full rounded-md">
              <div className="flex w-full h-full relative">
                <div className="w-full">
                  <h1 className="text-center font-semibold text-[30px] py-3">Community Chat</h1>
                  <div className="py-2">
                    <div className="h-[80vh] w-full bg-gray-300 rounded-md py-4 overflow-y-auto">
                      { error ? (
                        <p>Error: {error}</p>
                      ) : (
                        messages.length === 0 ? (
                          <div className="flex justify-center items-center h-full">
                            <span className="text-gray-400">Nog geen berichten</span>
                          </div>
                        ) : (
                          messages.slice().reverse().map((message) =>(
                            <div
                              key={message._id}
                              className={`w-full flex ${
                                message.sender._id === user._id
                                  ? "justify-end"
                                  : "justify-start"
                              } items-center`}
                            >
                              <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                <div
                                  className={`flex items-center gap-4 w-full ${
                                    message.sender._id === user._id
                                      ? "bg-white justify-end"
                                      : "bg-white "
                                  } text-[#808080] py-2 text-center px-7 rounded-full min-w-[294px]  h-fit shadow-lg`}
                                >
                                  <div className="flex flex-col">
                                    <h3
                                      className={`font-semibold text-black ${
                                        message.sender._id === user._id
                                          ? "text-end items-end pr-2"
                                          : "text-start items-start"
                                      }`}
                                    >
                                      {message.sender._id === user._id
                                        ? "You"
                                        : message.sender.name}
                                    </h3>
                                    <span>{message.text}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      )}
                      <div ref={scrollRef}></div>
                    </div>
                  </div>
                  <form className="flex gap-3" onSubmit={handleSendMessage}>
                    <div className="w-full flex">
                      <input
                        className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#878787]"
                        type="text"
                        placeholder="Voer uw bericht in"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                    </div>
                    <button className="shadow-lg text-[15px] bg-cyan-500 hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
                      Verstuur
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
