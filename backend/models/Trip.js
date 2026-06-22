const mongoose = require("mongoose");

const activitySchema =
  new mongoose.Schema({
    title: String,

    description: String,

    estimatedCost: {
      type: Number,
      default: 0
    },

    timeOfDay: {
      type: String,
      enum: [
        "Morning",
        "Afternoon",
        "Evening"
      ]
    }
  });

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    durationDays: {
      type: Number,
      required: true
    },

    budgetTier: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      required: true
    },

    interests: [String],

    itinerary: [
      {
        dayNumber: Number,
        activities: [activitySchema]
      }
    ],

    hotels: [
      {
        name: String,
        tier: String,
        rating: String,
        estimatedCostNight: Number
      }
    ],

    estimatedBudget: {
      flights: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number
    },

   packingList: [
  {
    item: {
      type: String,
      required: true
    },

    category: {
      type: String
    },

    isPacked: {
      type: Boolean,
      default: false
    }
  }
]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Trip",
  tripSchema
);