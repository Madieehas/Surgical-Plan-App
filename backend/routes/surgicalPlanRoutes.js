const express = require("express");
const router = express.Router();

const controller = require("../controllers/surgicalPlanController");
const auth = require("../middleware/auth");
const role = require("../middleware/roleMiddleware");

// CREATE
router.post("/", auth, role(["doctor"]), controller.createPlan);

// GET ALL (DOCTOR)
router.get("/all", auth, role(["doctor"]), controller.getAllPlans);

// GET MY (PATIENT)
router.get("/my", auth, role(["patient"]), controller.getMyPlans);

// UPDATE
router.put("/:id", auth, role(["doctor"]), controller.updatePlan);

// DELETE
router.delete("/:id", auth, role(["doctor"]), controller.deletePlan);

module.exports = router;
