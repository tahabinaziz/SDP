import { Link, NavLink } from "react-router-dom";
import { React } from "react";
const SideNavbar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <a className="nav-link" href="#">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <NavLink className="nav-link" exact to="/dashboard">Dashboard</NavLink>  
            </a>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              
              
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              
              <NavLink className="nav-link" exact to="/quiz"> Quiz</NavLink>
            
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" exact to="/addQuiz">
                  Add Quiz
                </NavLink>
                <NavLink className="nav-link" exact to="/viewQuiz">
                  View Quiz
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          user
        </div>
      </nav>
    </div>
  );
};
export default SideNavbar;
