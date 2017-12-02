require('dotenv').config();
const nodemailer = require('nodemailer');

const mail = function() {
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
	        from: '"Test Email 👻" <mingzongzz@gmail.com>', // sender address
	        to: 'mzong@utexas.edu', // list of receivers
	        subject: 'Hello ✔', // Subject line
	        text: 'Hello world?', // plain text body
	        html: '<b>This is a test?</b>' // html body
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