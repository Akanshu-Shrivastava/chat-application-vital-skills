const {
    login,
    register,
    getAllUsers,
    logOut
} = require("../controllers/UserController.js")

const router = require("express").Router();

router.post("/login",login);
router.post("/register",register);
router.post("/allusers/:id",getAllUsers);
router.post("/login/:id",logOut);

module.exports = router;