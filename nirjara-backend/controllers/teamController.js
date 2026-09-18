const Team = require("../models/Team");

// =============================
// GET ALL TEAM MEMBERS
// ADMIN
// =============================
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json(members);
  } catch (error) {
    console.error("GET TEAM ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

// =============================
// GET PUBLIC TEAM MEMBERS
// ONLY ACTIVE
// =============================
exports.getPublicTeamMembers = async (
  req,
  res
) => {
  try {
    const members = await Team.find({
      status: "Active",
    }).sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json(members);
  } catch (error) {
    console.error(
      "GET PUBLIC TEAM ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

// =============================
// CREATE TEAM MEMBER
// =============================
exports.createTeamMember = async (
  req,
  res
) => {
  try {
    const {
      name,
      designation,
      bio,
      image,
      order,
      status,
    } = req.body;

    const member = await Team.create({
      name,
      designation,
      bio,
      image,
      order,
      status,
    });

    res.status(201).json({
      message: "Team member created successfully",
      member,
    });
  } catch (error) {
    console.error("CREATE TEAM ERROR:", error);

    res.status(500).json({
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

// =============================
// UPDATE TEAM MEMBER
// =============================
exports.updateTeamMember = async (
  req,
  res
) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.status(200).json({
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    console.error("UPDATE TEAM ERROR:", error);

    res.status(500).json({
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

// =============================
// DELETE TEAM MEMBER
// =============================
exports.deleteTeamMember = async (
  req,
  res
) => {
  try {
    const member =
      await Team.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.status(200).json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TEAM ERROR:", error);

    res.status(500).json({
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};

// =============================
// REORDER TEAM MEMBERS
// =============================
exports.reorderTeamMembers = async (
  req,
  res
) => {
  try {
    const { members } = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({
        message: "Members must be an array",
      });
    }

    await Promise.all(
      members.map((member, index) =>
        Team.findByIdAndUpdate(member._id, {
          order: index + 1,
        })
      )
    );

    const updatedMembers = await Team.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      message: "Team order updated successfully",
      members: updatedMembers,
    });
  } catch (error) {
    console.error("REORDER TEAM ERROR:", error);

    res.status(500).json({
      message: "Failed to reorder team members",
      error: error.message,
    });
  }
};