const express = require("express");
require("dotenv").config();
const { json, urlencoded } = require("body-parser");
const app = express();

const { log } = console;

const HttpStatus = require("http-status-codes");

app.use(urlencoded({ extended: false }));
app.use(json());

const apiV1 = (url) => {
  return `/api/v1${url}`;
};

const UserModel = require("./models/users.model");

const midleware = async (req, res, next) => {
  if (!req.header("x-auth-token")) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: "token not found",
    });
  } else {
    const user = await UserModel.findOne({ token: req.header("x-auth-token") });
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: "unauthorized",
      });
    }

    next();
  }
};

app.use(apiV1("/user"), require("./routes/user.route"));
app.use(apiV1("/pendaftaran"), require("./routes/pendaftaran.route"));
app.use(apiV1("/dosen"), midleware, require("./routes/dosen.route"));
app.use(apiV1("/mahasiswa"), midleware, require("./routes/mahasiswa.route"));
app.use(apiV1("/jenis-kegiatan"), midleware, require("./routes/jenis_kegiatan.route"));
app.use(apiV1("/program-studi"), midleware, require("./routes/program_studi.route"));

app.listen(process.env.PORT || 3000, log("Server Running ...."));
