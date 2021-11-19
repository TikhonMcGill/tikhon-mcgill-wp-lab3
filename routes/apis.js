const express = require("express");
const productController = require("../controllers/productController");
const clientController = require("../controllers/clientController");

const bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//define a router and create routes
const router = express.Router();

//routes for dynamic processing of products
//-----------------------------------------------
//route for listing all products
router.get("/api/catalog", productController.getCatalogue);
router.get("/api/article/:id", productController.getProductByID);

//routes for dynamic processing of clients
//-----------------------------------------------
//route for registration
router.post(
  "/api/register",
  urlencodedParser,
  clientController.registerControl
);
//route for login
router.post("/api/login", urlencodedParser, clientController.loginControl);

//export router
module.exports = router;
