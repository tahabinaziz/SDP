//
//  Validation.swift
//  Auditix
//
//  Created by TPL Corp Development Team on 1/4/18.
//  Copyright © 2019 TPL Corp. All rights reserved.
//

import Foundation
import UIKit
class Validation {
    
    static func isValidEmail(_ testStr:String?) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluate(with: testStr)
    }
    
    static  func isValidPhone(value: String) -> Bool {
        var result = false
        if value.count >= 12 {
            result = true
        }
        return result
    }
    
    static func isValidePassword(value: String) -> Bool {
        var result = false
        if value.count >= 6 {
            result = true
        }
        return result
    }
    
    static func isConfirmPasswordIsEqualToPassword(password: String, confirm: String) -> Bool {
        if(password == confirm)
        {
            return true
        }
        
        return false
    }
    
    static func validateStringLength(_ text: String) -> Bool {
        let trimmed = text.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        return !trimmed.isEmpty
    }
    
    static func isValidPakistaniMobileNumber(_ text: String) -> Bool {
        if text.count == 11 && text.hasPrefix("03") {
            return true
        }
        return false
    }
    
    static func isValidCNICNumber(_ text: String) -> Bool {
        if text.count == 13 {
            return true
        }
        return false
    }
}
