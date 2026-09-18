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
// PUBLIC TEAM MEMBERS
// =============================
router.get("/public", getPublicTeamMembers);

// =============================
// ADMIN - GET ALL TEAM MEMBERS
// =============================
router.get("/", getTeamMembers);

// =============================
// CREATE TEAM MEMBER
// =============================
router.post("/", createTeamMember);

// =============================
// REORDER TEAM MEMBERS
// =============================
router.put("/reorder", reorderTeamMembers);

// =============================
// UPDATE TEAM MEMBER
// =============================
router.put("/:id", updateTeamMember);

// =============================
// DELETE TEAM MEMBER
// =============================
router.delete("/:id", deleteTeamMember);

module.exports = router;