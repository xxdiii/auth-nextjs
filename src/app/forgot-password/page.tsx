"use client";
import {useState} from "react"
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword(){
    const [email,setEmail] = useState("")
    const [loading, setLoading] = useState(false);

    const onResetPass = async ()=>{
        try {
            setLoading(true)
            await axios.post("/api/users/forgot-password",{email})
            toast.success("Reset email has been send")
        } catch (error:any) {
            console.log("sending email failed");
            toast.error(error.message) 
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="text-2xl font-bold m-0 mb-7">Forgot Password</h1>
            <label htmlFor="email">Enter email</label>
            <input 
            onChange={(e)=>setEmail(e.target.value)}
            value={email} 
            type="email" 
            placeholder="email" 
            className="bg-white border-gray-700 rounded-l rounded-r text-gray-700 p-2" />
            <button  
            onClick={onResetPass} 
            disabled={loading}
            className="mt-6 p-2 bg-blue-700 rounded-xl pr-6 pl-6 pt-3 pb-3 cursor-pointer">
                {loading ? "Sending Email" : "Send Email"}</button>
        </div>
    )
}