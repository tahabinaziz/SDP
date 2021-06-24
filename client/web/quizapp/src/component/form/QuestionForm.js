import { useState } from "react";
import "../../index.css";
import { MCQ, TF, BLANK } from "../../Constant/constant";
import {craeteQuestion} from "../../api/question";
import { useHistory } from "react-router-dom";
const QuestionForm = () => {
  let history = useHistory();
  const defaultArray = [
    {
      question: "",
      questionType: "",
      answer: "",
      option: [],
    },
  ];

  const [radio, setRadio] = useState([]);
  const [meeting, setMeeting] = useState({ meetingId: "" });
  let { meetingId } = meeting;
  const [questionData, setQuestion] = useState(defaultArray);
 
  const onInputMeeting = (e) => {
    e.preventDefault();
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const onInputChange = (e, index, ind) => {
    e.preventDefault();
    setQuestion(
      [...questionData].map((object, i) => {
        if (i === index) {
          object.option[ind] = e.target.value;
          return object;
        } else return object;
      })
    );
  };

  const optArr = [
    {
      value: "t/f",
      option: ["T", "F"],
    },
    {
      value: "mcqs",
      option: ["", "", "", ""],
    },
    {
      value: "blank",
      option: [""],
    },
  ];
  const OnChnageOption = (value, id, index) => {
    console.log(value, id, "checkvalues");
    const findIndex = radio.filter((i) => i.id !== id);
    findIndex.push({ id, value });
    setRadio(findIndex);
    const temp = questionData;
    temp[id].option = optArr[index].option;
    temp[id].questionType = value.toUpperCase();
    setQuestion(temp);
  };

  const addRow = () => {
    setQuestion((prev) => [
      ...prev,
      { question: "", questionType: "", answer: "" },
    ]);
  };
  const removeRow = (index) => {
    const list = [...questionData];
    list.splice(index, 1);
    setQuestion(list);
  };
  // console.log(questionData, "hello");

  const onSumbit = async (e) => {
    e.preventDefault();
    const data = {meetingId:meeting.meetingId,questionData}
  
    console.log(data,"DATA")  
    console.log(questionData,"questions")
     await craeteQuestion(data)
     history.push("/viewQuestion");
  // return  axios.post(`http://localhost:5000/api/question/`, questions)
  };

  const getLables = (option, index) => {
    if (option === 4) {
      return MCQ[index];
    } else if (option === 2) {
      return TF[index];
    } else if (option === 1) {
      return BLANK[index];
    }
  };
  return (
    <div>
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
          {questionData.map((item, index) => {
            const mcqs =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "mcqs");
            const tf =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "t/f");
            const blank =
              radio.length > 0 &&
              radio.find((i) => i.id === index && i.value === "blank");
            return (
              <div className="jumbotron" key={index}>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="t/f"
                    value="t/f"
                    checked={tf}
                    onChange={() => OnChnageOption("t/f", index, 0)}
                  />
                  <label class="form-check-label" for="t/f">
                    T/F
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="mcqs"
                    value="mcqs"
                    checked={mcqs}
                    onChange={() => OnChnageOption("mcqs", index, 1)}
                  />
                  <label class="form-check-label" for="mcqs">
                    MCQ'S
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="blank"
                    value="blank"
                    checked={blank}
                    onChange={() => OnChnageOption("blank", index, 2)}
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
                      onChange={(e) => {
                        setQuestion(
                          [...questionData].map((object, i) => {
                            if (i === index) {
                              return { ...object, question: e.target.value };
                            } else return object;
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        setQuestion(
                          [...questionData].map((object, i) => {
                            if (i === index) {
                              return { ...object, answer: e.target.value };
                            } else return object;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  {item?.option?.map((i, ind) => (
                    <div key={ind} className="form-group col-md-3">
                      <label for="t">
                        {getLables(item.option.length, ind)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="t"
                        name="formOption"
                        value={i}
                        onChange={(e) => onInputChange(e, index, ind)}
                      />
                    </div>
                  ))}
                </div>

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
      <button
           
            className="btn btn-success position"
            onClick={onSumbit}
          >
            Submit
          </button>
    </div>
  );
};
export default QuestionForm;
