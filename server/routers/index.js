const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", Controller.testRoot);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/routes", Controller.addRoute);
router.get("/routes", Controller.getAllRoutes);
router.get("/fleets", Controller.getAllFleets);
router.get("/routes/:id", Controller.getRouteById);
router.post("/ticket", authentication, Controller.createTicket);
router.get("/my-tickets", authentication, Controller.getTicketByUser);
router.post("/payment", authentication, Controller.handlePayment);
router.put("/ticket", authentication, Controller.updateTicket);

module.exports = router;
