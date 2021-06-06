
import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import Login from "../../pages/Login/login";
import { AppRoutes } from "./routes";

const AppRouter = () => {
    return (
      <Switch>
       
        <Route path={AppRoutes.Login} exact component={Login}></Route>
        <Route path={AppRoutes.Dashboard} exact component={Dashboard}></Route>
        
       
      </Switch>
    );
  };
  
  export default AppRouter;
  