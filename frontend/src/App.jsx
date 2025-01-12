import { Navigate,Route,Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import {useState} from "react";
import Refresh from "./Refresh";

function App()
{
  const[authenticated,setAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
    return authenticated?element:<Navigate to="/login"/>;
  }
  return (
    <>
    <Refresh setAuthenticated={setAuthenticated}/>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
    </Routes>
    </>
  );
}

export default App;