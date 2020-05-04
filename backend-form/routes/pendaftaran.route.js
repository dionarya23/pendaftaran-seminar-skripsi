const router = require("express").Router();

const pendaftaranController = require("../controllers/pendaftaran.controller");


router.get("/", pendaftaranController.getPendaftaran);
router.post("/", pendaftaranController.createPendaftaran);

router.put("/:_id", pendaftaranController.updatePendaftaran);

module.exports = router;
 