const mongoose= require('mongoose');

const teacherSchema = new mongoose.Schema({
name: { type: String,required:true},
courseId:{type:mongoose.Schema.Types.ObjectId, ref:'course', required:true},
email: { type: String,required:true},
password:{type:String,required:true},
// createDate: {type:String,required:true},
// createdTime:{type:String,required:true}

},{ versionKey: false })
module.exports = Teacher = mongoose.model("teacher",teacherSchema);
