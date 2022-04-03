const express = require('express');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');

const router = express.Router();

router.post("/addProducts", checkAuth, ProductController.createProduct);

router.get("/getProducts/:customerId", checkAuth, ProductController.getProducts);

router.delete("/deleteProducts/:productId", checkAuth, ProductController.deleteProducts);

router.put("/editProducts", checkAuth, ProductController.editProducts);

module.exports = router;
