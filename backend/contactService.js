import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config();
export const contactService={
    async sendEmail(email,theme,content){
        const emailToken=Math.floor(100000 + Math.random() * 900000).toString();
        console.log(email)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: "preslav.geshev@gmail.com", // Your email
            from: "preslav.geshev@gmail.com",
            replyTo: email, // Verified sender in SendGrid
            subject: theme.concat(` TICKET NUMBER: ${emailToken}`) || 'No Subject',
            text: content,
            html: `<p>${content}</p>`,
        };
    
        try {
            await sgMail.send(msg);
            console.log("email sent")
        } catch (error) {
            console.error('Error sending email:', error);
        }
    
    }
}