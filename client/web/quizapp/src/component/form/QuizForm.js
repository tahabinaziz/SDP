import { useState } from "react";
import { useHistory } from "react-router-dom";
import { craeteQuiz } from "../../api/quiz";
import moment from "moment";
const QuizForm = () => {
  let history = useHistory();
  const [checkbox, setCheckbox] = useState(false);
  const id = Math.random().toString(36).substring(7);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    emailRegex: "",
    meetingId: id,
    password: "",
    date: "",
    duration: "",

  });

  let {
    emailRegex,
    password,
    title,
    description,
    duration,
    date,
    meetingId,

  } = quiz;
  const onInputChange = (e) => {
    setQuiz({ ...quiz,  [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await craeteQuiz(quiz);
    history.push("/quiz");
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="meetingId">Meeting Id</label>
            <input
              type="text"
              className="form-control"
              id="meetingId"
              name="meetingId"
              value={meetingId}
              readOnly="readonly"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              name="password"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              name="date"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <label for="duration">Time Duration</label>
            <input
              type="text"
              placeholder="00:00:00"
              step="1"
              id="duration"
              name="duration"
              className="form-control"
             
              value={duration}
              onChange={(e) => onInputChange(e)}
             
              required
            />
          </div>
         
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label for="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Course, subject, survey"
              value={title}
              name="title"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-8">
            <label for="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Detail of quiz"
              value={description}
              name="description"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

      
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default QuizForm;
