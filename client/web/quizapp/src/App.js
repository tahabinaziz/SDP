import AppRouter from "./container/Router/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

const  App=()=> {
  return (
    <div className='app-wrapper'>
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
