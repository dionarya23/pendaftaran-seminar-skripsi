const express = require("express");
require("dotenv").config();
const { json, urlencoded } = require("body-parser");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const { log } = console;

const HttpStatus = require("http-status-codes");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

const apiV1 = (url) => {
  return `/api/v1${url}`;
};

// const UserModel = require("./models/users.model");

// const midleware = async (req, res, next) => {
//   if (!req.header("x-auth-token")) {
//     res.status(HttpStatus.UNAUTHORIZED).json({
//       status: HttpStatus.UNAUTHORIZED,
//       message: "token not found",
//     });
//   } else {
//     const user = await UserModel.findOne({ token: req.header("x-auth-token") });
//     if (!user) {
//       res.status(HttpStatus.UNAUTHORIZED).json({
//         status: HttpStatus.UNAUTHORIZED,
//         message: "unauthorized",
//       });
//     }

//     next();
//   }
// };

app.use(apiV1("/user"), require("./routes/user.route"));
app.use(apiV1("/pendaftaran"), require("./routes/pendaftaran.route"));
app.use(apiV1("/dosen"), require("./routes/dosen.route"));
app.use(apiV1("/mahasiswa"), require("./routes/mahasiswa.route"));
app.use(apiV1("/jenis-kegiatan"), require("./routes/jenis_kegiatan.route"));
app.use(apiV1("/program-studi"), require("./routes/program_studi.route"));

const cloudinary = require("./config/cloudinary");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

app.get(apiV1("/cloudinary/:public_id"), (req, res) => {
  res.status(HttpStatus.OK).json({
    data: cloudinary.image(`${req.params.public_id}.pdf`, {
      flag: "attachment",
    }),
  });
});

app.post(apiV1("/upload-pdf"), multipartMiddleware, async (req, res) => {
  try {
    if (req.files.subtitle.type === "application/pdf") {
      const resultCloudinary = await cloudinary.v2.uploader.upload(
        req.files.subtitle.path,
        { resource_type: "auto" }
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        url: resultCloudinary.url,
        data: resultCloudinary,
      });
    } else {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "file must pdf",
      });
    }
  } catch (err) {
    console.log("error at createPendaftaran pendaftaran controller : ", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "error",
    });
  }
});
// const moment = require('moment')
const moment = require('moment')
app.get(apiV1("/generate-pdf"), (req, res) => {
  moment.locale("id")
  res.status(HttpStatus.OK).json({
    hari: moment("2020-08-10", "YYYY-MM-DD").format("DD-MM-YYYY"),
    hari_beneran : moment("2020-08-10", "YYYY-MM-DD").format("dddd")
  })
  // ejs.renderFile(
  //   path.join(__dirname, "./views/", "laporan.ejs"),
  //   {
  //     mahasiswa: {
  //       nama_mahasiswa: "Dion Arya Pamungkas",
  //       nim: "10517016",
  //       nama_program_studi: "Teknik Cinta",
  //       judul: "Cara Mendapatkan Cinta Sejati",
  //       tgl_pelaksanaan: "2020-08-10",
  //       hari: "senin",
  //       jam: "10:10",
  //     },
  //   },
  //   (err, data) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       pdf
  //         .create(data, {
  //           height: "10in", // allowed units: mm, cm, in, px
  //           width: "6.8in",
  //         })
  //         .toFile("report.pdf", function (err, data) {
  //           if (err) {
  //             res.send(err);
  //           } else {
  //             res.send("File created successfully");
  //           }
  //         });
  //     }
  //   }
  // );
});

app.listen(process.env.PORT || 3000, log("Server Running ...."));
