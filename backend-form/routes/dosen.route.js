const router = require("express").Router();
const DosenController = require("../controllers/dosen.controller");

router.get("/program-studi/:id_jurusan", DosenController.getDosen);
router.post("/", DosenController.createDosen);
router.put("/:_id", DosenController.updateDosen);
router.get("/:_id", DosenController.getOneDosen);
router.delete("/:_id", DosenController.deleteDosen);
router.get("/", DosenController.getAllDosen);

module.exports = router;
