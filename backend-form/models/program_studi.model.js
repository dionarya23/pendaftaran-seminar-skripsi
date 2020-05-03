const { Schema, model } = require("../config/db");

const { isEmail } = require("validator");

const ProgramStudiSchema = new Schema({
  nama_program_studi: {
    type: String,
    required: true,
   
  },
  email_program_studi: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    index: {
      unique: true,
    },
  },
  dosen: [{ type: Schema.Types.ObjectId, ref: "dosen" }],
});

const ProgramStudiModel = model("program_studi", ProgramStudiSchema);

module.exports = ProgramStudiModel;
