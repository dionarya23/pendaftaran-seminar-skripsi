const HttpStatus = require("http-status-codes");
const ProgramStudiModel = require("../models/program_studi.model");
const DosenModel = require("../models/dosen.model");
module.exports = {
  async getDosen(req, res) {
    try {
      const ProgramStudi = await ProgramStudiModel.findById(
        req.params.id_jurusan
      ).populated("dosen");

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: ProgramStudi.dosen,
      });
    } catch (err) {
      console.log("Eror at get Dosen DosenController : ", err);
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
        data: dosen
      });
    } catch (err) {
      console.log("Eror at createDosen DosenController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
