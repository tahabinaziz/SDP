const mongoose = require("mongoose");
const questTableSchema = new mongoose.Schema(
    {
      meetingId: {type: String, required: true},  
      qNumber: {type: Number, required: true},
      question: {type: String, required: true},  
      questionType: {type: String, required: true},  
      answer: { type: String, required: true },
     
    },
    { versionKey: false }
  );
  module.exports = mongoose.model("qTable", questTableSchema);