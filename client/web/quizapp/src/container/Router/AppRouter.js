import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import Question from "../../pages/Dashboard/question";
import Quiz from "../../pages/Dashboard/quiz";
import Result from "../../pages/Dashboard/result";
import AddStudent from "../../pages/RegisterStudent/addStudent";
import ViewStudent from "../../pages/RegisterStudent/viewStudent";
import Login from "../../pages/Login/login";
import AddQuiz from "../../pages/Dashboard/Quiz/addQuiz";
import ViewQuiz from "../../pages/Dashboard/Quiz//viewQuiz";
import { ProtectedRoute } from "../Router/ProtectedRoutes";
import { AppRoutes } from "./routes";

const routing = [
  {
    appRoute: AppRoutes.Dashboard,
    component: Dashboard,
  },
  {
    appRoute: AppRoutes.AddQuiz,
    component: AddQuiz,
  },
  {
    appRoute: AppRoutes.ViewQuiz,
    component: ViewQuiz,
  },
  {
    appRoute: AppRoutes.Quiz,
    component: Quiz,
  },
  {
    appRoute: AppRoutes.Question,
    component: Question,
  },
  {
    appRoute: AppRoutes.Result,
    component: Result,
  },
  {
    appRoute: AppRoutes.AddStudent,
    component: AddStudent,
  },
  {
    appRoute: AppRoutes.ViewStudent,
    component: ViewStudent,
  },
  
];

const AppRouter = () => {
  return (
    <Switch>
      <Route path={AppRoutes.Login} exact component={Login}></Route>
      {routing.map((i) => {
        return (
          <ProtectedRoute path={i.appRoute} exact component={i.component} />
        );
      })}
    </Switch>
  );
};

export default AppRouter;
