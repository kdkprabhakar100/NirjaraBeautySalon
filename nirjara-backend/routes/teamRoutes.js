const express = require("express");

const router = express.Router();

const {
  getTeamMembers,
  getPublicTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} = require("../controllers/teamController");

// =============================
// PUBLIC
// =============================
router.get("/public", getPublicTeamMembers);

// =============================
// ADMIN
// =============================
router.get("/", getTeamMembers);

router.post("/", createTeamMember);

router.put("/reorder", reorderTeamMembers);

router.put("/:id", updateTeamMember);

router.delete("/:id", deleteTeamMember);

module.exports = router;