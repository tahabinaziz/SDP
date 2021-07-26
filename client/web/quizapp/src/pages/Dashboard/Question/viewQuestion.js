import { React } from "react";
// import Cards from "../../../component/dashboard/Cards";
import Footer from "../../../component/dashboard/Footer";
import Navbar from "../../../component/dashboard/Navbar";
import SideNavbar from "../../../component/dashboard/SideNavbar";
import QuestionTable from "../../../component/dashboard/QuestionTable";
import QuestionModal from '../../../component/dashboard/QuestionModal'

const ViewQuiz = (props) => {
  return (
    <div>
      <Navbar {...props} />
      <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <h1 class="mt-4">View Question</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">View Question List</li>
              </ol>
              {/* <Cards /> */}
              <QuestionModal />
              <QuestionTable />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewQuiz;
