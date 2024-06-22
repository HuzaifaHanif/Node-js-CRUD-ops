const {Router} = require("express");
const studentController = require("./controller");
const {gettingToken , verifyToken} = require("./token");

const router = Router();

router.get("/" , gettingToken , verifyToken , studentController.getStudents);
router.post("/" , gettingToken , verifyToken , studentController.postStudent);
router.get("/:id" , gettingToken , verifyToken , studentController.getStudentByID);
router.put("/:id" , gettingToken , verifyToken , studentController.updateStudent);
router.delete("/:id" , gettingToken , verifyToken , studentController.deleteStudent);


module.exports = router;