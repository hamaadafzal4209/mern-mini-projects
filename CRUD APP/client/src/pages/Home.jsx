import { useEffect } from "react"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

function Home() {

  const navigate = useNavigate();

useEffect(() => {
  const res = axios.get("http://localhost:3000/api/user/verify")
  .then(() => {
    if(res.ok){
      toast.success("Authorized!");
    }
  })
  .catch((err) => {
    navigate("/login")
    console.log(err);
    toast.error("UnAuthorized!");
  })
},[])
  
  return (
    <div>
      Home page
    </div>
  )
}

export default Home
