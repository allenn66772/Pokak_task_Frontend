import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI, registerUserAPI } from "./service/allAPI";

function Auth({register}) {
  const [userDetails,setuserDetails]=useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);
  const navigate=useNavigate()

  //register Function
  const Handleregister = async () => {
  const { username, email, password } = userDetails;

  if (!username || !email || !password) {
    alert("Fill all fields completely");
    return;
  }

  try {
    const result = await registerUserAPI(userDetails);
    alert("Register successful");

    setuserDetails({
      username: "",
      email: "",
      password: ""
    });
    navigate("/")

  } catch (error) {
    // ✅ Handle 409 / 402 / 500 here
    alert(error.response?.data || "Something went wrong");
  }
};

//Login 
const handleLogin=async ()=>{
  const {email,password}=userDetails


  if(!email || !password){
    alert("Fill the form Completely")
  }else{
    const result=await loginUserAPI(userDetails)
    console.log(result);
    if(result.status==200){
      sessionStorage.setItem(
        "existingUser",JSON.stringify(result.data.existingUser)
      )
      sessionStorage.setItem("token",result.data.token)
      alert("Login Successful")
      navigate("/add-task")
      setuserDetails({
        email:"",
        password:""
      })
    }else if(result.status==404){
      alert(result.status.data)
      setuserDetails({
        email:"",
        password:""
        
      })
    }else{
      alert("Somrthing went Wrong")
      setuserDetails({
        email:"",
        password:""
      })
    }
    
  }
}



  
    
  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="w-full h-16 px-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-between">
          {/* Left */}
          <h1 className="text-2xl font-bold">Listify</h1>

          {/* Right */}
          <div className="flex gap-8">
            <h1 className="cursor-pointer hover:text-blue-600">About us</h1>
            <h1 className="cursor-pointer hover:text-blue-600">Contact us</h1>
          </div>
        </div>
        {/* Wave background */}
        <div
          className="w-full h-screen"
          style={{
            backgroundImage:
              'url("https://t3.ftcdn.net/jpg/07/73/06/18/360_F_773061859_EG5adTb4yMnNFuNX6ugju3OsH9d3mY2Q.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
       {/* regsiter/login card */}
       <div className="relative z-10 flex justify-center items-center mt-10 px-4">
        <div className="bg-gray-100 rounded-2xl shadow-xl w-200  px-10 py-12 opacity-100">
            {register ?  
            <h2 className="text-center text-blue-600 font-semibold text-lg">Register</h2>
            :<h2 className="text-center text-blue-600 font-semibold text-lg">Login</h2>}
            {register ?<p className="text-center text-gray-400 text-sm mt-2">Welcome! Sign in using your social account or email to continue us</p>
            :<p className="text-center text-gray-400 text-sm mt-2">Welcome back! Sign in using your social account or email to continue us</p>
            }

            {/* icons */}

            <div className="flex justify-center items-center gap-6 mt-6">
  
  <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
      alt="facebook"
      className="w-6 h-6 object-contain"
    />
  </div>

  <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitAfXpzxbOu0uJFMSdIeJsnZNxp_F56C7Eg&s"
      alt="google"
      className="w-6 h-6 object-contain"
    />
  </div>

  <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
    <img
      src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/apple-icon.png"
      alt="apple"
      className="w-6 h-6 object-contain"
    />
  </div>

</div>
{/* input fields */}
{register && <div className="mt-8 flex flex-col items-center space-y-6">
    <input value={userDetails?.username} onChange={(e)=>{setuserDetails({...userDetails,username:e.target.value})}} placeholder="Name" type="text" className="w-80 border-b outline-none py-2 text-sm placeholder-gray-400" />
</div>}
<div className="mt-8 flex flex-col items-center space-y-6">
    <input value={userDetails?.email} onChange={(e)=>{setuserDetails({...userDetails,email:e.target.value})}} placeholder="Email" type="email" className="w-80 border-b outline-none py-2 text-sm placeholder-gray-400" />
</div>
<div className="mt-8 flex flex-col items-center space-y-6">
    <input value={userDetails?.password} onChange={(e)=>{setuserDetails({...userDetails,password:e.target.value})}} placeholder="Password" type="text" className="w-80 border-b outline-none py-2 text-sm placeholder-gray-400" />
</div>

{register ?<div className="mt-3 flex flex-col items-center space-y-6">
    <p>Already have an account <Link to={"/"} className="text-blue-500">Login</Link></p>
</div>:
<div className="mt-3 flex flex-col items-center space-y-6">
    <p>New user ? <Link to={"/register"} className="text-blue-500">Register</Link></p>
</div>}
<div className="mt-8 flex flex-col items-center space-y-6">
 {register ?  <button onClick={Handleregister} className="bg-gray-50 w-40 h-9 rounded-xl shadow-md shadow-gray-300">
  Register
</button>:
<button onClick={handleLogin} className="bg-gray-50 w-40 h-9 rounded-xl shadow-md shadow-gray-300">
  login
</button>}


</div>


        </div>
       </div>

        </div>
      </div>
    </>
  );
}

export default Auth;
