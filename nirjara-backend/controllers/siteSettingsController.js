import SiteSettings from "../models/SiteSettings.js";

export const getSiteSettings = async (req, res) => {
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

    res.status(200).json(settings);
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      message: "Unable to load site settings.",
    });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(req.body);

      return res.status(201).json(settings);
    }

    settings = await SiteSettings.findByIdAndUpdate(
      settings._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(settings);
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      message: "Unable to update site settings.",
    });
  }
};