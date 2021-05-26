const Teacher = require("./model");
const date = require("../../utiles/date").date;
const time = require("../../utiles/time").time;
const bcrypt = require("bcrypt");

/////////////////////////////////////////////////////Teacher/////////////////////////////////////////////

exports.get = async (req, res) => {
  try {
    let teacher = await Teacher.find({}).exec();

    if (!teacher) {
      res.status(404).json({
        message: "Not Found",
      });
    }

    return res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/*Create Teacher*/
exports.create = async (req, res) => {
  try {
    let { email, password, name, courseId } = req.body;

    if (
      !name ||
      !email || !password ||
      !courseId 

    ) {
      return res.status(400).json({ message: "Field Empty" + error.message });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password need to be atleast 5 characters" });
    }

    const existingTeacher = await Teacher.findOne({ email: email });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ msg: "Account with this email is already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash)
    console.log(password)

    let teacher = new Teacher({
      password: passwordHash,
      name,
      email,
      courseId,
      // createdDate: "date",
      // createTime: "time",
    });

    let insertTeacher = await teacher.save();
    return res.status(200).json(insertTeacher);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

////////////////////////////////////////////////////////*Edit Teacher*////////////////////////
/*Update Teacher*/
exports.update = async (req, res) => {
  try {
    let id = req.params.teacherId;
    await Teacher.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

/*Teacher Delete By Id */
exports.delete = async (req, res) => {
  try {
    let id = req.params.teacherId;
    let teacherExist = await Teacher.findOne({ _id: id }).exec();

    if (!teacherExist) {
      res.status(404).json({ message: "Not Found" });
    }

    await Teacher.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Teacher Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
