const ProgramStudi = require("../models/program_studi.model");
const HttpStatus = require("http-status-codes");

module.exports = {
  async getProgramStudi(req, res) {
    try {
      const program_studi = await ProgramStudi.find().populate("dosens");
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: program_studi,
      });
    } catch (err) {
      console.log("error at getProgramStudi ProgramStudi Controller : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async createProgramStudi(req, res) {
    try {
      const programStudi = await ProgramStudi.create(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "sucess",
        data: programStudi,
      });
    } catch (err) {
      console.log("error at createProgramStudi ProgramStudiController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async deleteProgramStudi() {
    try {
      await ProgramStudi.findByIdAndDelete({ _id: req.body._id });

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess delete",
      });
    } catch (err) {
      console.log("error at deleteProgramStudi ProgramStudiController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async updateProgramStudi(req, res) {
    try {
      const conditions = {
        _id: req.params._id,
      };
      const updatedData = await ProgramStudi.update(conditions, req.body);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: updatedData,
      });
    } catch (err) {
      console.log("error at updateProgramStudi ProgramStudiController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async getOneProgramStudi(req, res) {
    try {
      const programStudi = await ProgramStudi.findById(req.params._id);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: programStudi,
      });
    } catch (err) {
      console.log("error at getOneProgramStudi ProgramStudiController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
