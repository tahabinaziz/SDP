import {useState} from 'react'
import { useHistory } from "react-router-dom";
import {craeteQuiz} from '../../api/quiz';
const QuizForm = () => {
  let history = useHistory();
 const [checkbox, setCheckbox] = useState(false)
 const [quiz,setQuiz] = useState({
title:"",
description:"",
emailRegex:"",
meetingId:"",
password:"",
dueDate:""
 })
 

const {emailRegex,meetingId,password,title,description,duration,dueDate}=quiz;
const onInputChange = e => {
  setQuiz({ ...quiz, [e.target.name]: e.target.value });
};

const onSubmit = async e => {
  e.preventDefault();
  await craeteQuiz(quiz)
  history.push("/quiz")
}
  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="meetingId">Meeting Id</label>
          <input type="text" class="form-control" id="meetingId"
           name="meetingId"
           value={meetingId}
           onChange={e => onInputChange(e)} />
        </div>
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password"
           value={password}
            onChange={e => onInputChange(e)}
            name="password"
            />
        
        </div>
      </div>
      <div class="form-row">
      <div class="form-group col-md-6">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            class="form-control"
            id="dueDate"
            placeholder="Course, subject, survey"
            value={dueDate}
            name="dueDate"
            onChange={e => onInputChange(e)}
          />
        </div> 

        <div class="form-group col-md-6">
          <label for="duration">Duration</label>
          {/* <input type="time" class="form-control" id="duration" value={duration} onChange={e => onInputChange(e)}/> */}
          <input type="time" id="appt" name="appt"  class="form-control"  value={duration} onChange={e => onInputChange(e)}
       min="09:00" max="18:00" required/>
        </div>
      </div>
      <div class="form-row">
      <div class="form-group col-md-4">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Course, subject, survey"
            value={title}
            name="title"
            onChange={e => onInputChange(e)}
          />
        </div>
        <div class="form-group col-md-8">
          <label for="description">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder="Detail of quiz"
            value={description}
            name="description"
            onChange={e => onInputChange(e)}
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" name="emailRegex" checked={checkbox} onChange={e=>{
              setCheckbox(e.target.checked);
          }}/>
          <label class="form-check-label" for="gridCheck">
            Email Validation
          </label>
        </div>
      </div>
      {
          checkbox?(
            <div class="form-group col-md-10">
            <input
              type="text"
              class="form-control"
              name="emailRegex"
              id="description"
              placeholder="Email Regex"
              value={emailRegex}
              onChange={e => onInputChange(e)}
            />
          </div>
          ):null
      }
      </div>
      <button type="submit" class="btn btn-primary">
        Sign in
      </button>

      </form>
    </div>
  );
};
export default QuizForm;
