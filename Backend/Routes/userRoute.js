const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getuserDetails, updatepassword, updateProfile, getAllUsers, getUserByAdmin, updateUserRole, DeleteUser } = require("../controllers/userController");
const router=express.Router();
const { isAuthenticated, authorized } = require("../middleware/Authen");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser) 
router.route("/logout").get(logout) 
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/password/update").put(isAuthenticated,updatepassword)
router.route("/me/update").put(isAuthenticated,updateProfile)
router.route("/me").get(isAuthenticated, getuserDetails)
router.route("/admin/users").get(isAuthenticated,authorized("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticated,authorized("admin"),getUserByAdmin).put(isAuthenticated,authorized("admin"),updateUserRole).delete(isAuthenticated,authorized("admin"),DeleteUser)
   
module.exports= router;