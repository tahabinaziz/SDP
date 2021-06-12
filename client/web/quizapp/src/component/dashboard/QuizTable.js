import { useState, useEffect } from "react";
import Modal from "../dashboard/Modal";

import axios from "axios";
// import { getQuiz } from "../../api/quiz";

const QuizTable = () => {
  const [quiz, setQuiz] = useState([]);
  const [disp, setDisp] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    console.log("hello");
    // let result = await getQuiz()
    const result = await axios.get(`http://localhost:5000/api/quiz/`);
    setQuiz(result.data);
    console.log(result);
  };
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
                  <th>Duration</th>
                  <th>Due Date</th>
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
                      <td>{"2011/04/25"}</td>
                      <td>{item.dueDate}</td>

                      <td>
                        <ul className="list-inline m-0">
                          <li className="list-inline-item">
                           
                          </li>
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
        <Modal display={disp} onCloseModal={() => setDisp(false)} data={data}>
          <label for="Title">Title</label>
          <input
            type="text"
            class="form-control"
            id="Title"
            name="title"
            value={data.title}
          />
          <label for="meetingId">Meeting Id</label>
          <input
            type="text"
            class="form-control"
            id="MeetingId"
            name="meetingId"
            value={data.meetingId}
          />
          <label for="password">Password</label>
          <input
            type="text"
            class="form-control"
            id="password"
            name="password"
            value={data.password}
          />
          <label for="duration">Duration</label>
          <input
            type="text"
            class="form-control"
            id="duration"
            name="duration"
            value={data.duration}
          />
          <label for="meetingId">Due Date</label>
          <input
            type="text"
            class="form-control"
            id="meetingId"
            name="meetingId"
            value={data.dueDate}
          />
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            value={data.description}
          ></textarea>
        </Modal>
      )}
      <modal>abc</modal>
      <modal>def</modal>
    </div>
  );
};
export default QuizTable;
