const { Schema, model } = require("../config/db");
const { isEmail } = require("validator");

const PendaftaranSchema = new Schema({
  email_mahasiswa: {
    type: String,
    validate: [isEmail, "invalid email"],
    index: {
      unique: true,
    },
  },
  notelp_mahasiswa: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  jenis_seminar: {
    type: String,
    enum: [null, "Seminar Proposal", "Seminar Hasil"],
    default: null,
  },
  judul: {
    type: String,
    required: true,
  },
  tgl_pelaksanaan: {
    type: Date,
    required: true,
  },
  jam: {
    type: String,
    required: true,
  },
  syarat: {
    type: String,
    required: true,
  },
  jenis_kegiatan: {
    type: Schema.Types.ObjectId,
    ref: "jenis_kegiatan",
  },
  program_studi: {
    type: Schema.Types.ObjectId,
    ref: "program_studi",
  },
  mahasiswa: {
    type: Schema.Types.ObjectId,
    ref: "mahasiswa",
  },
  dosen_pembimbing_1: { type: Schema.Types.ObjectId, ref: "dosen", default: '' },
  dosen_pembimbing_2: { type: Schema.Types.ObjectId, ref: "dosen", default: '' },
  dosen_penguji_1: { type: Schema.Types.ObjectId, ref: "dosen", default: '' },
  dosen_penguji_2: { type: Schema.Types.ObjectId, ref: "dosen", default:'' },

  email_dosen_pembimbing: Array,
  email_dosen_penguji: Array,
});

const PendaftaranModel = model("pendaftaran", PendaftaranSchema);

module.exports = PendaftaranModel;
