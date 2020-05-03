const MahasiswaModel = require("../models/mahasiswa.model");
const HttpStatus = require("http-status-codes");

module.exports = {
  async getAllMahasiswa(req, res) {
    try {
      const mahasiswa = await MahasiswaModel.find({});
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: mahasiswa,
      });
    } catch (err) {
      console.log("error at getAllMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async createMahasiswa(req, res) {
    try {

        const mahasiswa = await MahasiswaModel.create(req.body)
        res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message: 'sucess',
            data: mahasiswa
        })

    } catch (err) {
      console.log("error at createMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
