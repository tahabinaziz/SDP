import { useState, useEffect } from "react";
import Modal from "../dashboard/Modal";
import moment, { duration } from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { getQuiz } from "../../api/quiz";

const QuizTable = () => {
  let history = useHistory();
  const [quiz, setQuiz] = useState([]);
  const [disp, setDisp] = useState(false);
  const [data, setData] = useState({});
  //const [difference, setDifference] = useState();

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    console.log("hello");
    // let result = await getQuiz()
    const result = await axios.get(`http://localhost:5000/api/quiz/`);
    setQuiz(result.data.data.quiz);
    console.log(result.data.data.quiz);
  };


  // const { date, startTime, endTime, } = data;
  // const start = `${date} ${startTime}`;
  // const end = `${date} ${endTime}`;
  // const difference = moment
  //   .utc(moment(end).diff(moment(start)))
  //   .format("HH:mm:ss");

  const onInputChange = (e) => {
    setData({ ...data,[e.target.name]: e.target.value });
  };

  const loadQuiz=(value)=>{

    setDisp(false)
    if(value==true){
      loadData()
    }
  }
  const deleteRecord= async(id)=>{
await axios.delete(`http://localhost:5000/api/quiz/${id}`);
loadData();

  }
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table mr-1"></i>
          DataTable Example
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
                  <th>Title</th>
                  <th>Meeting Id</th>
                  <th>Password</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {quiz.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.meetingId}</td>
                      <td>{item.password}</td>
                      <td>{item.date}</td>
                      <td>{item.duration}</td>

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
        </div>
      </div>
      {data && disp && (
        <Modal display={disp} onCloseModal={() => setDisp(false)} data={data} loadQuiz={loadQuiz}>
          <label for="Title">Title</label>
          <input
            type="text"
            class="form-control"
            id="Title"
            name="title"
            value={data.title}
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
          <label for="password">Password</label>
          <input
            type="text"
            class="form-control"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => onInputChange(e)}
          />
          <label for="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={data.date}
            name="date"
            onChange={(e) => onInputChange(e)}
          />


          <label for="duration">Duration</label>
          <input
            type="text"
            id="duration"
             
            name="duration"
            className="form-control"
            value={data.duration}
            onChange={(e) => onInputChange(e)}
            required
          />

          <label for="status">Status</label>
          <select
            class="form-control"
            id="status"
            aria-label="Default select example"
            onChange={(e) => onInputChange(e)}
            name="status"
          >
            <option selected>{data.status}</option>
            <option value="available">available</option>
            <option value="expire">expire</option>
          </select>
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
            value={data.description}
            onChange={(e) => onInputChange(e)}
          ></textarea>
        </Modal>
      )}
    </div>
  );
};
export default QuizTable;
