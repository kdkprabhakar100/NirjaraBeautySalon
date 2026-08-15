const SiteSettings = require("../models/SiteSettings");

// =============================
// GET SITE SETTINGS
// =============================
const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        salonName: "Nirjara Beauty",

        description:
          "A professional beauty salon and academy offering salon services, beauty training, and customer-focused care in Kathmandu.",

        email: "",
        phone: "",
        whatsapp: "",

        branches: [
          {
            name: "Rabibhawan Branch",
            label: "Main Branch · Est. 2013",
            address:
              "Rabibhawan, Kalanki-Kalimati Road, Kathmandu",
            phone: "+977 9851097472",
            openingHours:
              "8:30 AM – 10:00 PM · Open Daily",
            mapUrl: "",
          },

          {
            name: "Chabahil Branch",
            label: "New Branch",
            address:
              "Chunne Bhairab Marg, Chabahil, Kathmandu 44600",
            phone: "+977 9849193532",
            openingHours:
              "8:30 AM – 10:00 PM · Open Daily",
            mapUrl: "",
          },
        ],

        socialLinks: {
          facebook: "",
          instagram: "",
          tiktok: "",
          youtube: "",
        },
      });
    }

    res.json(settings);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// UPDATE SITE SETTINGS
// =============================
const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      settings.salonName =
        req.body.salonName ?? settings.salonName;

      settings.description =
        req.body.description ?? settings.description;

      settings.email =
        req.body.email ?? settings.email;

      settings.phone =
        req.body.phone ?? settings.phone;

      settings.whatsapp =
        req.body.whatsapp ?? settings.whatsapp;

      if (req.body.branches !== undefined) {
        settings.branches = req.body.branches;
      }

      if (req.body.socialLinks !== undefined) {
        settings.socialLinks = {
          ...settings.socialLinks.toObject?.(),
          ...req.body.socialLinks,
        };
      }
    }

    const updatedSettings = await settings.save();

    res.json(updatedSettings);
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSiteSettings,
  updateSiteSettings,
};