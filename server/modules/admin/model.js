const mongoose= require('mongoose');

const adminSchema = new mongoose.Schema({
email: { type: String,required:true},
password:{type:String,required:false},

},{ versionKey: false })
module.exports = Admin = mongoose.model("admin",adminSchema);
