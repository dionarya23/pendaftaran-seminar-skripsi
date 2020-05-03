const JenisKegiatan = require("../models/jenis_kegiatan.model");
const HttpStatus = require("http-status-codes");

module.exports = {
  async getKegiatan(req, res) {
    try {
      const jenis_kegiatan = await JenisKegiatan.find({});
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: jenis_kegiatan,
      });
    } catch (err) {
      console.log("error at getKegiatan KegiatanController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async createKegiatan(req, res) {
    try {

        const jenis_kegiatan = await JenisKegiatan.create(req.body)
        res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message: 'sucess',
            data: jenis_kegiatan
        })

    } catch (err) {
      console.log("error at createKegiatan KegiatanController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async deleteJenisKegiatan() {
    try {
      await JenisKegiatan.findByIdAndDelete({ _id: req.body._id });

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess delete",
      });
    } catch (err) {
      console.log("error at deleteJenisKegiatan JenisKegiatanController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async updateJenisKegiatan(req, res) {
    try {
      const conditions = {
        _id: req.params._id,
      };
      const updatedData = await JenisKegiatan.update(conditions, req.body);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: updatedData,
      });
    } catch (err) {
      console.log("error at updateJenisKegiatan JenisKegiatanController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async getOneJenisKegiatan(req, res) {
    try {
      const jenis_kegiatan = await JenisKegiatan.findById(req.params._id);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "success",
        data: jenis_kegiatan,
      });
    } catch (err) {
      console.log("error at getOneJenisKegiatan JenisKegiatanController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
