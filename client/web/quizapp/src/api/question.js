import axios from "axios";
export const QuestionEndpoints ={
  createQuestion : "/api/question/",
  
}
export const BASE_URL = "https://quizapp-sdp.herokuapp.com/";

export const craeteQuestion = (question) => {
  return axios.post(`${BASE_URL}${QuestionEndpoints.createQuestion}`, question).then(res=>{
      console.log(res)
  }).catch(err=>{
      console.log(err)
  })
};


