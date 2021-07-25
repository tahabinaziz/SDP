const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    title:{type: String, required: true},  
    email:{type: String, required: true},
    meetingId: {type: String, required: true},  
    totalQuestion: {type: Number, required: true},
    correctAnswer: { type: String, required: true },
    percentage: { type: String, required: true }
   
  },
  { versionKey: false }
);
module.exports = mongoose.model("result", resultSchema);
