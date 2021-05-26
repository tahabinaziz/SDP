const mongoose= require('mongoose');

const courseSchema = new mongoose.Schema({
name: { type: String,required:true},
courseKey:{ type: String,required:true}
},{ versionKey: false })
module.exports = Course = mongoose.model("course",courseSchema);
