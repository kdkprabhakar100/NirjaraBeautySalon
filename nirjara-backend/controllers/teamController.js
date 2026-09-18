const Team = require("../models/Team");

// ==========================================
// GET ALL TEAM MEMBERS
// ADMIN
// ==========================================
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json(members);
  } catch (error) {
    console.error("GET TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

// ==========================================
// GET PUBLIC TEAM MEMBERS
// ONLY ACTIVE MEMBERS
// ==========================================
exports.getPublicTeamMembers = async (req, res) => {
  try {
    const members = await Team.find({
      status: "Active",
    }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json(members);
  } catch (error) {
    console.error("GET PUBLIC TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE TEAM MEMBER
// ==========================================
exports.createTeamMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      bio = "",
      image = "",
      status = "Active",
    } = req.body;

    // ------------------------------
    // VALIDATION
    // ------------------------------
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Team member name is required",
      });
    }

    if (!designation || !designation.trim()) {
      return res.status(400).json({
        message: "Designation is required",
      });
    }

    // ------------------------------
    // AUTOMATIC ORDER
    // Put new member at the end
    // ------------------------------
    const lastMember = await Team.findOne().sort({
      order: -1,
    });

    const nextOrder = lastMember
      ? (lastMember.order || 0) + 1
      : 1;

    // ------------------------------
    // CREATE
    // ------------------------------
    const member = await Team.create({
      name: name.trim(),
      designation: designation.trim(),
      bio: bio?.trim() || "",
      image: image || "",
      order: nextOrder,
      status,
    });

    return res.status(201).json({
      message: "Team member created successfully",
      member,
    });
  } catch (error) {
    console.error("CREATE TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE TEAM MEMBER
// ==========================================
exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    console.error("UPDATE TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE TEAM MEMBER
// ==========================================
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    // ------------------------------
    // RE-NUMBER REMAINING MEMBERS
    // ------------------------------
    const remainingMembers = await Team.find().sort({
      order: 1,
      createdAt: 1,
    });

    await Promise.all(
      remainingMembers.map((item, index) =>
        Team.findByIdAndUpdate(item._id, {
          order: index + 1,
        })
      )
    );

    return res.status(200).json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};

// ==========================================
// REORDER TEAM MEMBERS
// DRAG AND DROP
// ==========================================
exports.reorderTeamMembers = async (req, res) => {
  try {
    const { members } = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({
        message: "Members must be an array",
      });
    }

    if (members.length === 0) {
      return res.status(400).json({
        message: "Members array cannot be empty",
      });
    }

    // ------------------------------
    // UPDATE ORDER
    // ------------------------------
    await Promise.all(
      members.map((member, index) =>
        Team.findByIdAndUpdate(member._id, {
          order: index + 1,
        })
      )
    );

    // ------------------------------
    // RETURN UPDATED LIST
    // ------------------------------
    const updatedMembers = await Team.find().sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      message: "Team order updated successfully",
      members: updatedMembers,
    });
  } catch (error) {
    console.error("REORDER TEAM ERROR:", error);

    return res.status(500).json({
      message: "Failed to reorder team members",
      error: error.message,
    });
  }
};