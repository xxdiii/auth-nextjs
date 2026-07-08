"use client";
import { useState, useEffect } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword(){
    const router = useRouter();
    const [token,setToken]=useState("")
    const [newPassword,setNewPassword] = useState("")
    const [loading,setLoading] = useState(false)

    const resetPass = async ()=>{
        try {
            setLoading(true)
            await axios.post("/api/users/reset-password",{token,newPassword})
            toast.success("Password reset success")
            router.push("/login")
        } catch (error:any) {   
            console.log("Password reset failed");
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "")
    },[])

    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="text-2xl font-bold m-0 mb-7">Reset Password</h1>
            <label htmlFor="password">Enter New Password</label><br />
            <input 
            type="password" 
            onChange={(e)=>setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="password"
            className="bg-white border-gray-700 rounded-l rounded-r text-gray-700 p-2"/>
            <button 
            onClick={resetPass}
            disabled={loading}
            className="mt-6 p-2 bg-blue-700 rounded-xl pr-6 pl-6 pt-3 pb-3 cursor-pointer">{loading ? "Resetting ..." : "Reset Password"}</button>
        </div>
    )
}