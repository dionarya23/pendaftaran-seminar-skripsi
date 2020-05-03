const router = require("express").Router();
const JenisKegiatan = require("../controllers/jenis_kegiatan.controller");

router.get("/", JenisKegiatan.getKegiatan);
router.post("/", JenisKegiatan.createKegiatan);
router.put("/:_id", JenisKegiatanController.updateJenisKegiatan);
router.get("/:_id", JenisKegiatanController.getOneJenisKegiatan);
router.delete("/:_id", JenisKegiatanController.deleteJenisKegiatan);

module.exports = router;
