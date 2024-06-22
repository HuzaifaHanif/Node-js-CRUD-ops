const {Router} = require("express");
const usersController = require("./controller");

const router = Router();

router.post("/register" , usersController.registerUser);
router.post("/login" , usersController.loginUser);

module.exports = router ;
