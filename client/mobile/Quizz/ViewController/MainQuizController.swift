//
//  MainQuizController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 25/07/2021.
//

import UIKit

class MainQuizController: UIViewController {

    @IBOutlet weak var labelTime: UILabel!
    @IBOutlet weak var tableview: UITableView!
    
    var quiz: Quiz? = nil
    var questions: Questions? = nil
    
    var type: Int = 2 // 0 for textfield, 1 for checkbox and 2 for radio button
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func actionNextBtn(_ sender: Any) {
    }
    
}

// MARK: UItableView Datasource & Delegate

extension MainQuizController: UITableViewDataSource, UITableViewDelegate {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return 1
        } else {
            return 4
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.section == 0 {
            guard let cell = tableview.dequeueReusableCell(withIdentifier: "QuestionCell") as? QuestionCell else { return UITableViewCell() }
            cell.labelQuestion.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            return cell
        } else {
            if type == 0 {
                guard let cell = tableview.dequeueReusableCell(withIdentifier: "answerTextfieldCell") as? answerTextfieldCell else { return UITableViewCell() }
                
                return cell
            } else if type == 1 {
                guard let cell = tableview.dequeueReusableCell(withIdentifier: "answerCheckBoxCell") as? answerCheckBoxCell else { return UITableViewCell() }
                
                return cell
            } else {
                guard let cell = tableview.dequeueReusableCell(withIdentifier: "answerRadioBtnCell") as? answerRadioBtnCell else { return UITableViewCell() }
                
                return cell
            }
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableview.deselectRow(at: indexPath, animated: true)
    }
    
}
