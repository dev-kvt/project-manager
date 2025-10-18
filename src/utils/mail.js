import Mailgen from "mailgen" ;
import nodemailer from "nodemailer" ;
const sendEmail = async (options ) =>{
    const mailgenerator = new  Mailgen({
        theme : "default" ,
        product : {
            name : "task manager" ,
            link : "http://localhost:3000/"
        }   
    })
const emailTextual =  mailgenerator.generatePlaintext(options.mailgencontent) ;
const emailHtml =  mailgenerator.generate(options.mailgencontent) ;


const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
    }


});

const mail ={
    from : "mailtaskmanager.com" ,
    to : options.email ,
    subject : options.subject ,
    text : emailTextual ,
    html : emailHtml            

}

try {
    await transporter.sendMail(mail) ;
    console.log("email sent successfully") ;
}
catch (error) {
    console.log("email not sent , check the mail trap") ;
    console.log(error) ;    

}
}
export default sendEmail ;

const emailVerificationMailgenContent = (username , verificationUrl) => {
    return {
        body: {
            name : username,
            intro : "Welcome to Our Service! We're excited to have you on board.",
            action : {
                instructions : "To get started, please verify your email address by clicking the button below:",
                button : {
                    color : "#22BC66",
                    text : "Verify Your Email",
                    link : verificationUrl
                }
            },
            outro : "If you did not create an account, no further action is required on your part."
        }
    }
}

const forgetPasswordMailgenContent = (username , resetUrl) => {
    return {
        body: {
            name : username,
            intro : "You have requested to reset your password.",
            action : {
                instructions : "To reset your password, please click the button below:",
                button : {
                    color : "#2fdc77ff",
                    text : "Reset Your Password",
                    link : resetUrl
                }
            },
            outro : "If you did not request a password reset, please ignore this email."
        }
    }
}

export { emailVerificationMailgenContent , forgetPasswordMailgenContent };

