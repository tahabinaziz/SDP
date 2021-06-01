//
//  RequestHandler.swift
//  Goto
//
//  Created by Kamran Anjum on 10/7/19.
//  Copyright © 2019 goto. All rights reserved.
//


import UIKit
import Alamofire

enum requestType {
    case defaultHeaders
    case customHeaders
}

// MARK: Request Handler
class RequestHandler {
    static var httpHeaders = [String: String]()
    // get the request session manager
    static func sessionManager(type: requestType? = .defaultHeaders, headers: [String: String]? = nil) -> Alamofire.SessionManager {
        let sessionManager = Alamofire.SessionManager.default
        if type! == .customHeaders {
            httpHeaders = headers!
            RequestHeadersAdapter.requestType = .customHeaders
        } else {
            httpHeaders = [String: String]()
            RequestHeadersAdapter.requestType = .defaultHeaders
        }
        sessionManager.adapter = RequestHeadersAdapter()
        return sessionManager
    }
    
    // get the http headers
    static func getHTTPRequestHeaderFields() -> [String:String] {
        var httpHeaders = [String:String]()
//           httpHeaders.updateValue("application/json", forKey: "Content-Type")
        //  httpHeaders.updateValue("application/json", forKey: "Accept")
        //   httpHeaders.updateValue("AppConstants.Secrets.clientId", forKey: "X-client-id")
        //   httpHeaders.updateValue("AppConstants.Secrets.clientSecret", forKey: "X-client-secret")
        if let token = AppStateManager.shared.loggedInUser?.token {
            httpHeaders.updateValue("Bearer \(token)", forKey: "Authorization")
        }
        // device meta data
        let deviceMetaData = "iPhone" // Util.getDeviceMetadata()
        //    httpHeaders.updateValue(deviceMetaData, forKey: "device")
        
        /*
        // access token
        //  let keychain = KeychainSwift()
        if let accessToken = ShareLocalData.getSessionToken() as? String {
            let authorizationToken = "Bearer " + accessToken
            httpHeaders.updateValue(authorizationToken, forKey: "Authorization")
        } else {
            let authorizationToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFjaGVyX2lkIjoiTkVELTAwMDAtMTIxMjEiLCJlbWFpbCI6ImFkbWluQG5lZC5jb20ifQ.v5xanorEc7IgxjmKi8myXQTouc4nK2RzgUI7OShpcgA"
            httpHeaders.updateValue(authorizationToken, forKey: "Authorization")
        }
        
        */
        
        return httpHeaders
    }
    
    static func getUpdatedHTTPRequestHeaderFields() -> [String:String] {
        return httpHeaders
    }
}


// MARK: Request Headers Adapter
class RequestHeadersAdapter : RequestAdapter {
    static var requestType: requestType?
    func adapt(_ urlRequest: URLRequest) throws -> URLRequest {
        var urlRequest = urlRequest
        // add the default http headers
        if let type = RequestHeadersAdapter.requestType {
            if type == .customHeaders {
                let httpHeaders = RequestHandler.getUpdatedHTTPRequestHeaderFields()
                httpHeaders.forEach { (key, value) in
                    urlRequest.setValue(value, forHTTPHeaderField: key)
                }
                return urlRequest
            }
        }
        let httpHeaders = RequestHandler.getHTTPRequestHeaderFields()
        httpHeaders.forEach { (key, value) in
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }
        // set credentials for authorised and un-authorised requests
        // NOTE: Messed-up OAuth access token validations. Discussed with the server team!
        var credentialType = urlRequest.value(forHTTPHeaderField: "X-grant-type")
        if credentialType == nil {
            credentialType = true ? "user_credentials" : "client_credentials"
            urlRequest.setValue(credentialType, forHTTPHeaderField: "X-grant-type")
        }
        
        return urlRequest
    }
    
}

