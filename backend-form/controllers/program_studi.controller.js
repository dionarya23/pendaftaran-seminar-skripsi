const ProgramStudi = require("../models/program_studi.model");
const HttpStatus = require("http-status-codes");

module.exports = {
  async getProgramStudi(req, res) {
    try {
      const program_studi = await ProgramStudi.find({});
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

        const programStudi = await ProgramStudi.create(req.body)
        res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message: 'sucess',
            data: programStudi
        })

    } catch (err) {
      console.log("error at createProgramStudi ProgramStudiController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
