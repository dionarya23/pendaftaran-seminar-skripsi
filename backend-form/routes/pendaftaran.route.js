const router = require("express").Router();

const pendaftaranController = require("../controllers/pendaftaran.controller");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', pendaftaranController.getPendaftaran)
router.post('/', multipartMiddleware, pendaftaranController.createPendaftaran)

module.exports = router