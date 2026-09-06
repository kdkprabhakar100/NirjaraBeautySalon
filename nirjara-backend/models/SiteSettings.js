const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    openingHours: {
      type: String,
      default: "",
    },

    mapUrl: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    salonName: {
      type: String,
      default: "Nirjara Beauty",
    },

    description: {
      type: String,
      default:
        "A professional beauty salon and academy offering salon services, beauty training, and customer-focused care in Kathmandu.",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    branches: {
      type: [branchSchema],
      default: [],
    },

    socialLinks: {
      facebook: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },

      tiktok: {
        type: String,
        default: "",
      },

      youtube: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SiteSettings",
  siteSettingsSchema
);