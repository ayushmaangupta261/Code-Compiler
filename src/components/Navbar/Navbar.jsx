import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="bg-black h-[4.5rem] w-full">
            <div className="w-11/12 mx-auto flex justify-between items-center pt-5 text-blue-300">
                {/* Left */}
                <div>
                    <button className="text-4xl font-bold cursor-pointer bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text" onClick={() => navigate("/")}>
                        Code Lab
                    </button>
                </div>

                {/* Right */}
                <div className="w-[30%] flex justify-between">
                    <div className="hover:scale-110 transition-all duration-300">
                        <button className="text-xl cursor-pointer" onClick={() => navigate("/")}>Home</button>
                    </div>
                    <div className="hover:scale-110 transition-all duration-300">
                        <p className="text-xl cursor-pointer">About</p>
                    </div>
                    <div className="hover:scale-110 transition-all duration-300">
                        <button className="text-xl cursor-pointer" onClick={() => navigate("/create-and-join")}>
                            Let's Colab
                        </button>
                    </div>

                    {/* LogIn Button */}
                    <div>
                        <button
                            className="hover:scale-110 transition-all duration-300 text-xl cursor-pointer"
                            onClick={() => dispatch(setModal(true))}
                        >
                            LogIn
                        </button>
                    </div>

                    <div className="hover:scale-110 transition-all duration-300">
                        <p className="text-xl cursor-pointer">Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
