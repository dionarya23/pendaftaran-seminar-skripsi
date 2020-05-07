const { Schema, model } = require("../config/db");
const { isEmail } = require("validator");

const PendaftaranSchema = new Schema({
  email_mahasiswa: {
    type: String,
    validate: [isEmail, "invalid email"],
    // index: {
    //   unique: true,
    // },
  },
  notelp_mahasiswa: {
    type: String,
    required: true,
    // index: {
    //   unique: true,
    // },
  },
  jenis_seminar: {
    type: String,
    enum: ["Tidak Tersedia", "Seminar Proposal", "Seminar Hasil"],
    default: "Tidak Tersedia"
  },
  judul: {
    type: String,
    required: true,
  },
  tgl_pelaksanaan: {
    type: String,
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
    type: String,
    enum: ["Seminar", "Ujian Pkl", "Ujian Skripsi"],
  },
  program_studi: {
    type: Schema.Types.ObjectId,
    ref: "program_studi",
  },
  mahasiswa: {
    type: Schema.Types.ObjectId,
    ref: "mahasiswa",
  },
  status: {
    type: String,
    enum: ["Setujui", "Tidak Setujui"],
    default: "Tidak Setujui",
  },
  dosen_pembimbing_1: {
    type: Schema.Types.ObjectId,
    ref: "dosen",
  },
  dosen_pembimbing_2: {
    type: Schema.Types.ObjectId,
    ref: "dosen",
  },
  no_surat: {
    type: String,
    default: "",
  },
  dosen_penguji_1: { type: Schema.Types.ObjectId, ref: "dosen" },
  dosen_penguji_2: { type: Schema.Types.ObjectId, ref: "dosen" },
  program_studi: { type: Schema.Types.ObjectId, ref: "program_studi" },
  email_dosen_pembimbing: Array,
  email_dosen_penguji: Array,
});

const PendaftaranModel = model("pendaftaran", PendaftaranSchema);

module.exports = PendaftaranModel;
