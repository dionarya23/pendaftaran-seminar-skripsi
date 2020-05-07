const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

let options = {
  auth: {
    api_user: process.env.APIUSER,
    api_key: process.env.APIKEY,
  },
};

var client = nodemailer.createTransport(sgTransport(options));

module.exports = client;
