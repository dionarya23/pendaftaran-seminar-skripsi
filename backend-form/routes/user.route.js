const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/login", UserController.login);
router.get("/register", UserController.register);


module.exports = router;
