import { Link,useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {useState} from 'react';
import { handleError,handleSuccess } from "../utils";
import '../Card.css';
function Card(props)
{
    let link="/login";
    let url="http://localhost:8000/auth/signup";
    let navigate=useNavigate();
    if(props.title==="Login")
    {
        link="/signup";
        url="http://localhost:8000/auth/login";
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
                        navigate("/home");
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
    return(
        <main>
        <div className="card">
            <form onSubmit={handleonSubmit}>
                <h1>{props.title}</h1>
                <div className="namediv">
                    <i className="fa-solid fa-user"></i>
                    <input onChange={handleChange} type="text" name="username" placeholder="Enter your username"/>
                </div>
                <div className="passdiv">
                    <i className="fa-solid fa-lock"></i>
                    <input onChange={handleChange} type="password" name="password" placeholder="Enter you password"/>
                    <i className="fa-solid fa-eye"></i>
                </div>
                <p>{props.desc}<Link to={link}>{props.subtitle}</Link></p>
                <button>{props.title}</button>
            </form>
        </div>
        <ToastContainer className="toastcontainer"/>
    </main>
    
    );
}
export default Card;