const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true },
    questionData: [
      {
        question: { type: String, required: true },
        option: [String],
        answer: { type: String, required: true },
      },
    ],
  },
  { versionKey: false }
);
module.exports = mongoose.model("question", questionSchema);
