import { useState, useEffect } from "react";
import QuestionModal from "../dashboard/QuestionModal";
import moment, { duration } from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { getQuiz } from "../../api/quiz";

const QuizTable = () => {
  let history = useHistory();
  const [meet, setMeet]= useState({meetingId:''});
  const [quiz, setQuiz] = useState([]);
  const [disp, setDisp] = useState(false);
  const [data, setData] = useState({});
  //const [difference, setDifference] = useState();

  let {meetingId } = meet;
  console.log(meetingId)

  useEffect(() => {
    loadData();
  }, [meetingId]);
  const loadData = async () => {
    console.log("hello");
    // let result = await getQuiz()
    const result = await axios.get(`http://localhost:5000/api/question/table/?meetingId=${meetingId}`);
    setQuiz(result.data.data.questions);
    console.log(result.data.data.questions);
  };

  const onInputChangeM = (e) => {
    setMeet({ ...meet,  [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setData({ ...data,[e.target.name]: e.target.value });
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
  const loadQuiz=(value)=>{

    setDisp(false)
    if(value==true){
      loadData()
    }
  }
  const deleteRecord= async(id)=>{
    console.log(id)
await axios.delete(`http://localhost:5000/api/question/${id}`);
loadData();

  }
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table mr-1"></i>
          Questions
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
                  <th>Q.No</th>
                  <th>Meeting Id</th>
                  <th>Question</th>
                  <th>Type</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {quiz.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.qNumber}</td>
                      <td>{item.meetingId}</td>
                      <td>{item.question}</td>
                      <td>{item.questionType}</td>
                      <td>{item.answer}</td>

                      <td>
                        <ul className="list-inline m-0">
                          <li className="list-inline-item"></li>
                          <li className="list-inline-item">
                            <button
                              className="btn btn-success btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              onClick={() => {
                                setDisp(item);
                                setData(item);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </li>
                          <li className="list-inline-item">
                            <button
                              className="btn btn-danger btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              onClick={()=>{deleteRecord(item._id)}}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </li>
                        </ul>
                      </td>
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
      {data && disp && (
        <QuestionModal display={disp} onCloseModal={() => setDisp(false)} data={data} loadQuiz={loadQuiz}>
          <label for="Title">Title</label>
          <input
            type="text"
            class="form-control"
            id="Title"
            readOnly
            name="qNumber"
            value={data.qNumber}
            onChange={(e) => onInputChange(e)}
          />
          <label for="meetingId">Meeting Id</label>
          <input
            type="text"
            class="form-control"
            id="MeetingId"
            name="meetingId"
            readOnly="readonly"
            value={data.meetingId}
          />
          <label for="password">Question</label>
          <input
            type="text"
            class="form-control"
            id="question"
            name="question"
            value={data.question}
            onChange={(e) => onInputChange(e)}
          />
          <label for="date">Type</label>
          <input
            type="text"
            readOnly
            className="form-control"
            id="answerType"
            value={data.questionType}
            name="answerType"
            onChange={(e) => onInputChange(e)}
          />


          <label for="duration">Answer</label>
          <input
            type="text"
            id="duration"
             
            name="answer"
            className="form-control"
            value={data.answer}
            onChange={(e) => onInputChange(e)}
            required
          />

         
        </QuestionModal>
      )}
    </div>
  );
};
export default QuizTable;
