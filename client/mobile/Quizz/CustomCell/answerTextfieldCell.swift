//
//  answerTextfieldCell.swift
//  Quizz
//
//  Created by Ahmed Shahid on 25/07/2021.
//

import UIKit

class answerTextfieldCell: UITableViewCell {

    @IBOutlet weak var textfieldAnswer: UITextField!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
