const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

let options = {
  auth: {
    api_user: "ion1999",
    api_key: "D10n4ryap",
  },
};

var client = nodemailer.createTransport(sgTransport(options));

module.exports = client;
