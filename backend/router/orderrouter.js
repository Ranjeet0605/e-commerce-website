const express = require("express");

const { newOrder, getsingleorder, myOrders, getAllOrders, updateOrders, deleteOrder } = require("../controller/ordercontorller");
const { isAuthticateUser, authoriseRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/order/new").post(isAuthticateUser, newOrder)
   router.route("/order/:id").get(isAuthticateUser,getsingleorder)
   router.route("/orders/me").get(isAuthticateUser,myOrders)
   router.route("/admin/orders").get(isAuthticateUser,authoriseRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthticateUser,authoriseRoles("admin"),updateOrders)
router.route("admin/delteorder/:id").delete(isAuthticateUser,authoriseRoles("admin"),deleteOrder)
   
module.exports = router;
