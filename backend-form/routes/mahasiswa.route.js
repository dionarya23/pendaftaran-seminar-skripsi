const router = require("express").Router();
const MahasiswaController = require("../controllers/mahasiswa.controller");

router.get("/program-studi/:_id", MahasiswaController.getAllMahasiswa);
router.post("/", MahasiswaController.createMahasiswa);
router.put("/:_id", MahasiswaController.updateMahasiswa);
router.get("/:_id", MahasiswaController.getOneMahasiswa);
router.delete("/:_id", MahasiswaController.deleteMahasiswa);

module.exports = router;
