const router = require("express").Router();
const JenisKegiatanController = require("../controllers/jenis_kegiatan.controller");

router.get("/", JenisKegiatanController.getKegiatan);
router.post("/", JenisKegiatanController.createKegiatan);
router.put("/:_id", JenisKegiatanController.updateJenisKegiatan);
router.get("/:_id", JenisKegiatanController.getOneJenisKegiatan);
router.delete("/:_id", JenisKegiatanController.deleteJenisKegiatan);

module.exports = router;
