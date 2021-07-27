//
//  QuizDetailController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 25/07/2021.
//

import UIKit
import SwiftyJSON

class QuizDetailController: UIViewController {
    @IBOutlet weak var textfieldEmailAddress: UITextField!
    @IBOutlet weak var labelQuizTitle: UILabel!
    @IBOutlet weak var labelQuizDuration: UILabel!
    
    @IBOutlet weak var labelQuizDueDate: UILabel!
    
    var quiz: Quiz? = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.populateData()
        // Do any additional setup after loading the view.
    }
    
    // MARK: HELPER METHOD
    
    func populateData() {
        self.labelQuizTitle.text = self.quiz?.title ?? ""
        self.labelQuizDueDate.text = self.quiz?.date ?? ""
        self.labelQuizDuration.text = self.quiz?.duration ?? ""
    }
    
    func validateEmail() -> Bool {
        if self.textfieldEmailAddress.text?.isEmpty ?? true {
            Utility.main.showToast(message: "Please enter your email address")
            return false
        } else if !(Validation.isValidEmail(self.textfieldEmailAddress.text)) {
            Utility.main.showToast(message: "Please enter valid email address")
            return false
        } else if (!(self.quiz?.emailRegex?.isEmpty ?? true)) {
            if !(self.textfieldEmailAddress.text ?? "").contains(self.quiz?.emailRegex ?? "") {
                Utility.main.showToast(message: "Provided email address is not allowed to take this quiz. Please retry. If you think your email address is correct, please contact your instructor.")
                return false
            }
            
        }
        
        return true
    }
    
    func showWarning() {
        Utility.main.showAlert(message: "Once you start your quiz, you will not be able to re-attempt it. You will not be able to view the previous question. \n\n Are you sure want to start the quiz?", title: "Warning", controller: self, firstButtonText: "YES", secondButtonText: "NO") { yesBtn, noBtn in
            if yesBtn != nil {
                // start quiz
                self.getQuestions()
            }
        }
    }
    
    func navigateToMainQuizScreen(with questions: Questions?) {
        if let controller = AppStoryboard.Main.instance.instantiateViewController(identifier: "MainQuizController") as? MainQuizController {
            controller.quiz = self.quiz
            controller.questions = questions
            controller.userEmail = self.textfieldEmailAddress.text
            self.navigationController?.pushViewController(controller, animated: true)
        }
    }
    
    // MARK: IB ACTION
    @IBAction func actionSubmit(_ sender: Any) {
        if validateEmail() {
            self.showWarning()
            
        }
        
    }
    
    // MARK:
    func getQuestions() {
        let param = [
            "meetingId" : self.quiz?.meetingId ?? ""
        ]
        Utility.main.showLoader()
        APIClient.callAPI(request: .getQuestions(param: param)) { response in
            do {
                let json = try JSON(data: response as! Data)
                let questionsData = try JSONDecoder().decode([Questions].self, from: json["questions"].rawData())
                print(questionsData)
                self.navigateToMainQuizScreen(with: questionsData.first)
            } catch let error {
                Utility.main.showToast(message: error.localizedDescription)
            }
            Utility.main.hideLoader()
        } onFailure: { error in
            Utility.main.showToast(message: error.errorMsg ?? "")
        }

    }
    
}
