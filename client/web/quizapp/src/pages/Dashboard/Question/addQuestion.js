import React from "react";
import Footer from "../../../component/dashboard/Footer";
import Navbar from "../../../component/dashboard/Navbar";
import SideNavbar from "../../../component/dashboard/SideNavbar";
import QuestionForm from "../../../component/form/QuestionForm";


const AddQuestion = (props)=>{
    return(
        <div>
             <Navbar {...props}/>
      <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <h1 class="mt-4">Add Question</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Create Question Tab</li>
              </ol>
             <QuestionForm />
            
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
        
    )
}

export default AddQuestion;