import React from "react";
import Footer from "../../../component/dashboard/Footer";
import Navbar from "../../../component/dashboard/Navbar";
import SideNavbar from "../../../component/dashboard/SideNavbar";
import QuizForm from "../../../component/form/QuizForm";

const AddQuiz = (props)=>{
    return(
        <div>
             <Navbar {...props}/>
      <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <h1 class="mt-4">Add Quiz</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Create Quiz Tab</li>
              </ol>
             <QuizForm/>
            
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
        
    )
}

export default AddQuiz;