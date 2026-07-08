"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Loginpage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const [loading,setLoading] = React.useState(false)
    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user);
            console.log("Login successful",response.data);
            toast.success("Login success")
            router.push("/profile")
            

        } catch (error:any ){
            console.log("Login Failed");
            toast.error(error.message)          
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="text-3xl">{loading ? "Processing" : "LogIn"}</h1>
            
            <label htmlFor="email">Email</label>
            <input 
                className="bg-white text-black p-2 rounded-xl border border-gray-300"
                type="email" 
                id="email"
                value={user.email}
                placeholder="email"
                onChange={(e)=> setUser({...user,email: e.target.value})}
            />
            <label htmlFor="password">Password</label>
            <input 
                className="bg-white text-black p-2 rounded-xl border border-gray-300 mb-4"
                type="password" 
                id="password"
                value={user.password}
                placeholder="password"
                onChange={(e)=> setUser({...user,password: e.target.value})}
            />
            <Link rel="stylesheet" href="/forgot-password" >Forgot password?</Link>
            <button
                onClick={onLogin}
                disabled={loading}
                className="p-2 border border-gray-300 rounded-lg mt-6 mb-3 focus: outline-none focus:border-gray-600 cursor-pointer">
                {loading ? "Logging In" : "LogIn"}
            </button>
            <Link rel="stylesheet" href="/signup" >Visit Signup page</Link>
        </div>
    )
}