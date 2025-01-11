import { ToastContainer } from "react-toastify";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleSuccess } from "../utils";
function Home()
{
    const [username,setUsername]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
    },[]);
    const handlelogout=()=>{
        localStorage.removeItem("jwttoken");
        localStorage.removeItem("username");
        handleSuccess("Logged out successfully");
        setTimeout(()=>{
            navigate("/login");
        });
    }
    return(
        <>
        <h1>Thank You for logging {username}</h1>
        <button onClick={handlelogout}>logout</button>
        <ToastContainer/>
        </>
);
}
export default Home;