const { Schema, model } = require("../config/db");

const Urutan = new Schema({
  jenis_kegiatan: {
    type: String,
  },
  urutan: {
    type: Number,
  },
});

const UrutanModel = model("urutan_form", Urutan);
module.exports = UrutanModel;
