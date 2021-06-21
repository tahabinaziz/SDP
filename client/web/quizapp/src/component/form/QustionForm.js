import { useState } from "react";
const QuestionForm = () => {
  const [radio, setRadio] = useState("");
  const [questions, setQuestion] = useState({
    meetingId: "",
    question: "",
    answer: "",
    option: [
      { a: "" },
      { b: "" },
      { c: "" },
      { d: "" },
    ],
  });
  let { answer, question, meetingId, option } = questions;


  const onInputChange = (e) => {
    e.preventDefault();
    setRadio(e.target.value);
    setQuestion({ ...questions, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* onSubmit={(e) => onSubmit(e)} */}
      <form>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="meetingId">Meeting Id</label>
            <input
              type="text"
              className="form-control"
              id="meetingId"
              name="meetingId"
              value={meetingId}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

        <div className="form-row">
          <div class="form-group">
            <div class="form-group form-check col-md-4">
              <input
                type="radio"
                class="form-check-input"
                id="t/f"
                name="question-input"
                value="t/f"
                onChange={(e) => onInputChange(e)}
              />
              <label class="form-check-label" for="t/f">
                T/F
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-group form-check col-md-4">
              <input
                type="radio"
                class="form-check-input"
                id="mcqs"
                name="question-input"
                value="mcqs"
                onChange={(e) => onInputChange(e)}
              />
              <label class="form-check-label" for="mcqs">
                MCQ'S
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-group form-check col-md-4">
              <input
                type="radio"
                class="form-check-input"
                id="blank"
                name="question-input"
                value="blank"
                onChange={(e) => onInputChange(e)}
              />
              <label class="form-check-label" for="blank">
                Blanks
              </label>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-7">
            <label for="question">Question</label>
            <input
              type="text"
              className="form-control"
              id="question"
              name="question"
              value={question}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-5">
            <label for="answer">Answer</label>
            <input
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              value={answer}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
      </form>
      {radio === "t/f" ? (
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="a">A</label>
            <input
              type="text"
              className="form-control"
              id="a"
              name="a"
              value="T"
              readOnly="readonly"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <label for="b">B</label>
            <input
              type="text"
              className="form-control"
              id="b"
              name="b"
              value="F"
              readOnly="readonly"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
      ) : radio === "mcqs" ? (
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="a">A</label>
            <input
              type="text"
              className="form-control"
              id="a"
              name="a"
              value={option.a}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <label for="b">B</label>
            <input
              type="text"
              className="form-control"
              id="b"
              name="b"
              value={option.b}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <label for="c">C</label>
            <input
              type="text"
              className="form-control"
              id="c"
              name="c"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <label for="d">D</label>
            <input
              type="text"
              className="form-control"
              id="d"
              name="d"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
      ) : radio === "blank" ? (
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="blank">Blank</label>
            <input
              type="text"
              className="form-control"
              id="blank"
              name="blank"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
      ) : null}
      
    </div>
  );
};
export default QuestionForm;
