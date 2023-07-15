const express = require("express");

const { getallproduct, createProduct, updateProduct, deleteProduct, getsingleProduct, createProductReview, getProductReviews, deleteReviews } = require("../controller/productcontoller");
const { isAuthticateUser, authoriseRoles} = require("../middleware/auth");
const { newOrder } = require("../controller/ordercontorller");
 const router = express.Router();
 //ya to ye bhi shi hai
 router.route("/products").get( getallproduct);
 router.route("/admin/product/new").post(isAuthticateUser,authoriseRoles("admin"),createProduct);

 router.route("/admin/product/:id").put(isAuthticateUser,authoriseRoles("admin"),updateProduct);
 router.route("/admin/product/:id").delete(isAuthticateUser,authoriseRoles("admin"), deleteProduct);
 router.get("/products/:id", getsingleProduct);
router.route("/review").put(isAuthticateUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthticateUser,deleteReviews);

// and ye bhi shi hai
// router.route("/product").get(getallproduct);
// router.route("/product/new").post(createProduct);
//router.route("/product/:id").put(updateProduct).delete(deleteProduct)
 module.exports = router;