//
//  Shifaam Error.swift
//  Shifaam Doctor
//
//  Created by Ahmed Shahid on 23/04/2020.
//  Copyright © 2020 EPlanet Communications. All rights reserved.
//

import Foundation

class CustomError: NSObject {
    var errorCode: String?
    var errorMsg: String?
    var data: [String:Any] = [:]
    
    override init() {
        super.init()
    }
    
    convenience required init?(errorCode: String, errorMsg: String, statusCode: Int, data: [String:Any]) {
        self.init()
        self.errorCode = errorCode
        self.errorMsg = errorMsg
        self.data = data
    }
}

enum ErrorCode: String {
    case tokenExpired = "09"
}
