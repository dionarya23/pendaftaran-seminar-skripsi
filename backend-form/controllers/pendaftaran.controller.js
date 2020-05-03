const PendafataranModel = require("../models/pendaftaran.model");
const HttpStatus = require("http-status-codes");
const cloudinary = require('../config/cloudinary')

module.exports = {
  async getPendaftaran(req, res) {
    try {
      const pendaftaran = await PendafataranModel.find({});
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: pendaftaran,
      });
    } catch (err) {
      console.log("error at getPendaftaran Pendaftaran Controller : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  createPendaftaran(req, res) {
    try {

      if (req.files.subtitle.type === "application/pdf") {

        const resultCloudinary = await cloudinary.v2.uploader.upload(req.files.subtitle.path, { resource_type: "auto" })
        req.body.syarat = resultCloudinary.secure_url
        const pendaftaran = await PendafataranModel.create(req.body)
        res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message: 'sucess',
            data: pendaftaran
        })

      } else {

        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: 'file must pdf'
        })

      }

    } catch (err) {
      console.log("error at createPendaftaran pendaftaran controller : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
