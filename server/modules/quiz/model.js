const mongoose= require('mongoose');

const quizSchema = new mongoose.Schema({
meetingId: { type: String,required:true},
password:{ type: String,required:true},
title:{ type: String,required:true},
description:{ type: String,required:false},
duration:{ type: String,required:false},
startTime:{ type: String,required:false},
endTime:{ type: String,required:false},
date:{ type: String,required:false},
emailRegex:{ type: String,required:false},
status:{ type: String,required:true},
},{ versionKey: false })
module.exports = Course = mongoose.model("quiz",quizSchema);
