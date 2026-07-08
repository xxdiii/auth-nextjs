import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        console.log("Current time:", new Date());
        console.log("Current timestamp:", Date.now());


        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: { $gt: Date.now() },})

        console.log("User:", user);
        console.log("Expiry:", user?.verifyTokenExpiry);

        if(!user){
            return NextResponse.json({error: "Invalid Token"},{status: 500})
        }

        console.log(user);  
        
        user.isverified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified Successfully",
            success: true
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}