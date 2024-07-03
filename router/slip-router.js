// auth-router.js
const express = require('express');
const router = express.Router();
const slipController = require("../controller/slip-controller"); 

router.post("/save-slip",slipController.saveSlip)
router.get("/view-slip/:slip_no", slipController.ViewSlip);
router.get("/view-slip-data", slipController.SlipData);
router.get("/count-slip", slipController.countSlip);

module.exports = router;
