const express = require("express");
const {registerUser, loginUser, logoutuser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAlluser, getSingleUser, updateUserrole, deleteUser} = require("../controller/usercontroller");
const {isAuthticateUser, authoriseRoles} = require("../middleware/auth");
const router = express.Router();

const bodyparser = require('body-parser')
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}))
 // user router for registraion 
router.post("/register",registerUser)
//login user 
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassword);
router.get("/logout", logoutuser)
router.route("/me").get(isAuthticateUser, getUserDetails)
router.route("/password/update").put(isAuthticateUser,updatePassword)
router.route("/me/Profile").put(isAuthticateUser,updateUserProfile)
router.route("/admin/users").get(isAuthticateUser, authoriseRoles("admin"),getAlluser)
router.route("/admin/user/:id").get(isAuthticateUser, authoriseRoles("admin"),getSingleUser)

router.route("/admin/users/:id").put(isAuthticateUser, authoriseRoles("admin"),updateUserrole)

router.route("/admin/users/:id").delete(isAuthticateUser, authoriseRoles("admin"),deleteUser)

module.exports = router;