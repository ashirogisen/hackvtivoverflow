const nodemailer = require('nodemailer');

function sendEmailTo(users) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    });

    let mailOptions = {
        from: `"HacktivOverflow" <${process.env.COMPANY_EMAIL}>`,
        to: users,
        subject: `Little views-count question is gonna be deleted`,
        html: `
            <h3>Announcement!</h3>
            <p> We're gonna delete every question which has 5 or less views count.
            </p>

            <h4>Thanks you<h4>
            <h5>From: Admin<h5>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Send Mail Error: ', error);
            console.log('Error Message: ', error.message);
        }

        console.log('Send Email Result: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendEmailTo;