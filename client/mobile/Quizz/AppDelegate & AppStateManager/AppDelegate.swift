//
//  AppDelegate.swift
//  Quizz
//
//  Created by Ahmed Shahid on 31/05/2021.
//

import UIKit
import IQKeyboardManagerSwift


@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        IQKeyboardManager.shared.enable = true
        
        // Override point for customization after application launch.
        return true
    }
    
    func setRootViewController() {
        let navigation = AppStoryboard.Main.instance.instantiateViewController(withIdentifier: "BaseNavigationController") as? UINavigationController
        navigation?.setNavigationBarHidden(true, animated: false)
        self.window?.rootViewController = nil;
        self.window?.rootViewController = navigation
    }

}

