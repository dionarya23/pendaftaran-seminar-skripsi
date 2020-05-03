const router = require("express").Router();
const MahasiswaController = require("../controllers/mahasiswa.controller");

router.get("/", MahasiswaController.getAllMahasiswa);
router.post("/", MahasiswaController.createMahasiswa);
router.put("/:_id", MahasiswaController.updateMahasiswa);
router.get("/:_id", MahasiswaController.getOneMahasiswa);
router.delete("/:_id", MahasiswaController.deleteMahasiswa);

module.exports = router;
