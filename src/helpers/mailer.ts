import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId, appUrl}: any)=>{
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10)
        const rawDomain = (appUrl ?? process.env.DOMAIN ?? "localhost:3000").replace(/\/$/, "")
        const normalizedAppUrl = /^https?:\/\//i.test(rawDomain) ? rawDomain : `http://${rawDomain}`
        const verifyUrl = new URL("/verifyemail", normalizedAppUrl)
        verifyUrl.searchParams.set("token", hashedToken)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now()+3600000
                }
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now()+3600000
                }
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "067c564f8a13fd",
                pass: "491b5e580a8328"
            }
        });

        const mailOptions = {
            from: "asadithya26@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${verifyUrl.toString()}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;     
    } catch (error:any) {
        throw new Error(error.message)
    }
}
