const express = require("express");
require("dotenv").config();
const { json, urlencoded } = require("body-parser");
const app = express();
const cors = require("cors");
const { log } = console;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

const apiV1 = (url) => {
  return `/api/v1${url}`;
};

app.use(apiV1("/user"), require("./routes/user.route"));
app.use(apiV1("/pendaftaran"), require("./routes/pendaftaran.route"));
app.use(apiV1("/dosen"), require("./routes/dosen.route"));
app.use(apiV1("/mahasiswa"), require("./routes/mahasiswa.route"));
app.use(apiV1("/jenis-kegiatan"), require("./routes/jenis_kegiatan.route"));
app.use(apiV1("/program-studi"), require("./routes/program_studi.route"));
// app.get(apiV1("/cloudinary/:public_id"), (req, res) => {
//   res.status(HttpStatus.OK).json({
//     data: cloudinary.image(`${req.params.public_id}.pdf`, {
//       flag: "attachment",
//     }),
//   });
// });

// app.post(apiV1("/upload-pdf"), multipartMiddleware, async (req, res) => {
//   try {
//     if (req.files.subtitle.type === "application/pdf") {
//       const resultCloudinary = await cloudinary.v2.uploader.upload(
//         req.files.subtitle.path,
//         { resource_type: "auto" }
//       );

//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: "sucess",
//         url: resultCloudinary.url,
//         data: resultCloudinary,
//       });
//     } else {
//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: "file must pdf",
//       });
//     }
//   } catch (err) {
//     console.log("error at createPendaftaran pendaftaran controller : ", err);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       status: HttpStatus.INTERNAL_SERVER_ERROR,
//       message: "error",
//     });
//   }
// });
// const ejs = require("ejs");
// const pdf = require("html-pdf");
// const path = require("path");
// const HttpStatus = require("http-status-codes");
// const MahasiswaModel = require("./models/dosen.model");

// app.get(apiV1("/test"), async (req, res) => {
//   try {
//     let data = require("./json_data/dosens.json");
//     const ini = await MahasiswaModel.insertMany(data)
//     res.status(HttpStatus.OK).json({
//       message: "Success",
//       ini,
//     });
//   } catch (err) {
//     console.log("error generate pdf ", err);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       status: HttpStatus.INTERNAL_SERVER_ERROR,
//       message: "error",
//     });
//   }
// });

app.listen(process.env.PORT || 3000, log("Server Running ...."));
