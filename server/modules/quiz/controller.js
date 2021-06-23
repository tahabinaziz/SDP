const Quiz = require("./model");
const sendResponse = require("../../utiles/common").sendResponse;
/////////////////////////////////////////////////////Quiz/////////////////////////////////////////////
/*Get Quiz*/
exports.get = async (req, res) => {
  try {
    let quiz = await Quiz.find({}).exec();

    if (!quiz) {
      return sendResponse(res, true, "Not Found", 404, {});
    }
   // res.send(quiz)
    return sendResponse(res, true, "Ok", 200, { quiz });
  } catch (err) {
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
};

/*Get By Quiz*/
exports.getById = async (req, res) => {
  try {
    let id = req.params.id;
    let quiz = await Quiz.findOne({ _id: id }).exec();
    if (quiz == null) {
      return sendResponse(res, true, "Not Found", 404, {});
    } else {
      return sendResponse(res, true, "Ok", 200, { quiz });
    }
  } catch (err) {
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
};

/*Create Quiz*/
exports.create = async (req, res) => {
  try {
    let {
      meetingId,
      password,
      title,
      description,
      startTime,
      endTime,
      duration,
      emailRegex,
      date,
    } = req.body;
    if (!meetingId || !password || !title) {
      return res.status(400).json({ message: "Field Empty" });
    }

    const addQuiz = new Quiz({
      meetingId,
      password,
      title,
      description,
      duration,
      emailRegex,
      date,
      startTime,
      endTime,
      status:"available"
    });
    let insertQuiz = await addQuiz.save();
    res.json(insertQuiz);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/*Update Quiz*/
exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    await Quiz.updateOne({ _id: id }, { $set: req.body });
   return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

/*Delete Quiz By Id */
exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let quizExist = await Quiz.findOne({ _id: id }).exec();

    if (!quizExist) {
      return res.status(404).json({ message: "Not Found" });
    }

    await Quiz.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Quiz Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/////////////////////////////////////////Mobile////////////////////////////////////////////////////////////////


exports.quizDetail = async (req,res)=>{
  try{
    const {meetingId, password} = req.body;
    let quiz = await Quiz.findOne({ meetingId:meetingId,password:password}).exec();
    if(quiz== null){
      return sendResponse(res, false, "invalid credentails", 400, {});
    }
    
    else {
      if(quiz.status=="available"){
        return sendResponse(res, true, "available", 200, {quiz});
      }
      else{
        return sendResponse(res, false, "expired", 400, {});
      }
      
    }
    
  }
  catch(err){
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
}
