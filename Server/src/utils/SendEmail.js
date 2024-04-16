import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Task Manager OTP Verification',
        text: `Dear User,

        Thank you for choosing Task Manager! To complete your account setup, please enter the following One-Time Password (OTP):
        
        **OTP Code:** ${otp}
        
        If you did not request this OTP, please ignore this email.
        
        Happy task managing!
        
        Best regards,
        The Task Manager Team `
    };



    transporter.sendMail(mailOptions);
}

const sendUserRegistrationUser = async (user) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Task Manager Registration',
        text: `Dear ${user.name},

        Thank you for choosing Task Manager! Your account has been created successfully. 
        You can now log in to your account using the following credentials:

        **Name:** ${user.name}
        **Email:** ${user.email}
        **Your Role:** ${user.role}
        **Your Mobile Number:** ${user.mobileNumber}

        If you did not create an account, please ignore this email.
        
        Happy task managing!
        
        Best regards,
        The Task Manager Team `
    };

    transporter.sendMail(mailOptions);


}


export { sendOTP, sendUserRegistrationUser }


