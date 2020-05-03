const router = require("express").Router();
const MahasiswaController = require("../controllers/mahasiswa.controller");

router.get("/", MahasiswaController.getAllMahasiswa);
router.post("/", MahasiswaController.createMahasiswa);

module.exports = router;
