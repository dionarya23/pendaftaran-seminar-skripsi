const HttpStatus = require("http-status-codes");
const ProgramStudiModel = require("../models/program_studi.model");
const DosenModel = require("../models/dosen.model");
module.exports = {
  async getDosen(req, res) {
    try {
      // const ProgramStudi = await ProgramStudiModel.findById(
      //   req.params.id_jurusan
      // ).populated("dosen");

      const dosen = await DosenModel.find({
        program_studi: req.params.id_jurusan,
      }).populate("program_studi");

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: dosen,
      });
    } catch (err) {
      console.log("Eror at get Dosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async getAllDosen(req, res) {
    try {
      const dosens = await DosenModel.find({}).populate("program_studi");

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Sucess",
        data: dosens,
      });
    } catch (err) {
      console.log("Eror at getAllDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async createDosen(req, res) {
    try {
      const dosen = await DosenModel.create(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "create dosen sucess",
        data: dosen,
      });
    } catch (err) {
      console.log("Eror at createDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async deleteDosen() {
    try {
      await DosenModel.findByIdAndDelete({ _id: req.body._id });

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess delete",
      });
    } catch (err) {
      console.log("error at deleteDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async updateDosen(req, res) {
    try {
      const conditions = {
        _id: req.params._id,
      };
      const updatedData = await DosenModel.update(conditions, req.body);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: updatedData,
      });
    } catch (err) {
      console.log("error at updateDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async getOneDosen(req, res) {
    try {
      const Dosen = await DosenModel.findById(req.params._id);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: Dosen,
      });
    } catch (err) {
      console.log("error at getOneDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
