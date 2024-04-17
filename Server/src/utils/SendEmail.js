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
        subject: 'Your Task Manager One-Time Password (OTP) for Secure Access',
        text: `Dear User,
        
        We've received a request to securely access your Task Manager account. To ensure the security of your account, please use the One-Time Password (OTP) provided below:
        
        **OTP: ${otp}**
        
        This OTP is valid for 10 minutes and can be used only once. It's an important step to protect your account and personal information.
        
        If you did not request this access, please ignore this email or contact our support team immediately at anujgupta8519@gmail.com. This will help us ensure the security of your account.
        
        Thank you for using Task Manager and for your commitment to keeping your account secure.
        
        Best Regards,  
        Anuj Gupta, Task Manager Admin  
        Task Manager Support Team`
        

    };
       



    transporter.sendMail(mailOptions);
}

const sendUserRegistrationUser = async (user) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Welcome to Task Manager - Account Successfully Created',
        text: `Dear ${user.name},

        Thank you for being added to Task Manager! An account has been created for you by an administrator. . You can now log in to your account using the following credentials:
        
        **Name:** ${user.name}  
        **Email:** ${user.email}  
        **Your Role:** ${user.role}  
        **Your Mobile Number:** ${user.mobileNumber}  
        
        Please use the OTP to set your password and access your account. If you did not request an account, or if this is unexpected, please contact our support team..
        
        We're excited to have you on board and look forward to helping you manage your tasks efficiently. Task Manager is designed to streamline your task management process, making it easier for you to stay organized and productive.
        
        Should you have any questions or need assistance, please feel free to reach out to our support team. We're here to help!
        
        Happy task managing!
        
        Best regards,  
        The Task Manager Team`
    };

    transporter.sendMail(mailOptions);


}

const deleteUserMail = async (user) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Task Manager Account Deletion Confirmation',
        text: `Dear ${user.name},

        We hope this message finds you well. This email is to confirm that your Task Manager account has been successfully deleted by an administrator.    
        If you have any questions about this process or if this action was taken in error and you wish to restore your account, please do not hesitate to contact your
        administrator directly or reach out to our support team at anujgupta8519@gmail.com for assistance.
        We're sorry to see you go and would like to thank you for having been a part of the Task Manager community. Should you decide to return in the future or if
        there's anything we can assist you with, please feel free to contact us.

        Thank you for choosing Task Manager.
        Best regards,
        The Task Manager Team `
    };

    transporter.sendMail(mailOptions);

}


export { sendOTP, sendUserRegistrationUser, deleteUserMail }


