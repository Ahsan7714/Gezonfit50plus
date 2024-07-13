import React, { useState, useEffect } from 'react';
import Cards from "../../Components/Cards/Cards";
import { Link } from "react-router-dom";
import { loadUser } from "../../store/reducers/userReducers";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CommunityHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [ dispatch ]);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const handleResize = () => {
        setScreenSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {screenSize > 786 ? (
                <>
                    <Cards />
                </>
            ) : null}
            <div className=' capitalize font-outfit'> 
                <div className='bg-[#3c608a] text-white text-center p-4 text-[30px]'>
                    <h1>Sluit je aan bij ons netwerk om je ervaringen te delen, anderen te inspireren en onderwerpen te bespreken die je bezighouden in de chatroom.</h1>
                </div>

                {/* Chat Rules Section */}
                <div className="bg-white p-6 m-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-[#3c608a]">Chatroom Regels</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li> <strong>Respecteer elkaar:</strong> Geen beledigingen, pesten of discriminerende opmerkingen.</li>
                        <li><strong>Geen spam:</strong> Vermijd ongevraagde promoties of herhaalde berichten.</li>
                        <li><strong>Blijf on-topic:</strong> Houd gesprekken relevant voor het onderwerp van de groep.</li>
                        <li><strong>Privacy respecteren:</strong> Deel geen persoonlijke informatie van jezelf of anderen zonder toestemming.</li>
                        <li><strong>Constructieve bijdragen:</strong> Lever zinvolle bijdragen.</li>
                        <li><strong>Gebruik fatsoenlijke taal:</strong> Vermijd scheldwoorden en ongepaste taal.</li>
                        <li><strong>Rapporteer problemen:</strong> Meld ongepast gedrag aan de beheerders.</li>
                    </ul>
                    <div className="mt-6 flex justify-center">
                        {user ? (
                        <Link to="/community-chat" className="bg-[#3c608a] text-white py-2 px-6 rounded-full text-lg hover:bg-[#2b4a6d] transition duration-300">Deelnemen</Link>

                        ):(
                        <button onClick={()=>toast.error("Meld u aan om deel te nemen aan de chat")} className="bg-[#3c608a] text-white py-2 px-6 rounded-full text-lg hover:bg-[#2b4a6d] transition duration-300">Join Chat</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommunityHome;
