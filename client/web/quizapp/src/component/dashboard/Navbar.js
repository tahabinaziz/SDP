import { Link, NavLink } from "react-router-dom";
import { React } from "react";

const Navbar = (props) => {
  // console.log(JSON.parse(localStorage.getItem("user")).email)
  console.log(props)
  const handleLogout = () => {
   
    localStorage.clear();
    props.history.push("/");
   
  };
  return (
    <div>
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand" exact to="/dashboard">The Quiz App</NavLink>  

        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"></form>
        {/* <!-- Navbar--> */}


      <p className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" style={{color:"white"}}>{JSON.parse(localStorage.getItem("user")).email }</p> 
        
        <ul class="navbar-nav ml-auto ml-md-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="userDropdown"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user fa-fw"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a class="dropdown-item" href="#">
                Settings
              </a>
              <a class="dropdown-item" href="#">
                Activity Log
              </a>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
