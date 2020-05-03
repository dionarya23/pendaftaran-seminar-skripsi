const { Schema, model} = require('../config/db')

const JenisKegiatanSchema = new Schema({
  nama_kegiatan: {
    type: String,
    required: true
  }
})

const JenisKegiatanModel = model('jenis_kegiatan', JenisKegiatanSchema)
module.exports = JenisKegiatanModel