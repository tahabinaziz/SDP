import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import Question from "../../pages/Dashboard/question";
import Quiz from "../../pages/Dashboard/quiz";
import Result from "../../pages/Dashboard/result";
import Login from "../../pages/Login/login";
import { ProtectedRoute } from "../Router/ProtectedRoutes";
import { AppRoutes } from "./routes";

const routing = [
  {
    appRoute: AppRoutes.Dashboard,
    component: Dashboard,
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
