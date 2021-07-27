//
//  MainQuizController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 25/07/2021.
//

import UIKit

struct Answers {
    var quest_id : Int?
    var answer : String?
}

class MainQuizController: UIViewController {

    @IBOutlet weak var labelTime: UILabel!
    @IBOutlet weak var tableview: UITableView!
    
    @IBOutlet weak var labelTotalCount: UILabel!
    
    var userEmail: String? = nil
    
    var quiz: Quiz? = nil
    var questions: Questions? = nil
    
    var type: Int = 2 // 0 for textfield, 1 for checkbox and 2 for radio button
    
    var timer: Timer?
    var totalTime = 0
    
    var questionSelectedIndex: Int = 0
    
    var textfieldAnswers: UITextField? = nil
    
    var answers: [Answers]? = [Answers]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.startOtpTimer()
        self.updateTotalCount()
        self.totalTime = self.getSecondsFromDuration(duration: self.quiz?.duration ?? "")
        
        
        // Do any additional setup after loading the view.
    }
    
    func updateTotalCount() {
        self.labelTotalCount.text = "\(self.questionSelectedIndex + 1) / \(self.questions?.questionData?.count ?? 1)"
    }
    
    func getSecondsFromDuration(duration: String) -> Int {
        let array = duration.split(separator: ":")
        if array.count == 3 {
            let hour: Int = Int(array[0]) ?? 0
            let min: Int = Int(array[1]) ?? 0
            let sec: Int = Int(array[2]) ?? 0
            
            return (hour * 60 * 60) + (min * 60) + (sec)
        } else {
            return 0
        }
    }
    
    @IBAction func actionNextBtn(_ sender: Any) {
        if self.questions?.questionData?.count ?? 0 > self.questionSelectedIndex + 1 {
            
            if (self.questions?.questionData?[self.questionSelectedIndex].questionType == "Blank") {
                self.answers?.append(Answers(quest_id: self.questions?.questionData?[self.questionSelectedIndex].qNumber, answer: self.textfieldAnswers?.text))
                self.textfieldAnswers = nil
            }
            
            self.questionSelectedIndex = self.questionSelectedIndex + 1
            self.updateTotalCount()
            self.tableview.reloadData()
            if (self.questions?.questionData?.count ?? 0) - 1 == self.questionSelectedIndex {
                if let button = sender as? UIButton {
                    button.setTitle("Submit", for: .normal)
                }
            }
        } else {
            print("Submit the answers now")
            self.submitAnswer()
        }
        
    }
        
    private func startOtpTimer() {
        self.totalTime = 60
        self.timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        print(self.totalTime)
        self.labelTime.text = self.timeFormatted(self.totalTime) // will show timer
        if totalTime != 0 {
            totalTime -= 1  // decrease counter timer
        } else {
            if let timer = self.timer {
                timer.invalidate()
                self.timer = nil
                print("timer close")
            }
        }
    }
    
    @objc func answerPressed(_ sender: UIButton) {
        sender.isSelected = true
        self.answers?.append(Answers(quest_id: self.questions?.questionData?[self.questionSelectedIndex].qNumber, answer: self.questions?.questionData?[self.questionSelectedIndex].option?[sender.tag]))
        self.tableview.reloadSections([1], with: .none)
    }
    
    func timeFormatted(_ totalSeconds: Int) -> String {
        let seconds: Int = totalSeconds % 60
        let minutes: Int = (totalSeconds / 60) % 60
        return String(format: "%02d:%02d", minutes, seconds)
    }
    
//    func getNoOfRowsAccordingToQuestion() -> Int {
//        let questionType = self.questions?.questionData?[self.questionSelectedIndex].questionType
//        if questionType == "T/F" {
//
//        }
//    }
    
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
            let questionData = self.questions?.questionData?[self.questionSelectedIndex]
            if questionData?.questionType == "Blank" {
                return 1
            } else {
                return questionData?.option?.count ?? 0
            }
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if indexPath.section == 0 {
            guard let cell = tableview.dequeueReusableCell(withIdentifier: "QuestionCell") as? QuestionCell else { return UITableViewCell() }
            cell.labelQuestion.text = self.questions?.questionData?[self.questionSelectedIndex].question
            return cell
        } else {
            let questionData = self.questions?.questionData?[self.questionSelectedIndex]
            if questionData?.questionType == "Blank" {
                guard let cell = tableview.dequeueReusableCell(withIdentifier: "answerTextfieldCell") as? answerTextfieldCell else { return UITableViewCell() }
                self.textfieldAnswers = cell.textfieldAnswer
                return cell
            } else if questionData?.questionType == "T/F" || questionData?.questionType ==                "MCQS" {
            guard let cell = tableview.dequeueReusableCell(withIdentifier: "answerRadioBtnCell") as? answerRadioBtnCell else { return UITableViewCell() }
                var yeahAnswerHai = false
                for answer in self.answers! {
                    if answer.answer == questionData?.option?[indexPath.row] {
                        yeahAnswerHai = true
                    }
                }
                if (yeahAnswerHai) {
                    cell.btnTitle.isSelected = true
                } else {
                    cell.btnTitle.isSelected = false
                }
                
            cell.btnTitle.setTitle(self.questions?.questionData?[self.questionSelectedIndex].option?[indexPath.row], for: .normal)
                cell.tag = indexPath.row
                cell.btnTitle.addTarget(self, action: #selector(self.answerPressed(_:)), for: .touchUpInside)
            return cell
            } else {
                return UITableViewCell()
            }
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableview.deselectRow(at: indexPath, animated: true)
    }
    
    func submitAnswer() {
        
        Utility.main.showAlert(message: "Yout quiz has been submited", title: "Quiz Submitted", controller: self) {
            self.navigationController?.popToRootViewController(animated: true)
        }
        
//        var answerArray: [[String:Any]] = [[String:Any]]()
//        for answer in self.answers! {
//            answerArray.append([
//                "qNumber" : answer.quest_id ?? 0,
//                "answer" : answer.answer ?? ""
//            ])
//        }
//        var param: [String:Any] = [
//            "email" : self.userEmail ?? "",
//            "result1" : answerArray
//        ]
//
//        APIClient.callAPI(request: ., onSuccess: <#T##((Any) -> Void)?##((Any) -> Void)?##(Any) -> Void#>, onFailure: <#T##((CustomError) -> Void)?##((CustomError) -> Void)?##(CustomError) -> Void#>)
        
    /*
         {
             "email": "taha",

             "result1":[
                 {
                     "qNumber": 8442,
                     "answer": "Isalamabad"
                 },
                 {
                     "qNumber": 8333,
                     "answer": "4"
                 },
                 {
                     "qNumber": 9833,
                     "answer": "L"
                 }
             ]
         }
         */
    }
    
}
