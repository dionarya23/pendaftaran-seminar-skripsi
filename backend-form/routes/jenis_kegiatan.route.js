const router = require("express").Router();
const JenisKegiatan = require("../controllers/jenis_kegiatan.controller");

router.get("/", JenisKegiatan.getKegiatan);
router.post("/", JenisKegiatan.createKegiatan);

module.exports = router;
