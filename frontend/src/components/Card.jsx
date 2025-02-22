import { Link,useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {useEffect, useState} from 'react';
import { handleError,handleSuccess } from "../utils";
import '../styles/Card.css';

function Card(props)
{
    const PORT=import.meta.env.VITE_PORT;
    let link="/login";
    let url=`${PORT}auth/signup`;
    let navigate=useNavigate();
    if(props.title==="Login")
    {
        link="/signup";
        url=`${PORT}auth/login`;
    }
    const [info,setInfo]=useState(
        {
            username:"",
            password:""
        }
    );
    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copyinfo={...info};
        copyinfo[name]=value;
        setInfo(copyinfo);
    }
    const handleonSubmit= async (e)=>{
        e.preventDefault();
        const {username,password}=info;
        if(!username || !password)
        {
            return handleError("Please fill all the fields");
        }
        try{
            const response= await fetch(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(info)
            });
            const result=await response.json();
            const {message,success,jwttoken,username,error}=result;
            if(success)
            {
                handleSuccess(message);
                if(jwttoken && username)
                {
                    localStorage.setItem("jwttoken",jwttoken);
                    localStorage.setItem("username",username);
                }
                setTimeout(
                    ()=>{
                        if(url===`${PORT}auth/login`)
                        {
                            navigate("/home");
                        }
                        else{
                            navigate("/login");
                        }
                    },2000
                );
            }
            else if(error)
            {
                handleError(error?.details[0].message);
            }
            else if(!success)
            {
                handleError(message);
            }
            else
            {
                handleError(message);
        }
    }
        catch(err)
        {
            handleError(err);
        };
    }
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible);
    };
    return(
        <>
        <nav>
        <img src="./src/assets/aitam.png" alt=""/>
      </nav>
        <main>
       <div className="card">
      <form onSubmit={handleonSubmit}>
        <h1>{props.title}</h1>
        <div className="namediv">
          <i className="fa-solid fa-user"></i>
          <input onChange={handleChange} type="text" name="username" placeholder="Enter your username" autoComplete="off"/>
        </div>
        <div className="passdiv">
          <i className="fa-solid fa-lock"></i>
          <input onChange={handleChange} type={passwordVisible ? "text" : "password"} name="password" placeholder="Enter your password"/>
          <i className={`fa-solid ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}onClick={handleTogglePassword} id="eye"></i>
        </div>
        <p>{props.desc}<Link to={link}>{props.subtitle}</Link></p>
        <button>{props.title}</button>
      </form>
    </div>
        <ToastContainer className="toastcontainer"/>
    </main>
    </>
    );
}
export default Card;