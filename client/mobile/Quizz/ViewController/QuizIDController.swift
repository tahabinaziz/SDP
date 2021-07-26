//
//  InfoController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 24/06/2021.
//

import UIKit
import SwiftyJSON

class QuizIDController: UIViewController {
    
    @IBOutlet weak var viewPasswordField: UIView!
    @IBOutlet weak var textfieldPassword: UITextField!
    @IBOutlet weak var textfieldQuizID: UITextField!
    
    private var isPasswordHide: Bool? = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    // MARK: HELPING METHODS
    func validateData(checkBoth: Bool) -> Bool {
        if checkBoth {
            if self.textfieldQuizID.text?.isEmpty ?? true {
                Utility.main.showToast(message: "Please enter Quiz ID")
                return false
            } else if self.textfieldPassword.text?.isEmpty ?? true {
                Utility.main.showToast(message: "Please enter your password")
                return false
            }
        } else {
            if self.textfieldQuizID.text?.isEmpty ?? true {
                Utility.main.showToast(message: "Please enter Quiz ID")
                return false
            }
        }
        return true
    }
    // MARK: IB ACTION
    
    @IBAction func actionSubmit(_ sender: Any) {
        if (isPasswordHide ?? true) {
            if self.validateData(checkBoth: !(self.isPasswordHide ?? false)) {
                if let button = sender as? UIButton {
                    UIView.transition(with: button, duration: 0.4,
                                      options: .transitionCrossDissolve,
                                      animations: {
                                        self.viewPasswordField.isHidden = false
                                        self.isPasswordHide = false
                                      })
                }
            }
        } else {
            if self.validateData(checkBoth: !(self.isPasswordHide ?? false)) {
                self.getQuizDetails()
            }
        }
    }
    
    func navigateToQuizDetailScreen(with quiz: Quiz) {
        if let controller = AppStoryboard.Main.instance.instantiateViewController(identifier: "QuizDetailController") as? QuizDetailController {
            controller.quiz = quiz
            self.navigationController?.pushViewController(controller, animated: true)
        }
    }
    
    // MARK: API CALLING
    
    func getQuizDetails() {
        let param = [
            "meetingId" : self.textfieldQuizID.text ?? "",
            "password" : self.textfieldPassword.text ?? ""
        ]
        Utility.main.showLoader()
        APIClient.callAPI(request: .quizDetail(param: param)) { response in
            do {
                let json = try JSON(data: response as! Data)
                let quiz = try JSONDecoder().decode(Quiz.self, from: json["quiz"].rawData())
                self.navigateToQuizDetailScreen(with: quiz)
            } catch let error {
                Utility.main.showToast(message: error.localizedDescription)
            }
            Utility.main.hideLoader()
        } onFailure: { error in
            Utility.main.showToast(message: error.errorMsg ?? "Something went wrong!")
            Utility.main.hideLoader()
        }
    }
}
