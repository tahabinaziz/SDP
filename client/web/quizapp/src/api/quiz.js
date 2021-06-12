import axios from "axios";
export const QuizEndpoints ={
  createQuiz : "/api/quiz",
  getQuiz : "/api/quiz"
}
export const BASE_URL = "http://localhost:5000";

export const craeteQuiz = (quiz) => {
  return axios.post(`${BASE_URL}${QuizEndpoints.createQuiz}`, quiz)
};

export const getQuiz = () => {
    return axios.post(`${BASE_URL}${QuizEndpoints.getQuiz}`)
  };

