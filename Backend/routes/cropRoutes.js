const express = require("express");
const { getCrops, addCrop } = require("../controllers/cropController");
const router = express.Router();

router.get("/", getCrops);
router.post("/", addCrop);

module.exports = router;