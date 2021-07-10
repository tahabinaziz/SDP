//
//  SplashController.swift
//  Quizz
//
//  Created by Ahmed Shahid on 23/06/2021.
//

import UIKit

class SplashController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Just delay for 3 seconds so users can experience splash screen properly.
        Utility.main.delay(0.3) {
            Constants.APP_DELEGATE.setRootViewController()
        }
        // Do any additional setup after loading the view.
    }

}
