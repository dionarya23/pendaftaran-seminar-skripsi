const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME_CLOUDINARY,
  api_key: process.env.APIKEY_CLOUDINARY,
  api_secret: process.env.APISECRET_CLOUDINARY,
});

module.exports = cloudinary;
