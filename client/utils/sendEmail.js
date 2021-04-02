const sgMail = require('@sendgrid/mail');

const SendGridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SendGridAPIKey);

export const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aayushmum@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Swush ${name}. We hope you have a great experience!`
    }).then(() => {}, error => {
        console.log(error);
    });
}