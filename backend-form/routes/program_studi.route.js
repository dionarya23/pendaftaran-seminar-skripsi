const router = require("express").Router();
const ProgramStudiController = require("../controllers/program_studi.controller");

router.get("/", ProgramStudiController.getProgramStudi);
router.post("/", ProgramStudiController.createProgramStudi);

module.exports = router;
