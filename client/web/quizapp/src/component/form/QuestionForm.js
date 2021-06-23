import { useEffect, useState } from "react";
import "../../index.css";
const QuestionForm = () => {
  const defaultArray = [
    {
      question: "",
      questionType: "",
      answer: "",
    },
  ];
  const [radio, setRadio] = useState([]);
  const [meeting, setMeeting] = useState({ meetingId: "" });
  let { meetingId } = meeting;
  const [questions, setQuestion] = useState(defaultArray);
  const [option, setOption] = useState([]);

  const onInputMeeting = (e) => {
    e.preventDefault();
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const onInputChange = (e, index) => {
    e.preventDefault();
    questions[index][e.target.name] = e.target.value;
    setQuestion(questions);
  };

  const OnChnageOption = (value, id) => {
    const findIndex = radio.filter((i) => i.id !== id);
    findIndex.push({ id, value });
    setRadio(findIndex);
  };

  const addRow = () => {
    setQuestion((prev) => [
      ...prev,
      { question: "", questionType: "", answer: "" },
    ]);
  };
  const removeRow = (index) => {
    const list = [...questions];
    list.splice(index, 1);
    setQuestion(list);
  };
  console.log(radio, "checkradio");
  return (
    <div>
      {/* onSubmit={(e) => onSubmit(e)} */}
      <form>
        <div className="container">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label for="meetingId">Meeting Id</label>
              <input
                type="text"
                className="form-control"
                id="meetingId"
                name="meetingId"
                value={meetingId}
                onChange={(e) => onInputMeeting(e)}
              />
            </div>
          </div>
          {questions.map((item, index) => {
            const mcqs =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "mcqs");
            const tf =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "t/f");
            const blank =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "blank");
            console.log(radio, mcqs, tf, blank, "getmcqs");
            return (
              <div className="jumbotron" key={index}>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    // name={}
                    id="t/f"
                    value="t/f"
                    checked={tf}
                    onChange={() => OnChnageOption("t/f", index)}
                  />
                  <label class="form-check-label" for="t/f">
                    T/F
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    // name="inlineRadioOptions2"
                    id="mcqs"
                    value="mcqs"
                    checked={mcqs}
                    onChange={() => OnChnageOption("mcqs", index)}
                  />
                  <label class="form-check-label" for="mcqs">
                    MCQ'S
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    // name="inlineRadioOptions3"
                    id="blank"
                    value="blank"
                    checked={blank}
                    onChange={() => OnChnageOption("blank", index)}
                  />
                  <label class="form-check-label" for="blank">
                    Blank
                  </label>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-7">
                    <label for="question">Question</label>
                    <input
                      type="text"
                      className="form-control"
                      id="question"
                      data-id={index}
                      name="question"
                      value={item.question}
                      onChange={(e) => onInputChange(e, index)}
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <label for="answer">Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      id="answer"
                      name="answer"
                      data-id={index}
                      value={item.answer}
                      onChange={(e) => onInputChange(e, index)}
                    />
                  </div>
                </div>

                {tf && (
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label for="t">A</label>
                      <input
                        type="text"
                        className="form-control"
                        id="t"
                        data-id={index}
                        name="t"
                        value="t"
                        //  onChange={(e) => onChangOption(e)}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label for="b">B</label>
                      <input
                        type="text"
                        className="form-control"
                        id="f"
                        name="f"
                        data-id={index}
                        value="f"
                        // onChange={(e) => onChangOption(e)}
                      />
                    </div>
                  </div>
                )}
                {mcqs && (
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label for="option1">A</label>
                      <input
                        type="text"
                        className="form-control"
                        id="option1"
                        data-id={index}
                        name="option1"
                        value={item.option1}
                        // onChange={(e) => onChangOption(e)}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label for="option2">B</label>
                      <input
                        type="text"
                        className="form-control"
                        id="option2"
                        name="option2"
                        data-id={index}
                        value={item.option2}
                        //onChange={(e) => onChangOption(e)}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label for="option3">C</label>
                      <input
                        type="text"
                        className="form-control"
                        id="option3"
                        name="option3"
                        data-id={index}
                        value={item.option3}
                        //  onChange={(e) => onChangOption(e)}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label for="option4">D</label>
                      <input
                        type="text"
                        className="form-control"
                        id="option4"
                        name="option4"
                        data-id={index}
                        value={item.option4}
                        // onChange={(e) => onChangOption(e)}
                      />
                    </div>
                  </div>
                )}

                {blank && (
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label for="blank">Blank</label>
                      <input
                        type="text"
                        className="form-control"
                        id="blank"
                        name="blank"
                        data-id={index}
                        // value={blank}
                        // onChange={(e) => onChangOption(e)}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addRow}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger space-between"
                  onClick={() => removeRow(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default QuestionForm;
