const Course = require("./model");

/////////////////////////////////////////////////////Course/////////////////////////////////////////////

exports.get = async(req,res)=>{
    try{
        let category = await Course.find({}).exec();
       
        if(!category){
            res.status(404).json({
                message:"Not Found"
            })
        }
        
        return res.status(200).json(category)
    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

/*Create Course*/
exports.create = async (req, res) => {
    try {
      let { name,courseKey } = req.body;
      if (!name || !courseKey) {
        return res.status(400).json({ message: "Field Empty" });
      }
  
      const newCourse = new Course({ name, courseKey });
      let inserCourse = await newCourse.save();
      res.json(inserCourse);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  ////////////////////////////////////////////////////////*Edit Course*////////////////////////
/*Update Course*/  
exports.update = async(req,res)=>{
    try{
      
      let id = req.params.courseId;
      await Course.updateOne({ _id: id }, { $set: req.body });
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

/*Course Delete By Id */
exports.delete = async (req, res) => {
    try {
      let id = req.params.courseId;
      let courseExist = await Course.findOne({ _id: id }).exec();
  
      if (!courseExist) {
        res.status(404).json({ message: "Not Found" });
      }
      
      await Course.deleteOne({ _id: id }).exec();
      res.status(200).json({ message: "Course Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  



