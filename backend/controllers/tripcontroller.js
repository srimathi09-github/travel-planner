const Trip = require("../models/Trip");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

// Generate Trip
exports.generateTrip = async (req, res) => {
  try {
    const {
      destination,
      durationDays,
      budgetTier,
      interests
    } = req.body;

    const prompt = `
Generate a travel plan for:

Destination: ${destination}
Days: ${durationDays}
Budget: ${budgetTier}
Interests: ${interests.join(", ")}

Return ONLY valid JSON:

{
  "itinerary":[
    {
      "dayNumber":1,
      "activities":[
        {
          "title":"string",
          "description":"string",
          "estimatedCost":20,
          "timeOfDay":"Morning"
        }
      ]
    }
  ],
  "hotels":[
    {
      "name":"string",
      "tier":"Budget",
      "rating":"4.5",
      "estimatedCostNight":100
    }
  ],
  "estimatedBudget":{
    "flights":400,
    "accommodation":300,
    "food":150,
    "activities":100,
    "total":950
  },
  "packingList":[
    {
      "item":"Passport",
      "category":"Documents",
      "isPacked":false
    }
  ]
}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    const cleaned =
      response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed =
      JSON.parse(cleaned);

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetTier,
      interests,

      itinerary:
        parsed.itinerary,

      hotels:
        parsed.hotels,

      estimatedBudget:
        parsed.estimatedBudget,

      packingList:
        parsed.packingList
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Trip generation failed"
    });
  }
};

// Get All User Trips
exports.getTrips = async (
  req,
  res
) => {
  try {
    const trips =
      await Trip.find({
        userId: req.user.id
      }).sort({
        createdAt: -1
      });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message:
        "Unable to fetch trips"
    });
  }
};

// Get Single Trip
exports.getTripById =
  async (req, res) => {
    try {
      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user.id
        });

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message:
          "Unable to fetch trip"
      });
    }
  };

// Update Trip
exports.updateTrip =
  async (req, res) => {
    try {
      const trip =
        await Trip.findOneAndUpdate(
          {
            _id:
              req.params.id,
            userId:
              req.user.id
          },
          req.body,
          {
            new: true
          }
        );

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message:
          "Update failed"
      });
    }
  };

// Delete Trip
exports.deleteTrip =
  async (req, res) => {
    try {
      const trip =
        await Trip.findOneAndDelete(
          {
            _id:
              req.params.id,
            userId:
              req.user.id
          }
        );

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      res.json({
        message:
          "Trip deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Delete failed"
      });
    }
  };

// Add Activity
exports.addActivity =
  async (req, res) => {
    try {
      const {
        dayNumber,
        activity
      } = req.body;

      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user.id
        });

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      const day =
        trip.itinerary.find(
          (d) =>
            d.dayNumber ===
            dayNumber
        );

      if (!day) {
        return res
          .status(404)
          .json({
            message:
              "Day not found"
          });
      }

      day.activities.push(
        activity
      );

      await trip.save();

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message:
          "Unable to add activity"
      });
    }
  };

// Remove Activity
exports.removeActivity =
  async (req, res) => {
    try {
      const {
        activityId
      } = req.params;

      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user.id
        });

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      trip.itinerary.forEach(
        (day) => {
          day.activities =
            day.activities.filter(
              (activity) =>
                activity._id.toString() !==
                activityId
            );
        }
      );

      await trip.save();

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message:
          "Unable to remove activity"
      });
    }
  };

// Regenerate Specific Day
exports.regenerateDay =
  async (req, res) => {
    try {
      const {
        dayNumber,
        instruction
      } = req.body;

      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user.id
        });

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      const prompt = `
Trip destination: ${trip.destination}

Regenerate Day ${dayNumber}

User request:
${instruction}

Return ONLY:

{
  "activities":[
    {
      "title":"string",
      "description":"string",
      "estimatedCost":20,
      "timeOfDay":"Morning"
    }
  ]
}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      const cleaned =
        response
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      const parsed =
        JSON.parse(cleaned);

      const day =
        trip.itinerary.find(
          (d) =>
            d.dayNumber ===
            dayNumber
        );

      day.activities =
        parsed.activities;

      await trip.save();

      res.json(trip);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Unable to regenerate day"
      });
    }
  };