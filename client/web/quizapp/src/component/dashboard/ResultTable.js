import { useState, useEffect } from "react";
import QuestionModal from "../dashboard/QuestionModal";
import moment, { duration } from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { getQuiz } from "../../api/quiz";

const QuizTable = (props) => {
  let history = useHistory();
  const [meet, setMeet]= useState({meetingId:''});
  const [quiz, setQuiz] = useState([]);


  let {meetingId } = meet;
  console.log(meetingId)

  useEffect(() => {
    loadData();
  }, [meetingId]);
  const loadData = async () => {
    console.log("hello");
    // let result = await getQuiz()
    const result = await axios.get(`http://localhost:5000/api/answer/?meetingId=${meetingId}`);
    setQuiz(result.data.data.results);
    console.log(result.data.data.results);
  };

  const onInputChangeM = (e) => {
    setMeet({ ...meet,  [e.target.name]: e.target.value });
  };


  const onSubmit=()=>{
    let x = document.getElementById("button");
    let y = document.getElementById("meetingId");
    if (x.style.display === "none" && y.style.display) {
      x.style.display = "block";
      y.style.display = "block";
  } else {
      x.style.display = "none";
      y.style.display = "none";
  }

  window.print();
  x.style.display = "block";
  y.style.display = "block";
}

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table mr-1"></i>
          Result
        </div>
        <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
           
            <input
              type="text"
              className="form-control mt-4"
              id="meetingId"
              value={meetingId}
             placeholder="Meeting Id"
              onChange={(e) => onInputChangeM(e)}
              name="meetingId"
            />
            </div>
            <div className="col-md-4">
            </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  
                  <th>Meeting Id</th>
                  <th>Title</th>
                  <th>Email</th>
                  <th>Total Question</th>
                  <th>Correct Answer</th>
                  <th>Percentage</th>
                 
                </tr>
              </thead>

              <tbody>
                {quiz.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.meetingId}</td>
                      <td>{item.title}</td>
                      <td>{item.email}</td>
                      <td>{item.totalQuestion}</td>
                      <td>{item.correctAnswer}</td>
                      <td>{item.percentage+'%'} </td>

                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
           id="button"
           className="btn btn-success position"
           onClick={onSubmit}
         >
           Submit
         </button>
        </div>
      </div>
    </div>
  );
};
export default QuizTable;
