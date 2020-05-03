const router = require("express").Router();
const ProgramStudiController = require("../controllers/program_studi.controller");

router.get("/", ProgramStudiController.getProgramStudi);
router.post("/", ProgramStudiController.createProgramStudi);
router.put("/:_id", ProgramStudiController.updateProgramStudi);
router.get("/:_id", ProgramStudiController.getOneProgramStudi);
router.delete("/:_id", ProgramStudiController.deleteProgramStudi);

module.exports = router;
