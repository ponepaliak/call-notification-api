const config = require('dotenv').config().parsed;
const nodemailer = require('nodemailer');

module.exports = function (toEmail, subject, message) {
    const transporter = nodemailer.createTransport({
        host: config.SMTP_SERVER,
        port: config.SMPT_PORT,
        secure: true,
        auth: {
            user: config.EMAIL,
            pass: config.EMAIL_PASSWORD
        }
    });

    transporter.verify((err, success) => {
        if (err) console.error(err);
        console.log('Your config is correct');
    });

    const mailOptions = {
        from: config.EMAIL,
        to: toEmail,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
