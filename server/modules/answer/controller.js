const Answer = require("./model");
const sendResponse = require("../../utiles/common").sendResponse;

/*Get Data from Question For Comparision */
exports.answer = async (req,res)=>{
    try{
      const { meetingId } = req.query;
      let answer = await Answer.find({ meetingId: meetingId });
    
      return res.json(answer);
    }
    catch(err){
      return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
    }
  }
  


  exports.postAnswer =async(req,res)=>{
    try {
        const { meetingId,email, qNumber,answer } = req.query;
       
        const getAnswer = await Answer.find({meetingId:meetingId});
        
            req.body.map(a=>{
              
                return{
                    qNumber:a.qNumber,
                    answer:a.answer
                }
            })
        

        
        if (getAnswer == null) {
          return sendResponse(res, true, "Not Found Question", 404, {});
        } else {
          return sendResponse(res, true, "Ok", 200, { as:"answer1" });
        }
      } catch (err) {
        return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
      }
  }