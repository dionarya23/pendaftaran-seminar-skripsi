const UserModel = require("../models/users.model");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const User = await UserModel.findOne({
        username,
      });

      if (User) {
        if (await User.validatePassword(password)) {
          const token = jwt.sign(req.body, process.env.JWT_SECRET),
            query = { username },
            update = { token };

          await UserModel.updateOne(query, update);

          res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "sucess",
            data: {
              token,
            },
          });
        } else {
          res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: "wrong password",
          });
        }
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: "username not found",
        });
      }
    } catch (err) {
      console.log("Error Login in UserController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },

  async register(req, res) {
    try {
      const newUser = await UserModel.create(req.body);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "sucess",
        data: newUser,
      });
    } catch (err) {
      console.log("Error Login in UserController : ", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      });
    }
  },
};
