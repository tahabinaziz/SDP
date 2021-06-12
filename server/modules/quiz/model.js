const mongoose= require('mongoose');

const quizSchema = new mongoose.Schema({
meetingId: { type: String,required:true},
password:{ type: String,required:true},
title:{ type: String,required:true},
description:{ type: String,required:false},
duration:{ type: String,required:false},
dueDate:{ type: String,required:false},
emailRegex:{ type: String,required:false},
},{ versionKey: false })
module.exports = Course = mongoose.model("quiz",quizSchema);
