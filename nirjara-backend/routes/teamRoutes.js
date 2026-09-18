const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getTeamMembers,
  getPublicTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} = require("../controllers/teamController");

const router = express.Router();

// PUBLIC
router.get("/public", getPublicTeamMembers);

// ADMIN
router.get("/", protect, getTeamMembers);

router.post(
  "/",
  protect,
  createTeamMember
);

router.put(
  "/reorder",
  protect,
  reorderTeamMembers
);

router.put(
  "/:id",
  protect,
  updateTeamMember
);

router.delete(
  "/:id",
  protect,
  deleteTeamMember
);

module.exports = router;