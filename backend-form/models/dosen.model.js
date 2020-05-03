const { Schema, model } = require("../config/db");

const DosenSchema = new Schema({
  nama_dosen: {
    type: String,
    required: true,
  },
  nip: {
    type: String,
    required: true
  },
  program_studi: {
    type: Schema.Types.ObjectId,
    ref: "program_studi",
  },
});

const DosenModel = model("dosen", DosenSchema);

module.exports = DosenModel;
