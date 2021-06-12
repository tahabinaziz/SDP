const Quiz = require("./model");
const sendResponse = require("../../utiles/common");
/////////////////////////////////////////////////////Course/////////////////////////////////////////////

exports.get = async(req,res)=>{
    try{
  
      let quiz = await Quiz.find({}).exec();
       
        if(!quiz){
            res.status(404).json({
                message:"Not Found"
            })
        }
       // return sendResponse(res,true,"Created Successfully",{quiz})

       res.send(quiz)
    }
    catch(err){
   // return  sendResponse(res, false, "Post Error" + err, {});
   res.status(500).send(err);
  
  }
}

/*Create Quiz*/
exports.create = async (req, res) => {
    try {
      let { meetingId,password,title,description,duration,emailRegex,dueDate } = req.body;
      if (!meetingId || !password || !title) {
        return res.status(400).json({ message: "Field Empty" });
      }
  
      const addQuiz = new Quiz({ meetingId, password,title,description,duration,duration,emailRegex,dueDate });
      let insertQuiz = await addQuiz.save();
      res.json(insertQuiz);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  ////////////////////////////////////////////////////////*Edit Course*////////////////////////
/*Update Quiz*/  
exports.update = async(req,res)=>{
    try{
      
      let id = req.params.id;
      await Quiz.updateOne({ _id: id }, { $set: req.body });
      res.status(200).json({
        message:"Updated successfully"
      })
    }
    catch(err){
      return res.status(500).json({
          error:err.message
      })
    }
}

/*Delete Quiz By Id */
exports.delete = async (req, res) => {
    try {
      let id = req.params.id;
      let quizExist = await Quiz.findOne({ _id: id }).exec();
  
      if (!quizExist) {
        res.status(404).json({ message: "Not Found" });
      }
      
      await Quiz.deleteOne({ _id: id }).exec();
      res.status(200).json({ message: "Quiz Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  



