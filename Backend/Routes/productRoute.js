const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, productReview, getProductReviews, deleteProductReview } = require("../controllers/productController");
const { isAuthenticated, authorized } = require("../middleware/Authen");

const router=express.Router();

router.route("/products").get( getAllProducts);
router.route("/products/new").post(isAuthenticated,authorized("admin"),createProduct);
router.route("/products/:id").put(isAuthenticated,updateProduct).delete(isAuthenticated,authorized("admin"), deleteProduct)
router.route("/products/:id").get(getProductDetails)

router.route("/reviews").put(isAuthenticated,productReview)
router.route("/reviews").get(getProductReviews ).delete(isAuthenticated,deleteProductReview)
module.exports = router;