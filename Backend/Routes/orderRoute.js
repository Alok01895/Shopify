const express=require("express");
const { newOrder, getOrderDetails, getMyOrderDetails, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAuthenticated, authorized } = require("../middleware/Authen");
const router=express.Router();

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/order/:id").get(isAuthenticated,authorized("admin"),getOrderDetails);
router.route("/orders/me").get(isAuthenticated,getMyOrderDetails);
router.route("/orders/all").get(isAuthenticated,authorized("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorized("admin"),updateOrderStatus).delete(isAuthenticated,authorized("admin"),deleteOrder)
module.exports=router
