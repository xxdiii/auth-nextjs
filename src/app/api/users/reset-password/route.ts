import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

connect()

export async function POST(request: NextRequest){
    try {
        const body = await request.json()
        const {token,newPassword} = body

        if (newPassword==""){
            return NextResponse.json({error: "No password "},{status: 500})
        }
        if (token==""){
            return NextResponse.json({error: "No token "},{status: 500})
        }

    
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()},})
    
        if (!user){
            return NextResponse.json({error: "Invalid Token"},{status: 500})
        }
    
        
    
        const salt = await bcrypt.genSalt(10)
        const  hashedPassword = await bcrypt.hash(newPassword,salt)
    
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()
    
        return NextResponse.json({
            message:"Password has been reset successfully",
            success: true
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}