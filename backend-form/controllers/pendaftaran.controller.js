const PendaftaranModel = require("../models/pendaftaran.mode");
const HttpStatus = require("http-status-codes");
const mailer = require("../config/nodemailer");
const path = require("path");
const moment = require("moment");
const ejs = require("ejs");
const pdf = require("html-pdf");
module.exports = {
  async getPendaftaran(req, res) {
    try {
      const pendaftaran = await PendaftaranModel.find({
        status: "Tidak Setujui",
      }).populate([
        "dosen_pembimbing_1",
        "mahasiswa",
        "dosen_pembimbing_2",
        "dosen_penguji_1",
        "dosen_penguji_2",
        "program_studi",
      ]);
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

  async createPendaftaran(req, res) {
    try {
      // if (req.files.subtitle.type === "application/pdf") {
      // const resultCloudinary = await cloudinary.v2.uploader.upload(
      //   req.files.subtitle.path,
      //   { resource_type: "auto" }
      // );
      // req.body.syarat = resultCloudinary.secure_url;
      // console.log("req : ", mongoose.Types.ObjectId.isValid(req.body.dosen_pembimbing_1))
      const pendaftaran = await PendaftaranModel.create(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "sucess",
        data: pendaftaran,
      });
      // } else {
      //   res.status(HttpStatus.OK).json({
      //     status: HttpStatus.OK,
      //     message: "file must pdf",
      //   });
      // }
    } catch (err) {
      console.log("error at createPendaftaran pendaftaran controller : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async updatePendaftaran(req, res) {
    try {
      const newPendaftaran = await PendaftaranModel.updateOne(
        { _id: req.params._id },
        req.body
      );
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: newPendaftaran,
      });
    } catch (err) {
      console.log("error at updatePendaftaran pendaftaran controller : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async sendEmail(req, res) {
    try {
      moment.locale("id");
      const kegiatan = await PendaftaranModel.findById(
        req.params._id
      ).populate([
        "dosen_pembimbing_1",
        "mahasiswa",
        "dosen_pembimbing_2",
        "dosen_penguji_1",
        "dosen_penguji_2",
        "program_studi",
      ]);

      let to = [];

      kegiatan.email_dosen_pembimbing.map((e) => {
        to.push(e);
      });
      kegiatan.email_dosen_penguji.map((e) => {
        to.push(e);
      });
      const templatedata = await ejs.renderFile(
        path.join(__dirname, "../views/", "laporan.ejs"),
        {
          mahasiswa: {
            nama_mahasiswa: kegiatan.mahasiswa.nama_mahasiswa,
            nim: kegiatan.mahasiswa.nim,
            nama_program_studi: kegiatan.program_studi.nama_program_studi,
            judul: kegiatan.judul,
            tgl_pelaksanaan: moment(
              kegiatan.tgl_pelaksanaan,
              "YYYY-MM-DD"
            ).format("DD-MM-YYYY"),
            hari: moment(kegiatan.tgl_pelaksanaan, "YYYY-MM-DD").format("dddd"),
            jam: kegiatan.jam,
          },
        }
      );

      pdf
        .create(templatedata, { height: "10in", width: "6.8in" })
        .toBuffer(async function (err, buffer) {
          const email = {
            to: kegiatan.email_mahasiswa,
            cc: to,
            from: "pendaftaran@trunojoyo.ac.id",
            subject: `File Pelaskanaan ${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}`,
            text: `File Pelaskanaan ${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}`,
            attachments: [
              {
                filename: `${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}.pdf`,
                content: buffer,
              },
            ],
          };

          await PendaftaranModel.updateOne(
            { _id: req.params._id },
            { status: "Setujui" }
          );

          await mailer.sendMail(email);
          res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "success",
          });
        });
    } catch (err) {
      console.log("error at sendEmail pendaftaranController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
