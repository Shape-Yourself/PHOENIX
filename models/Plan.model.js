const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  exercise: {
    // Schema refers to Fitness model. Therefore "exercise" stores an objectId from Fitness.
    type: Schema.Types.ObjectId,
    ref: "Fitness",
  },
});

const planSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [50, 'Title cannot be more than 50 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, 'Description cannot be more than 200 characters'],
      trim: true,
      lowercase: true,
    },
    // Store user creating plan
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // Store selected exercises (with corresponding days) as an array (value) in selectedExercises (key) 
    selectedExercises: [exerciseSchema],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Plan = model("Plan", planSchema);

module.exports = Plan;