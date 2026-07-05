"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const [loading,setLoading] = React.useState(false)

    const onSignUp = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Successfull",response.data);
            router.push("/login")
            
        } catch (error: any) {
            console.log("Signup failed",error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="text-3xl">{loading ? "processing" : "SignUp"}</h1>
            <label htmlFor="username">Username</label>
            <input 
                className="bg-white text-black p-2 rounded-xl border border-gray-300"
                type="text" 
                id="username"
                value={user.username}
                placeholder="username"
                onChange={(e)=> setUser({...user,username: e.target.value})}
            />
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
                className="bg-white text-black p-2 rounded-xl border border-gray-300"
                type="password" 
                id="password"
                value={user.password}
                placeholder="password"
                onChange={(e)=> setUser({...user,password: e.target.value})}
            />
            <button
                disabled={loading}
                onClick={onSignUp}
                className="p-2 border border-gray-300 rounded-lg mt-6 mb-3 focus: outline-none focus:border-gray-600 cursor-pointer">
                {loading ? "Signing Up..":"Sign Up"}
            </button>
            <Link href="/login" >Visit Login page</Link>
        </div>
    )
}