import axios from "axios";
export const QuestionEndpoints ={
  createQuestion : "/api/question/",
  
}
export const BASE_URL = "http://localhost:5000";

export const craeteQuestion = (question) => {
  return axios.post(`${BASE_URL}${QuestionEndpoints.createQuestion}`, question).then(res=>{
      console.log(res)
  }).catch(err=>{
      console.log(err)
  })
};


