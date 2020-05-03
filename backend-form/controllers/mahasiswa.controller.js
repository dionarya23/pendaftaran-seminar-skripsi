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
      const mahasiswa = await MahasiswaModel.create(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "sucess",
        data: mahasiswa,
      });
    } catch (err) {
      console.log("error at createMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async deleteMahasiswa() {
    try {
      await MahasiswaModel.findByIdAndDelete({ _id: req.body._id });

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess delete",
      });
    } catch (err) {
      console.log("error at deleteMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async updateMahasiswa(req, res) {
    try {
      const conditions = {
        _id: req.params._id,
      };
      const updatedData = await MahasiswaModel.update(conditions, req.body);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: updatedData,
      });
    } catch (err) {
      console.log("error at updateMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async getOneMahasiswa(req, res) {
    try {
      const mahasiswa = await MahasiswaModel.findById(req.params._id);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: mahasiswa,
      });
    } catch (err) {
      console.log("error at getOneMahasiswa MahasiswaController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
