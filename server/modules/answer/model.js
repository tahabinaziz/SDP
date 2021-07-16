const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    meetingId: {type: String, required: true},  
    qNumber: {type: Number, required: true},
    answer: { type: String, required: true },
   
  },
  { versionKey: false }
);
module.exports = mongoose.model("answer", answerSchema);
