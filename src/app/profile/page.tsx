"use client";
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = useState("nothing")
    const logout = async()=>{
        try {
            axios.get("/api/users/logout")
            toast.success("LogOut successfull")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me')    
        console.log(res.data)
        setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="font-bold text-4xl mb-3">Profile</h1>
            <h2>{data ==="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <p>Profile Page</p>
            <button
            onClick={logout}
            className="p-2 bg-blue-600 pl-4 pr-4 mt-2 rounded-xl cursor-pointer">
                LogOut
            </button>
            <button
            onClick={getUserDetails}
            className="p-2 bg-green-800 pl-4 pr-4 mt-2 rounded-xl cursor-pointer">
                Get UserID
            </button>
        </div>
    )
}