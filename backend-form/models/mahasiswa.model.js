const { Schema, model } = require("../config/db");

const MahasiswaSchema = new Schema({
  nama_mahasiswa: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
  },
  angkatan: {
    type: Number,
  },
});

const MahasiswaModel = model("mahasiswa", MahasiswaSchema);
module.exports = MahasiswaModel;
