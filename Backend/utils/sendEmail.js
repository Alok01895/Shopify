const nodemailer= require("nodemailer")

const sendEmail= async(options)=>{

    const messaging= nodemailer.createTransport({
        hsot:process.env.SMPT_HOST, 
        post:process.env.SMPT_PORT, 
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD, 
        }
    })

    const mail={   
        from:process.env.SMPT_MAIL,
        to:options.email, 
        subject:options.subject,
        text:options.message
    }
    console.log(messaging)
    await messaging.sendMail(mail)
}

module.exports= sendEmail