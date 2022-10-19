const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },

    age: {
      type: Number,
      min: [10, "Age cannot be less than 10"],
      max: [50, "Age cannot be more than 50"],
      required: [true, "Enter your age"],
    },
    mark1: {
      type: Number,
      min: [0, "Marks must be greater than 0"],
      max: [100, "Marks must be less than 100"],
      required: [true, "Enter your mark1"],
    },
    mark2: {
      type: Number,
      min: [0, "Marks must be greater than 0"],
      max: [100, "Marks must be less than 100"],
      required: [true, "Enter your mark1"],
    },
    mark3: {
      type: Number,
      min: [0, "Marks must be greater than 0"],
      max: [100, "Marks must be less than 100"],
      required: [true, "Enter your mark1"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
