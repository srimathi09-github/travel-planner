const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  generateTrip,
  getTrips,
  getTripById
} = require("../controllers/tripController");

router.post("/generate", auth, generateTrip);
router.get("/", auth, getTrips);
router.get("/:id", auth, getTripById);

module.exports = router;