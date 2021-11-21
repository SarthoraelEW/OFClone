const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anthony.dufay1@gmail.com',
    pass: 'Viserys_11112011'
  }
});

var mailOptions = {
  from: 'anthony.dufay1@gmail.com',
  to: 'sarthoraelew@gmail.com',
  subject: 'This is a test',
  text: 'It works ?'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Email sent: ' + info.response);
  }
});