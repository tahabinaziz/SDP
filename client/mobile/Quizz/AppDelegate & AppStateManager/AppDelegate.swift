//
//  AppDelegate.swift
//  Quizz
//
//  Created by Ahmed Shahid on 31/05/2021.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
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

