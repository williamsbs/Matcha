let nodemailer = require ('nodemailer');

function sendMail(email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'Matcha42matcha42matcha@gmail.com',
            pass: 'password123456!'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOption = {
        form: "matcha",
        to: email,
        subject: 'helloe',
        text: `Please click on this link to activate your account "http://localhost:8080/login?token=${token}"`
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('envoyer');
        console.log(info);
    });
}
module.exports = sendMail;