const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

let options = {
  auth: {
    api_user: process.env.APIUSER_NODEMAILER,
    api_key: process.env.APIKEY_NODEMAILER,
  },
};

var client = nodemailer.createTransport(sgTransport(options));

module.exports = client;
