const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { signUpErrors, signInErrors } = require('../utils/error.utils');
const { randomToken } = require('../utils/randomCode.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

const sendVerificationEmail = (email, token, id) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anthony.dufay1@gmail.com',
      pass: 'Viserys_11112011'
    }
  });
  
  var mailOptions = {
    from: 'anthony.dufay1@gmail.com',
    to: email,
    subject: 'Verification email',
    text: `Click on this link to verify your email: localhost:5000/api/user/verify-email/${id}/${token}`
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

exports.signUp = async (req, res) => {
  const {username, email, password} = req.body;
  const token = randomToken(10);

  try {
    const user = await UserModel.create({username, email, password, verifyEmail: {isVerified: false, token: token}});
    sendVerificationEmail(email, token, user._id);
    res.status(200).json({user: user._id});
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
      const user = await UserModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge});
      res.status(200).json({ user: user._id });
  } catch(err) {
      const errors = signInErrors(err);
      res.status(200).json({ errors });
  }
};

exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};