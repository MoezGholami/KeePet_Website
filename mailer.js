require('dotenv').config();
const appRoot       = require('app-root-path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');

var html_content = '';
fs.readFile(appRoot + '/views/welcome_letter.ejs', 'utf-8', function(err, data) {
    // now data is a string
    html_content = data;
});

const mail = function(user) {
    var name = user.firstName;
    var target_email = user.email;
    var host = 'localhost:3000';
	nodemailer.createTestAccount((err, account) => {

	    // create reusable transporter object using the default SMTP transport
	    let transporter = nodemailer.createTransport({
	        host: 'smtp.gmail.com',
	        port: 465,
	        secure: true, // true for 465, false for other ports
	        auth: {
	            user: process.env.EMAIL_ADDRESS, // generated ethereal user
	            pass: process.env.EMAIL_PASSWORD  // generated ethereal password
	        }
	    });

	    // setup email data with unicode symbols
	    let mailOptions = {
	        from: '"Welcome Letter 👻" <mingzongzz@gmail.com>', // sender address
	        to: target_email, // list of receivers
	        subject: 'Welcome ✔', // Subject line
	        text: 'Hello world', // plain text body
	        html: ejs.render(html_content, {name: name, host: host}) // html body
	    };

	    // send mail with defined transport object
	    return new Promise((resolve, reject) => {
		    transporter.sendMail(mailOptions, (error, info) => {
		        if (error) {
		            reject(error);
		        } else {
			        console.log('Message sent: %s', info.messageId);
			        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		 			resolve(0);
		        }
		    });
	    });
	});

}

module.exports = mail;
