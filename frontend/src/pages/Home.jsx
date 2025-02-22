import { ToastContainer } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import ExamTabs from "./ExamTabs";
import { useFetchInfo } from "../hooks/FecthInfo";

function Home() {
    const [username, setUsername] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const fetchInfo = useFetchInfo();
    const dropdownRef = useRef(null);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        fetchInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwttoken");
        localStorage.removeItem("username");
        handleSuccess("Logged out successfully");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav>
                <img src="./src/assets/aitam.png" alt="aitam logo" />
                <div className="userinfo">
                    <h3>{username}</h3>
                    <div className="dropdown" ref={dropdownRef}>
                        <img
                            src="./src/assets/user1.jpg"
                            alt="user profile"
                            className="user-img"
                            onClick={toggleDropdown}
                            style={{ cursor: "pointer" }}
                        />
                        {dropdownOpen && (
                            <ul className="dropdown-menu">
                                <li>Profile</li>
                                <li>Settings</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <ExamTabs />
            <ToastContainer />
        </>
    );
}

export default Home;
