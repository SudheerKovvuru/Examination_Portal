import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Refresh({setAuthenticated})
{
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("jwttoken"))
        {
            setAuthenticated(true);
            if(location.pathname==="/login" || location.pathname==="/signup" || location.pathname==="/")
            {
                navigate("/home",{replace:true});
            }
        }
    },[location,navigate,setAuthenticated]);
    return(null);
}

export default Refresh;