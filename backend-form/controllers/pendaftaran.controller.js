const PendaftaranModel = require("../models/pendaftaran.mode");
const FormUrutanModel = require("../models/urutan.model");
const HttpStatus = require("http-status-codes");
const mailer = require("../config/nodemailer");
const path = require("path");
const moment = require("moment");
const ejs = require("ejs");
const pdf = require("html-pdf");
const { parallel } = require("async");
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
      const pendaftaran = await PendaftaranModel.create(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "sucess",
        data: pendaftaran,
      });
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

      const urutan = await FormUrutanModel.findOne({
        jenis_kegiatan: kegiatan.jenis_kegiatan,
      });
      let to = [];
      const form =
        kegiatan.jenis_kegiatan === "Ujian Pkl"
          ? `PKL`
          : kegiatan.jenis_kegiatan === "Seminar"
          ? `Skripsi`
          : kegiatan.jenis_kegiatan === "Ujian Skripsi"
          ? `SKRIPSI`
          : "";

      const dosen_penguji_1 = {
        nama_dosen: kegiatan.dosen_penguji_1
          ? form === "PKL"
            ? kegiatan.dosen_pembimbing_1.nama_dosen
            : kegiatan.dosen_penguji_1.nama_dosen
          : "-",
        nip: kegiatan.dosen_penguji_1
          ? form === "PKL"
            ? kegiatan.dosen_pembimbing_1.nip
            : kegiatan.dosen_penguji_1.nip
          : "-",
      };

      const dosen_penguji_2 = {
        nama_dosen: kegiatan.dosen_penguji_1
          ? form === "PKL"
            ? kegiatan.dosen_penguji_1.nama_dosen
            : kegiatan.dosen_penguji_2.nama_dosen
          : "-",
        nip: kegiatan.dosen_penguji_1
          ? form === "PKL"
            ? kegiatan.dosen_penguji_1.nip
            : kegiatan.dosen_penguji_2.nip
          : "-",
      };

      const mahasiswa = {
        nama_mahasiswa: kegiatan.mahasiswa.nama_mahasiswa.toUpperCase(),
        nim: kegiatan.mahasiswa.nim,
        angkatan: kegiatan.mahasiswa.angkatan
          ? kegiatan.mahasiswa.angkatan
          : "2017",
        nama_program_studi: kegiatan.program_studi.nama_program_studi,
        judul: kegiatan.judul.toUpperCase(),
        no_surat: req.body.no_surat,
        tgl_pelaksanaan: moment(kegiatan.tgl_pelaksanaan, "YYYY-MM-DD").format(
          "DD MMMM YYYY"
        ),
        hari: moment(kegiatan.tgl_pelaksanaan, "YYYY-MM-DD").format("dddd"),
        jam: kegiatan.jam,
        jenis_kegiatan:
          kegiatan.jenis_kegiatan === "Seminar"
            ? kegiatan.jenis_seminar.toUpperCase()
            : kegiatan.jenis_kegiatan.toUpperCase(),
        noUrut: urutan.urutan,
        form: form,
        dosen: {
          dosen_pembimbing_1: {
            nama_dosen: kegiatan.dosen_pembimbing_1.nama_dosen,
            nip: kegiatan.dosen_pembimbing_1.nip,
          },
          dosen_pembimbing_2: {
            nama_dosen: kegiatan.dosen_pembimbing_2
              ? kegiatan.dosen_pembimbing_2.nama_dosen
              : "-",
            nip: kegiatan.dosen_pembimbing_2
              ? kegiatan.dosen_pembimbing_2.nip
              : "-",
          },
          dosen_penguji_1: dosen_penguji_1,
          dosen_penguji_2: dosen_penguji_2,
        },
      };

      kegiatan.email_dosen_pembimbing.map((e) => {
        to.push(e);
      });
      kegiatan.email_dosen_penguji.map((e) => {
        to.push(e);
      });

      const suratTemplate = await ejs.renderFile(
        path.join(__dirname, "../views/", "surat.ejs"),
        {
          mahasiswa,
        }
      );

      const templateEjs =
        kegiatan.jenis_kegiatan !== "Seminar" ? "bap.ejs" : "form_seminar.ejs";
      const bapTemplate = await ejs.renderFile(
        path.join(__dirname, "../views/", templateEjs),
        {
          mahasiswa,
        }
      );

      parallel(
        {
          surat: function (callback) {
            pdf
              .create(suratTemplate, { height: "10in", width: "6.5in" })
              .toBuffer(async function (err, buffer) {
                if (err) {
                  callback(err, null);
                } else {
                  callback(null, buffer);
                }
              });
          },
          bap: function (callback) {
            pdf
              .create(bapTemplate, { height: "10in", width: "6.5in" })
              .toBuffer(async function (err, buffer) {
                if (err) {
                  callback(err, null);
                } else {
                  callback(null, buffer);
                }
              });
          },
        },
        async function (errorAsync, results) {
          if (errorAsync) {
            console.log(
              "error send Email PendfataranController : ",
              errorAsync
            );
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: "error",
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
          } else {
            const email = {
              to: kegiatan.email_mahasiswa,
              cc: to,
              from: "pendaftaran@trunojoyo.ac.id",
              subject: `File Pelaskanaan ${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}`,
              text: `File Pelaskanaan ${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}`,
              attachments: [
                {
                  filename: `Surat ${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}.pdf`,
                  content: results.surat,
                },
                {
                  filename: `${kegiatan.jenis_kegiatan} ${kegiatan.program_studi.nama_program_studi} ${kegiatan.mahasiswa.nim} ${kegiatan.mahasiswa.nama_mahasiswa}.pdf`,
                  content: results.bap,
                },
              ],
            };

            await FormUrutanModel.updateOne(
              {
                jenis_kegiatan: kegiatan.jenis_kegiatan,
              },
              {
                urutan: urutan.urutan + kegiatan.jenis_kegiatan === "Seminar" ? 3 : 6,
              }
            );
            await PendaftaranModel.updateOne(
              { _id: req.params._id },
              { status: "Setujui", no_surat: req.body.no_surat }
            );

            await mailer.sendMail(email);
            res.status(HttpStatus.OK).json({
              status: HttpStatus.OK,
              message: "success",
            });
          }
        }
      );
    } catch (err) {
      console.log("error at sendEmail pendaftaranController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
