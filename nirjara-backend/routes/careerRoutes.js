const express = require("express");

const router = express.Router();

const {
  getCareers,
  getAdminCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  toggleCareerActive,
} = require("../controllers/careerController");

router.get("/", getCareers);

router.get("/admin/all", getAdminCareers);

router.post("/", createCareer);

router.put("/:id", updateCareer);

router.delete("/:id", deleteCareer);

router.put("/:id/active", toggleCareerActive);

module.exports = router;