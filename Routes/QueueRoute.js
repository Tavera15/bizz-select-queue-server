const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer({
    limits: {fieldSize: 25 * 1024 * 1024}
});

const QueueController = require("../Controllers/QueueController.js");

router.get("/GetOrder/:id/:order", (req, res) => QueueController.GetOrder(req, res));
router.get("/GetStoreOrders/:id", (req, res) => QueueController.GetStoreOrders(req, res));
router.post("/CreateNewOrder", upload.array("files"), (req, res) => QueueController.CreateNewOrder(req, res));
router.put("/UpdateOrder/:id/:order", (req, res) => QueueController.UpdateOrder(req, res));
router.put("/CompleteOrder/:id/:order", (req, res) => QueueController.CompleteOrder(req, res));

module.exports = router;