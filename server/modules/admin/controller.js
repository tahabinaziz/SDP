const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../utiles/config").tokenEncryptionSecret
const Admin = require('../admin/model')
//////////////////////////////////////////////////Add Admin//////////////////////////////////////////
/*Create Admin*/
exports.create = async (req, res) => {
    try {
      let {email,password} = req.body;
  
      if (!email || !password)
       {
        return res.status(400).json({ message: "Field Empty" + error.message });
      }
  
      if (password.length < 5) { 
        return res
          .status(400)
          .json({ msg: "Password need to be atleast 5 characters" });
      }
  
      const existingAdmin = await Admin.findOne({ email: email });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ msg: "Account with this email is already exists" });
      }
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      let admin = new Admin({
        email,
       password: passwordHash, 
      });

      let inserAdmin = await admin.save();
      return res.status(200).json(inserAdmin);
    }
     catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  /*Admin Login*/
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Not all fields have been entered." });
      }
      const admin = await Admin.findOne({ email: email }).exec();
      if (!admin) {
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
      }
  
      const isMatch = await bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid creadentials." });
      }
  
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        secret
      );
      
      res.json({
        token,
        adminId: admin._id,
        email: admin.email,

      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  