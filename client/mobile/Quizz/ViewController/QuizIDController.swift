//
//  InfoController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 24/06/2021.
//

import UIKit

class QuizIDController: UIViewController {
    
    @IBOutlet weak var viewPasswordField: UIView!
    @IBOutlet weak var textfieldPassword: UITextField!
    @IBOutlet weak var textfieldQuizID: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    // MARK: IB ACTION
    
    @IBAction func actionSubmit(_ sender: Any) {
        if let button = sender as? UIButton {
            UIView.transition(with: button, duration: 0.4,
                              options: .transitionCrossDissolve,
                              animations: {
                                self.viewPasswordField.isHidden = !self.viewPasswordField.isHidden
                              })
        }
    }
    
}
