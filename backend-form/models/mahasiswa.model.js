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
  program_studi: {
    type: Schema.Types.ObjectId,
    ref: "program_studi"
  }
});

const MahasiswaModel = model("mahasiswa", MahasiswaSchema);
module.exports = MahasiswaModel;
