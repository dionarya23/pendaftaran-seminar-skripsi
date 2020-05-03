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

  createKegiatan(req, res) {
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
};
