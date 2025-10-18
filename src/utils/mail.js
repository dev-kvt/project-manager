import Mailgen from "mailgen" ;


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

export { emailVerificationMailgenContent , forgetPasswordMailgenContent } ;