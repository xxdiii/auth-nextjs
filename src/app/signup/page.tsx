"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const onSignUp = async ()=>{

    }

    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="text-3xl">Signup</h1>
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
                onClick={onSignUp}
                className="p-2 border border-gray-300 rounded-lg mt-6 mb-3 focus: outline-none focus:border-gray-600 cursor-pointer">
                Signup
            </button>
            <Link rel="stylesheet" href="/login" >Visit Login page</Link>
        </div>
    )
}