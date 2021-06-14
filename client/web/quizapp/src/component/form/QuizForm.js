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
    startTime: "",
    endTime: "",
    duration: "",
  });

  let {
    emailRegex,
    password,
    title,
    description,
    startTime,
    endTime,
    date,
    meetingId,
    duration,
  } = quiz;
  const start = `${date} ${startTime}`;
  const end = `${date} ${endTime}`;
  let difference = moment
    .utc(moment(end).diff(moment(start)))
    .format("HH:mm:ss");

  const onInputChange = (e) => {
    setQuiz({ ...quiz, duration: difference, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await craeteQuiz(quiz);
    history.push("/quiz");
  };

  return (
    <div>
      {/* {console.log(start)} */}
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
            <label for="duration">Start Time</label>
            <input
              type="time"
              step="1"
              id="startTime"
              name="startTime"
              className="form-control"
              value={startTime}
              onChange={(e) => onInputChange(e)}
              min="09:00"
              max="18:00"
              required
            />
          </div>
          <div className="form-group col-md-3">
            <label for="duration">End Time</label>
            <input
              type="time"
              step="1"
              id="endTime"
              name="endTime"
              className="form-control"
              value={endTime}
              onChange={(e) => onInputChange(e)}
              min="09:00"
              max="18:00"
              required
            />
          </div>
          <div className="form-group col-md-3">
            <label for="duration">Duration</label>
            <input
              type="text"
              id="duration"
              readOnly="readonly"
              name="duration"
              className="form-control"
              value={difference}
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

        <div className="form-row">
          <div className="form-group col-md-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                name="emailRegex"
                checked={checkbox}
                onChange={(e) => {
                  setCheckbox(e.target.checked);
                }}
              />
              <label className="form-check-label" for="gridCheck">
                Email Validation
              </label>
            </div>
          </div>
          {checkbox ? (
            <div className="form-group col-md-10">
              <input
                type="text"
                className="form-control"
                name="emailRegex"
                id="description"
                placeholder="Email Regex"
                value={emailRegex}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};
export default QuizForm;
