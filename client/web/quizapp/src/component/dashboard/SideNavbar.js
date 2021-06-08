import { Link, NavLink } from "react-router-dom";
import { React } from "react";
const SideNavbar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Core</div>
            <a class="nav-link" href="#">
              <div class="sb-nav-link-icon">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <NavLink className="nav-link" exact to="/dashboard">Dashboard</NavLink>  
            </a>
            <div class="sb-sidenav-menu-heading">Interface</div>
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon">
                <i class="fas fa-columns"></i>
              </div>
              <NavLink className="nav-link" exact to="/quiz"> Quiz</NavLink>
            
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" exact to="/question">
                  Question
                </NavLink>
                <NavLink className="nav-link" exact to="/result">
                  Result
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Logged in as:</div>
          user
        </div>
      </nav>
    </div>
  );
};
export default SideNavbar;
