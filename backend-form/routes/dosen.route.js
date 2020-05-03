const router = require("express").Router();
const DosenController = require("../controllers/dosen.controller");

router.get("/program-studi/:id_jurusan", DosenController.getDosen);
router.post("/", DosenController.createDosen);

module.exports = router;
