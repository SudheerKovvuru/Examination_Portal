import { ToastContainer } from "react-toastify";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleSuccess } from "../utils";
import ExamTabs from "./ExamTabs";
import { useFetchInfo } from "../hooks/FecthInfo";

function Home()
{
    const [username,setUsername]=useState("");
    const navigate=useNavigate();
    const fetchInfo=useFetchInfo();
    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
        fetchInfo();
    },[]);
    const handlelogout=()=>{
        localStorage.removeItem("jwttoken");
        localStorage.removeItem("username");
        handleSuccess("Logged out successfully");
        setTimeout(()=>{
            navigate("/login");
        },2000);
    }
    return(
        <>
            <nav>
                <img src="./src/assets/aitam.png" alt="aitam logo" />
                <div className="userinfo">
                    <h3>{username}</h3>
                    <div className="dropdown">
                        <img src="./src/assets/user1.jpg" alt="user profile" className="user-img" />
                        <ul className="dropdown-menu">
                            <li>Profile</li>
                            <li>Settings</li>
                            <li onClick={handlelogout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ExamTabs/>
        <ToastContainer/>
        </>
);
}
export default Home;