//
//  APIClient.swift
//  Goto
//
//  Created by Kamran Anjum on 10/7/19.
//  Copyright © 2019 goto. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import ObjectMapper

public enum APIClientResult {
    case success([String:Any])
    case failure(String)
}

enum Route: String {
    
    // MARK: 5
    
    case specialization = ""
    
    case quizDetail = "api/quiz/quizDetail"
    case getQuestions = "api/question/?"
    case answerSubmit = "api/answer/?"
    
    case cities = "/v1/list/city"
    case verifyNumber = "/v1/verify-number"
    case services = "/v1/list/services"
    case languages = "/v1/list/languages"
    
    case states = "/v1/list/state"
    
    case areas = "/v1/list/area"
    
    // Login/Signup
    case signup = "/v1/signup"
    case login = "/v1/auth"
    case forgotPasswordRequest = "/v1/request-password-reset"
    case passwordReset = "/v1/set-password"
    
    // Home
    case dashboardStats = "/v1/doctor/appointments/stats"
    
    // Appointments
    case upcomingAppts = "/v1/doctor/appointments"
    case ssearchPatient = "/v1/doctor/appointments/search-patient"
    case bookAnAppointment = "/v1/doctor/appointments/book-patient-appointment"
    case registerPatient = "/v1/doctor/appointments/register-patient"
    case getVideoID = "/v1/doctor/video-call"
    case gruveoHash = "/v1/generate-gruveo-hash"
    case giveFeedback = "/v1/doctor/rating/index?"
    case saveQuestionaire = "/v1/doctor/rating/save-questionnaire?"
    case patientProfile = "/v1/doctor/video-call/patient-profile"
    // filter
    case clinics = "/v1/doctor/appointments/clinics"
    
    // Leave Management
    case addLeaves = "/v1/doctor/leaves/add"
    case getLeaves = "/v1/doctor/leaves"
    case deleteLeaves = "/v1/doctor/leaves/delete"
    case updateLeave = "/v1/doctor/leaves/update?"
    
    // refer a doctor
    case referADoctor = "/v1/doctor/refer-doctor"
    case addReferDoctor = "/v1/doctor/refer-doctor/add"
    // Revenue
    case getRevenue = "/v1/doctor/revenue"
    
    // Schedule
    case getSchedule = "/v1/doctor/schedule"
    
    // Notification
    case getNotifications = "/v1/notifications/get-settings"
    case updateNotification = "/v1/notifications/update-setting"
    // Forum
    case getForumQuestions = "/v1/doctor/forum/all-questions"
    case getForumComments = "/v1/doctor/forum/view-question"
    case addForumComment = "/v1/doctor/forum/create-comment"
    case deleteForumComment = "/v1/doctor/forum/delete-comment"
    // Profile & Setting
    case updateEmailPassword = "/v1/doctor/profile/update"
    case getMyProfile = "/v1/doctor/profile/me"
    case updateProfile = "/v1/doctor/profile/update-title"
    case addExperience = "/v1/doctor/experience/add"
    case updateExperience = "/v1/doctor/experience/add?"
    case addEducation = "/v1/doctor/education/add"
    case updateEducation = "/v1/doctor/education/update?"
    case addServices = "/v1/doctor/services/add"
    case addLangauge = "/v1/doctor/languages/add"
    case addSpecialization = "/v1/doctor/specializations/add"
    case addConsultation = "/v1/doctor/profile/add-clinic-appointment-setting?"
    case addPA = "/v1/doctor/personal-assistant/add"
    case updatePA = "/v1/doctor/personal-assistant/update?"
    case addFreeSlots = "/v1/doctor/profile/update-free-appointment-slot"
    case deleteClinic = "/v1/doctor/profile/delete-doctor-clinic"
    case deleteEducation = "/v1/doctor/education/delete"
    case deleteExperience = "/v1/doctor/experience/delete"
    case uploadImage = "/v1/doctor/profile/upload-create-img"
    case getFreeSlots = "/v1/doctor/profile/free-appointment-slot"
    case getPhysicalSlots = "/v1/doctor/profile/get-clinic-appointment-setting"
    case updatePhysicalSlots = "/v1/doctor/profile/update-clinic-appointment-setting?"
    
    
    func url() -> String{
        return self.rawValue
    }
}

enum APIClient: URLRequestConvertible {
    
    static let boundaryConstant = "myRandomBoundary123234"
    
    
    // MARK: 1
    
    case quizDetail(param: [String:Any])
    case getQuestions(param: [String:Any])
    case specilizationList
    case citiesList
    case verifyNumber(param: [String:Any])
    case servies
    case languages
    case states
    case cities(param: [String:Any])
    case areas(param: [String:Any])
    
    // Login
    case login(param: [String:Any])
    case signup(param: [String : Any])
    case forgotPasswordRequest(param: [String : Any])
    case passwordReset(param: [String : Any])
    
    // Dashboard Home
    case dashboardStats
    
    // Appointments
    case upcomingAppts(param: [String : Any])
    case searchPatient(param: [String : Any])
    case bookAnAppointment(param: [String : Any])
    case registerPatient(param: [String : Any])
    case getVideoID(param: [String : Any])
    case gruveoHash(param: [String : Any])
    case giveFeedback(param: [String : String], hashMapParams: [String : Any])
    case saveQuestionaire(param: [String : String], hashMapParams: [String : Any])
    case patientProfile(param: [String : Any])
    // Filter
    case clinics
    
    // Leave Management
    case addLeaves(param: [String : Any])
    case getLeaves
    case deleteLeaves(param: [String : Any])
    case updateLeave(param: [String : String], hashMapParams: [String : Any])
    
    // schedule
    case getSchedule(param: [String : Any])
    
    // refer a doc
    case referADoctor(param: [String : Any])
    case addReferDoctor(param: [String : Any])
    // Revenue
    case getRevenue(param: [String : Any])
    
    // Notifications
    case getNotifications(param: [String : Any])
    case updateNotification(param: [String : Any])
    // Forum
    case getForumQuestions(param: [String : Any])
    case getForumComments(param: [String : Any])
    case addForumComment(param: [String : Any])
    case deleteForumComment(param: [String : Any])
    
    // profile and settings
    case updateEmailPassword(param: [String : Any])
    case getMyProfile
    case updateProfile(param: [String : Any])
    case addExperience(param: [String : Any])
    case updateExperience(queryParam: [String : String], bodyParam: [String : Any])
    case addEducation(param: [String : Any])
    case updateEducation(queryParam: [String : String], bodyParam: [String : Any])
    case addServices(param: [String : Any])
    case addLangauge(param: [String : Any])
    case addSpecialization(param: [String : Any])
    case addConsultation(queryParam: [String : String], bodyParam: [String : Any])
    case addPA(param: [String : Any])
    case updatePA(queryParam: [String : String], bodyParam: [String : Any])
    case addFreeSlots(param: [String : Any])
    case deleteClinic(param: [String : Any])
    case getFreeSlots
    case getPhysicalSlots(param: [String : Any])
    case deleteExperience(param: [String : Any])
    case deleteEducation(param: [String : Any])
    case updatePhysicalSlots(queryParam: [String : String], bodyParam: [String : Any])
    
    case doctorsList(docList: [String:Any])
    case addCareTeam(doctorId: Int)
    case removeCareTeam(doctorId: Int)
    case uploadImage(param: [String : Any])
    
    
    
    func asURLRequest() throws -> URLRequest {
        var method: HTTPMethod {
            switch self {
            // MARK: 2
            case .doctorsList, .specilizationList, .citiesList, .dashboardStats, .upcomingAppts, .clinics, .getVideoID, .patientProfile, .getLeaves, .getForumQuestions, .getForumComments, .getNotifications, .getRevenue, .getSchedule, .getMyProfile, .servies, .languages, .states, .cities, .areas, .referADoctor, .getFreeSlots, .getPhysicalSlots, .getQuestions:
                return .get
            case .login, .verifyNumber, .signup, .forgotPasswordRequest, .passwordReset, .searchPatient, .bookAnAppointment, .registerPatient, .gruveoHash, .giveFeedback, .saveQuestionaire, .addLeaves, .updateNotification, .addConsultation, .addFreeSlots, .uploadImage, .quizDetail:
                return .post
            case .addCareTeam, .updateLeave, .addForumComment, .deleteForumComment, .updateProfile, .addExperience, .updateExperience, .addEducation, .updateEducation, .addServices, .addLangauge, .addSpecialization, .addReferDoctor, .addPA, .updatePA, .updateEmailPassword, .updatePhysicalSlots:
                return .put
            case .removeCareTeam, .deleteLeaves, .deleteClinic, .deleteEducation, .deleteExperience:
                return .delete
            }
        }
        
        var params: ([String: Any]?) = {
            
            switch self {
            // MARK: 3
            case .login(let param), .forgotPasswordRequest(let param), .signup(let param), .passwordReset(let param), .upcomingAppts(let param), .searchPatient(let param), .bookAnAppointment(let param), .verifyNumber(let param), .registerPatient(let param), .getVideoID(let param), .gruveoHash(let param), .patientProfile(let param), .addLeaves(let param), .deleteLeaves(let param), .getForumComments(let param), .getNotifications(let param), .updateNotification(let param), .getForumQuestions(let param), .getRevenue(let param), .getSchedule(let param), .updateEmailPassword(let param), .addForumComment(let param), .deleteForumComment(let param), .updateProfile(let param), .addExperience(let param), .addEducation(let param), .addServices(let param), .addLangauge(let param), .addSpecialization(let param), .cities(let param), .areas(let param), .referADoctor(let param), .addReferDoctor(let param), .addPA(let param), .addFreeSlots(let param), .deleteClinic(let param), .deleteExperience(let param), .deleteEducation(let param), .uploadImage(let param), .getPhysicalSlots(let param), .quizDetail(let param), .getQuestions(let param):
                return param
            case .doctorsList(let docList):
                return [
                    "id" : docList
                ]
            case .addCareTeam(let doctorId):
                return [
                    "doctor_user_id" : doctorId
                ]
            case .removeCareTeam(let doctorId):
                return [
                    "id" : doctorId
                ]
            case .specilizationList, .citiesList, .dashboardStats, .clinics, .getLeaves, .getMyProfile, .servies, .languages, .states, .getFreeSlots:
                return [:]
            case .giveFeedback( _, let hashMapParams), .saveQuestionaire( _, let hashMapParams), .updateLeave( _, let hashMapParams), .updateExperience( _, let hashMapParams), .updateEducation( _, let hashMapParams), .addConsultation( _, let hashMapParams), .updatePA( _, let hashMapParams), .updatePhysicalSlots( _, let hashMapParams):
                return hashMapParams
            }
        }()
        
        let relativePath: String = {
            switch self {
            // MARK: 4
            case .login:
                return Route.login.url()
            case .signup:
                return Route.signup.url()
            case .forgotPasswordRequest:
                return Route.forgotPasswordRequest.url()
            case .passwordReset:
                return Route.passwordReset.url()
                
            case .dashboardStats:
                return Route.dashboardStats.url()
                
            // Appointments
            case .upcomingAppts:
                return Route.upcomingAppts.url()
            case .searchPatient:
                return Route.ssearchPatient.url()
            case .bookAnAppointment:
                return Route.bookAnAppointment.url()
            case .registerPatient:
                return Route.registerPatient.url()
            case .getVideoID:
                return Route.getVideoID.url()
            case .gruveoHash:
                return Route.gruveoHash.url()
            case .giveFeedback(let param, _):
                return (self.URLforRoute(route: Route.giveFeedback.url(), params: param)?.absoluteString)!
            case .saveQuestionaire(let param, _):
                return (self.URLforRoute(route: Route.saveQuestionaire.url(), params: param)?.absoluteString)!
            case .patientProfile:
                return Route.patientProfile.url()
                // ............
                
            // Leave Management
            case .addLeaves:
                return Route.addLeaves.url()
            case .getLeaves:
                return Route.getLeaves.url()
            case .deleteLeaves:
                return Route.deleteLeaves.url()
            case .updateLeave(let param, _):
                return (self.URLforRoute(route: Route.updateLeave.url(), params: param)?.absoluteString)!
                // ............
                
            // Schedule
            case .getSchedule:
                return Route.getSchedule.url()
                
            // Forum
            case .getForumQuestions:
                return Route.getForumQuestions.url()
            case .getForumComments:
                return Route.getForumComments.url()
            case .addForumComment:
                return Route.addForumComment.url()
            case .deleteForumComment:
                return Route.deleteForumComment.url()
                // ............
                
            // Revenue
            case .getRevenue:
                return Route.getRevenue.url()
                // .............
                
            // refer a doctor
            case .referADoctor:
                return Route.referADoctor.url()
            case .addReferDoctor:
                return Route.addReferDoctor.url()
                // .............
            // Notification
            case .getNotifications:
                return Route.getNotifications.url()
            case .updateNotification:
                return Route.updateNotification.url()
                // ............
                
            // Profile and settings
            case .updateEmailPassword:
                return Route.updateEmailPassword.url()
            case .getMyProfile:
                return Route.getMyProfile.url()
            case .updateProfile:
                return Route.updateProfile.url()
            case .addExperience:
                return Route.addExperience.url()
            case .updateExperience(let param, _):
                return (self.URLforRoute(route: Route.updateExperience.url(), params: param)?.absoluteString)!
            case .addEducation:
                return Route.addEducation.url()
            case .updateEducation(let param, _):
                return (self.URLforRoute(route: Route.updateEducation.url(), params: param)?.absoluteString)!
            case .addLangauge:
                return Route.addLangauge.url()
            case .addServices:
                return Route.addServices.url()
            case .addSpecialization:
                return Route.addSpecialization.url()
            case .addConsultation(let param, _):
                return (self.URLforRoute(route: Route.addConsultation.url(), params: param)?.absoluteString)!
            case .addPA:
                return Route.addPA.url()
            case .updatePA(let param, _):
                return (self.URLforRoute(route: Route.updatePA.url(), params: param)?.absoluteString)!
            case .addFreeSlots:
                return Route.addFreeSlots.url()
            case .deleteClinic:
                return Route.deleteClinic.url()
            case .deleteExperience:
                return Route.deleteExperience.url()
            case .deleteEducation:
                return Route.deleteEducation.url()
            case .uploadImage:
                return Route.uploadImage.url()
            case .getFreeSlots:
                return Route.getFreeSlots.url()
            case .getPhysicalSlots:
                return Route.getPhysicalSlots.url()
            case .updatePhysicalSlots(let param, _):
                return (self.URLforRoute(route: Route.updatePhysicalSlots.url(), params: param)?.absoluteString)!
            // ............
            case .doctorsList:
                return "list/doctor-listing"
            case .servies:
                return Route.services.url()
            case .languages:
                return Route.languages.url()
            case .addCareTeam(let doctorId):
                return ""
            case .removeCareTeam(let doctorId):
                return ""
            case .clinics:
                return Route.clinics.url()
            case .verifyNumber(let phone):
                return Route.verifyNumber.url()
            case .specilizationList:
                return Route.specialization.url()
            case .citiesList:
                return Route.cities.url()
            case .cities:
                return Route.cities.url()
            case .states:
                return Route.states.url()
            case .areas:
            return Route.areas.url()
            case .quizDetail:
                return Route.quizDetail.url()
            case .getQuestions:
                return Route.getQuestions.url()
            }
        }()
        
        /*
         No Need to change things below
         */
        
        var AAPInternalAPIEndpoint: String! {
            switch self {
            // For Different URL cases can be handled here
            default:
                let BaseURL = ServerSettings.BASE_URL
                return  BaseURL
            }
        }
        
        var APIEndpoint: String! {
            return AAPInternalAPIEndpoint
        }
        
        let url:URL = {
            // let url = URL(string: relativePath, relativeTo: APIEndpoint)
            let url = URL(string: APIEndpoint + relativePath)
            return url!
        } ()
        
        let encoding: ParameterEncoding = {
            switch method {
            case .post, .delete, .put, .patch:
                switch self {
                case .login:
                    return URLEncoding()
                default:
                    return URLEncoding()
                }
            default:
                return URLEncoding()
            }
        } ()
        
        // Setup URLRequest and Header
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = method.rawValue
        urlRequest.allHTTPHeaderFields = nil
        
        switch self {
            // For Different Headers case can be handle here
            
        default:
            let httpHeaders = RequestHandler.getHTTPRequestHeaderFields()
            httpHeaders.forEach { (key, value) in
                urlRequest.setValue(value, forHTTPHeaderField: key)
            }
            
        }
        
        debugPrint("\n\n------- API_REQUEST: [\(url)]")
        
        
        switch self {
        // Different Paramater type/SavePhoto/SaveVideo Cases can be handle herer
        default:
            urlRequest.timeoutInterval = 30
            if params == nil {
                params = [String:Any]()
            }
            switch self {
                
            default:
                debugPrint("REQUEST_PARAMS: \(params!)")
            }
            return try encoding.encode(urlRequest, with: params)
        }
    }
    
    static let manager: SessionManager = {
        let manager = Alamofire.SessionManager.default
        manager.session.configuration.timeoutIntervalForResource = 3600
        manager.session.configuration.timeoutIntervalForRequest = 3600
        return manager
    }()
    
    static private func callAPIAndGetRequest(request: APIClient, showLoader: Bool = true, loaderText: String? = nil, errorContainerView: UIView? = nil, isBeingRetried: Bool = false, returnTheWholeResponse: Bool = false, uploadBlock:((Double) -> Void)? = nil, onSuccess successBlock: ((Any) -> Void)?, onFailure failureBlock: ((CustomError) -> Void)?) -> DataRequest {
        if showLoader {
            if loaderText != "" && loaderText != nil {
                //                ProgressView.showWithStatus(title: loaderText)
                Utility.main.showLoader()
            } else {
                Utility.main.showLoader()
            }
            
        }
        
        let responseCompletion: (DataResponse<Any>) -> Void = { (response) in
            
            let handleFailure: (_: CustomError, _: Any, _: Error?) -> Void = {boloroError, log, errorObject in
                debugPrint("FAILURE(\((response.response != nil) ? response.response!.statusCode : 0)) [\(response.request!.url!.relativePath)]: \(log)")
                switch response.result {
                case .success(let object):
                    debugPrint("Response Object: \(object)")
                default: break
                }
                if let error = errorObject as NSError?, error.code == NSURLErrorNotConnectedToInternet {
                    failureBlock?(handleError(message: error.localizedDescription, code: String(error.code), data: nil))
                }
                failureBlock?(boloroError)
            }
            
            if showLoader {
                Utility.main.hideLoader()
            }
            
            switch response.result {
            case .success(let value):
                switch request {
                // Different Responses can be handled here
                default:
                    debugPrint("Response : \(value)")
                    guard let dictionary = value as? [String:Any] else {
                        handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                        return
                    }
                    guard let success = dictionary["success"] as? Bool, success else {
                        
                        var errorMsgStr = ""
                        var errorCodeStr = ""
                        var errorData: [String:Any] = [:]
                        
                        if let errorMsg = dictionary["message"] as? String, errorMsg != "" {
                            errorMsgStr = errorMsg
                        }
                        
                        let errorIntCode = dictionary["statusCode"] as? Int
                        let errorCode = "\(errorIntCode ?? 0)"
                        if errorCode != "" {
                            errorCodeStr = errorCode
                        }
                        
                        if let data = dictionary["data"] as? [String : Any] {
                            errorData = data
                        }
                        
                        handleFailure(handleError(message: errorMsgStr, code: errorCodeStr, data: errorData), "No object in \"data\" array.", nil)
                        return
                    }
                    
                    guard let responseData = response.data else {
                        handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
                        return
                    }
                    if returnTheWholeResponse {
                        successBlock?(responseData)
                    } else {
                        do {
                            let jsonData = try JSONSerialization.data(withJSONObject: dictionary["data"] as Any, options: .prettyPrinted)
                            successBlock?(jsonData)
                        } catch let error {
                            handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                        }
                    }
                    
                    
                    debugPrint("\(dictionary)")
                }
            case .failure(let error):
                debugPrint(error.localizedDescription)
                handleFailure(handleError(message: error.localizedDescription, code: "\(error._code)", data: nil), "Unable to parse JSON.", error)
            }
        }
        
        func dataUploadBlock (model: Mappable?, fileData: Data?, fileName: String?, mimeString: String, name: String) -> DataRequest {
            var uploadData = Data()
            if let fileName = fileName, let data = fileData {
                let byteCountFormatter = ByteCountFormatter()
                byteCountFormatter.allowedUnits = [.useAll]
                byteCountFormatter.countStyle = .file
                let filSizeCount = byteCountFormatter.string(fromByteCount: Int64(data.count))
                debugPrint("ADDING OBJECT: \(fileName) (\(filSizeCount))")
                uploadData.append("\r\n--\(boundaryConstant)\r\n".data(using: .utf8)!)
                uploadData.append("Content-Disposition: form-data; name=\"\(name)\"; filename=\"\(fileName)\"\r\n".data(using: .utf8)!)
                uploadData.append("Content-Type: \(mimeString)\r\n\r\n".data(using: .utf8)!)
                uploadData.append(data)
            }
            var modelJSON = (model?.toJSON()) ?? [String:Any]()
            modelJSON.updateValue(1, forKey: "suppress_response_code")
            debugPrint("REQUEST_PARAMS: \(modelJSON)")
            for (key, value) in modelJSON {
                uploadData.append("\r\n--\(boundaryConstant)\r\n".data(using: .utf8)!)
                uploadData.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n\(value)".data(using: .utf8)!)
            }
            uploadData.append("\r\n--\(boundaryConstant)--\r\n".data(using: .utf8)!)
            
            return Alamofire.upload(uploadData, with: request)
                .responseJSON(completionHandler: responseCompletion)
                .uploadProgress(closure: { (progress) in
                    let progressPercentage = progress.fractionCompleted*100
                    uploadBlock?(progressPercentage)
                    debugPrint("Upload progress: \(progressPercentage)")
                    switch request {
                        /* case .saveCoverPhoto:
                         //  HUD?.label.text = "Uploading Cover Photo \(Int(progressPercentage))%"
                         ProgressView.showWithStatus(title: "Uploading Cover Photo \(Int(progressPercentage))%")
                         break */
                    default: break
                    }
                })
        }
        
        func dataUploadBlockFromURL (model: Mappable?, fileURL: URL?, fileName: String?, mimeString: String, name: String) -> DataRequest {
            var fileData: Data?
            if let fileURL = fileURL, let data = try? Data(contentsOf: fileURL) {
                fileData = data
            }
            return dataUploadBlock(model: model, fileData: fileData, fileName: fileName, mimeString: mimeString, name: name)
        }
        
        
        switch request {
        default:
            return Alamofire.request(request).validate(statusCode: 200..<500) .responseJSON(completionHandler: responseCompletion)
        }
    }
    
    static func callAPI(request: APIClient, showLoader: Bool = true, loaderText: String? = nil, errorContainerView: UIView? = nil, isBeingRetried: Bool = false, returnTheWholeResponse: Bool = false, uploadBlock:((Double) -> Void)? = nil, onSuccess successBlock: ((Any) -> Void)?, onFailure failureBlock: ((CustomError) -> Void)?) {
        URLCache.shared.removeAllCachedResponses()
        let _ = callAPIAndGetRequest(request: request, showLoader: showLoader, loaderText: loaderText, errorContainerView: errorContainerView, isBeingRetried: isBeingRetried, returnTheWholeResponse: returnTheWholeResponse, uploadBlock: uploadBlock, onSuccess: successBlock, onFailure: failureBlock)
    }
    
    
    static func uploadImage(request: APIClient, parameter: [String : Any]?,imageData: Data, key: String, mimeType: String, uploadBlock:((Double) -> Void)? = nil, returnTheWholeResponse: Bool = false, onSuccess successBlock: ((Any) -> Void)?, onFailure failureBlock: ((CustomError) -> Void)?) {
        URLCache.shared.removeAllCachedResponses()
        
        Alamofire.upload(multipartFormData: { (uploadData) in
//            for (key, value) in parameter ?? (NSDictionary() as! [String : Any]) {
//                if let strValue = value as? String {
//                    uploadData.append(strValue.data(using: String.Encoding.utf8, allowLossyConversion: false)!, withName: key)
//                }
//            }
            uploadData.append(imageData, withName: key, mimeType: mimeType)
        },
                         to: (request.urlRequest?.url?.absoluteString)!,
                         method: .post,
                         headers: RequestHandler.getHTTPRequestHeaderFields()) { (encodingResult) in
                            switch encodingResult {
                            case .success(let upload, _, _):
                                upload.responseJSON { (response) in
                                    
                                    let handleFailure: (_: CustomError, _: Any, _: Error?) -> Void = {boloroError, log, errorObject in
                                        debugPrint("FAILURE(\((response.response != nil) ? response.response!.statusCode : 0)) [\(response.request!.url!.relativePath)]: \(log)")
                                        switch response.result {
                                        case .success(let object):
                                            debugPrint("Response Object: \(object)")
                                        default: break
                                        }
                                        if let error = errorObject as NSError?, error.code == NSURLErrorNotConnectedToInternet {
                                            failureBlock?(handleError(message: error.localizedDescription, code: String(error.code), data: nil))
                                        }
                                        failureBlock?(boloroError)
                                    }
                                    
                                    switch response.result {
                                    case .success(let value):
                                        switch request {
                                        // Different Responses can be handled here
                                        default:
                                            debugPrint("Response : \(value)")
                                            guard let dictionary = value as? [String:Any] else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                                                return
                                            }
                                            guard let success = dictionary["success"] as? Bool, success else {
                                                
                                                var errorMsgStr = ""
                                                var errorCodeStr = ""
                                                var errorData: [String:Any] = [:]
                                                
                                                if let errorMsg = dictionary["message"] as? String, errorMsg != "" {
                                                    errorMsgStr = errorMsg
                                                }
                                                
                                                let errorIntCode = dictionary["statusCode"] as? Int
                                                let errorCode = "\(errorIntCode ?? 0)"
                                                if errorCode != "" {
                                                    errorCodeStr = errorCode
                                                }
                                                
                                                if let data = dictionary["data"] as? [String : Any] {
                                                    errorData = data
                                                }
                                                
                                                handleFailure(handleError(message: errorMsgStr, code: errorCodeStr, data: errorData), "No object in \"data\" array.", nil)
                                                return
                                            }
                                            
                                            guard response.data != nil else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
                                                return
                                            }
                                            
                                            
                                            guard let responseData = response.data else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
                                                return
                                            }
                                            
                                            if returnTheWholeResponse {
                                                successBlock?(responseData)
                                            } else {
                                                do {
                                                    let jsonData = try JSONSerialization.data(withJSONObject: dictionary["data"] as Any, options: .prettyPrinted)
                                                    successBlock?(jsonData)
                                                    
                                                } catch let error {
                                                    debugPrint(error.localizedDescription)
                                                    handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                                                }
                                            }
                                            

                                            
                                            debugPrint("\(dictionary)")
                                        }
                                    case .failure(let error):
                                        debugPrint(error.localizedDescription)
                                        handleFailure(handleError(message: error.localizedDescription, code: "\(error._code)", data: nil), "Unable to parse JSON.", error)
                                    }
                                }
                            case .failure(let error):
                                debugPrint(error.localizedDescription)
                                failureBlock?(CustomError(errorCode: "11111", errorMsg: error.localizedDescription, statusCode: 1111, data: [:])!)
                            }
        }
        
    }
    
    static func callMultipartAPI(request: APIClient, parameter: [String : Any]?, fileURL: URL?, fileName: String?, fileKey: String, mimeType: String, imageData: Data, uploadBlock:((Double) -> Void)? = nil, returnTheWholeResponse: Bool = false, onSuccess successBlock: ((Any) -> Void)?, onFailure failureBlock: ((CustomError) -> Void)?) {
        
        URLCache.shared.removeAllCachedResponses()
        
        //        var uploadData = MultipartFormData()
        
        
        
        Alamofire.upload(multipartFormData: { (uploadData) in
            for (key, value) in parameter ?? (NSDictionary() as! [String : Any]) {
                if let strValue = value as? String {
                    uploadData.append(strValue.data(using: String.Encoding.utf8, allowLossyConversion: false)!, withName: key)
                }
            }
            
//            do {
//                let myData =  try Data(contentsOf: fileURL)
                uploadData.append(imageData, withName: fileKey, mimeType: mimeType)
//            } catch {
//             print("data nai maan raha")
//            }
            
//            uploadData.append(fileURL, withName: fileKey)
            print(uploadData)
//            uploadData.append(fileURL, withName: fileKey, fileName: fileName, mimeType: mimeType)
        },
                         to: (request.urlRequest?.url?.absoluteString)!,
                         method: .post,
                         headers: RequestHandler.getHTTPRequestHeaderFields()) { (encodingResult) in
//                            Utility.main.hideLoader()
                            switch encodingResult {
                            case .success(let upload, _, _):
                                upload.responseJSON { (response) in
                                    
                                    let handleFailure: (_: CustomError, _: Any, _: Error?) -> Void = {boloroError, log, errorObject in
                                        debugPrint("FAILURE(\((response.response != nil) ? response.response!.statusCode : 0)) [\(response.request!.url!.relativePath)]: \(log)")
                                        switch response.result {
                                        case .success(let object):
                                            debugPrint("Response Object: \(object)")
                                        default: break
                                        }
                                        if let error = errorObject as NSError?, error.code == NSURLErrorNotConnectedToInternet {
                                            failureBlock?(handleError(message: error.localizedDescription, code: String(error.code), data: nil))
                                        }
                                        failureBlock?(boloroError)
                                    }
                                    
                                    switch response.result {
                                    case .success(let value):
                                        switch request {
                                        // Different Responses can be handled here
                                        default:
                                            debugPrint("Response : \(value)")
                                            guard let dictionary = value as? [String:Any] else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                                                return
                                            }
                                            guard let success = dictionary["success"] as? Bool, success else {
                                                
                                                var errorMsgStr = ""
                                                var errorCodeStr = ""
                                                var errorData: [String:Any] = [:]
                                                
                                                if let errorMsg = dictionary["message"] as? String, errorMsg != "" {
                                                    errorMsgStr = errorMsg
                                                }
                                                
                                                let errorIntCode = dictionary["statusCode"] as? Int
                                                let errorCode = "\(errorIntCode ?? 0)"
                                                if errorCode != "" {
                                                    errorCodeStr = errorCode
                                                }
                                                
                                                if let data = dictionary["data"] as? [String : Any] {
                                                    errorData = data
                                                }
                                                
                                                handleFailure(handleError(message: errorMsgStr, code: errorCodeStr, data: errorData), "No object in \"data\" array.", nil)
                                                return
                                            }
                                            
                                            guard response.data != nil else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
                                                return
                                            }
                                            
                                            
                                            guard let responseData = response.data else {
                                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
                                                return
                                            }
                                            
                                            if returnTheWholeResponse {
                                                successBlock?(responseData)
                                            } else {
                                                do {
                                                    let jsonData = try JSONSerialization.data(withJSONObject: dictionary["data"] as Any, options: .prettyPrinted)
                                                    successBlock?(jsonData)
                                                    
                                                } catch let error {
                                                    debugPrint(error.localizedDescription)
                                                    handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
                                                }
                                            }
                                            

                                            
                                            debugPrint("\(dictionary)")
                                        }
                                    case .failure(let error):
                                        debugPrint(error.localizedDescription)
                                        handleFailure(handleError(message: error.localizedDescription, code: "\(error._code)", data: nil), "Unable to parse JSON.", error)
                                    }
                                }
                            case .failure(let error):
                                debugPrint(error.localizedDescription)
                                failureBlock?(CustomError(errorCode: "11111", errorMsg: error.localizedDescription, statusCode: 1111, data: [:])!)
                            }
        }
    }
    
//    static func invokeMultipartAPI(request: APIClient, parameter: [String : Any], fileData: Data, fileName: String, fileKey: String, mimeType: String, uploadBlock:((Double) -> Void)? = nil, returnTheWholeResponse: Bool, onSuccess successBlock: ((Any) -> Void)?, onFailure failureBlock: ((CustomError) -> Void)?) {
//
//
//        Alamofire.upload(multipartFormData: { (uploadData) in
//            for (key, value) in parameter {
//                if let strValue = value as? String {
//                    uploadData.append(strValue.data(using: String.Encoding.utf8, allowLossyConversion: false)!, withName: key)
//                }
//            }
//            uploadData.append(fileData, withName: fileKey, fileName: fileName, mimeType: mimeType)
//
//        }, to: (request.urlRequest?.url?.absoluteString)!, usingThreshold: UInt64.init(), method: .post, headers: [], interceptor: nil, fileManager: .default, requestModifier: nil).responseJSON { (response) in
//
//            switch encodingResult {
//            case .success(let upload, _, _):
//                upload.responseJSON { (response) in
//
//                    let handleFailure: (_: CustomError, _: Any, _: Error?) -> Void = {boloroError, log, errorObject in
//                        debugPrint("FAILURE(\((response.response != nil) ? response.response!.statusCode : 0)) [\(response.request!.url!.relativePath)]: \(log)")
//                        switch response.result {
//                        case .success(let object):
//                            debugPrint("Response Object: \(object)")
//                        default: break
//                        }
//                        if let error = errorObject as NSError?, error.code == NSURLErrorNotConnectedToInternet {
//                            failureBlock?(handleError(message: error.localizedDescription, code: String(error.code), data: nil))
//                        }
//                        failureBlock?(boloroError)
//                    }
//
//                    switch response.result {
//                    case .success(let value):
//                        switch request {
//                        // Different Responses can be handled here
//                        default:
//                            debugPrint("Response : \(value)")
//                            guard let dictionary = value as? [String:Any] else {
//                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
//                                return
//                            }
//                            guard let success = dictionary["success"] as? Bool, success else {
//
//                                var errorMsgStr = ""
//                                var errorCodeStr = ""
//                                var errorData: [String:Any] = [:]
//
//                                if let errorMsg = dictionary["message"] as? String, errorMsg != "" {
//                                    errorMsgStr = errorMsg
//                                }
//
//                                let errorIntCode = dictionary["statusCode"] as? Int
//                                let errorCode = "\(errorIntCode ?? 0)"
//                                if errorCode != "" {
//                                    errorCodeStr = errorCode
//                                }
//
//                                if let data = dictionary["data"] as? [String : Any] {
//                                    errorData = data
//                                }
//
//                                handleFailure(handleError(message: errorMsgStr, code: errorCodeStr, data: errorData), "No object in \"data\" array.", nil)
//                                return
//                            }
//
//                            guard response.data != nil else {
//                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to find response data.", nil)
//                                return
//                            }
//
//                            do {
//                                let jsonData = try JSONSerialization.data(withJSONObject: dictionary["data"] as Any, options: .prettyPrinted)
//                                successBlock?(jsonData)
//                            } catch let error {
//                                debugPrint(error.localizedDescription)
//                                handleFailure(handleError(message: AlertMessages.kGenericAPIError.rawValue, code: "11111", data: nil), "Unable to parse JSON.", nil)
//                            }
//
//                            debugPrint("\(dictionary)")
//                        }
//                    case .failure(let error):
//                        debugPrint(error.localizedDescription)
//                        handleFailure(handleError(message: error.localizedDescription, code: "\(error._code)", data: nil), "Unable to parse JSON.", error)
//                    }
//                }
//            case .failure(let error):
//                debugPrint(error.localizedDescription)
//                failureBlock?(CustomError(errorCode: "11111", errorMsg: error.localizedDescription, statusCode: 1111, data: [:])!)
//            }
//        }
//    }
//    

    
    
    /*
     Handle the sever error response codes
     
     @param statusCode The error status code
     @param error The error user info dictionary
     
     @return the error
     */
    fileprivate static func handleError(jsonDict: [String: AnyObject]?) -> CustomError? {
        let CustomError = CustomError()
        if jsonDict != nil {
            if let errorCode = jsonDict!["error_code"] as? String, errorCode != "" {
                CustomError.errorCode = errorCode
            }
            else if let statusCode = jsonDict!["statuscode"] as? Int64 {
                CustomError.errorCode = "\(statusCode)"
            }
            if let errorMsg = jsonDict!["message"] as? String, errorMsg != "" {
                CustomError.errorMsg = errorMsg
            }
            else if let errorMsg = jsonDict!["message"] as? String, errorMsg != "" {
                CustomError.errorMsg = errorMsg
            }
            
        }
        return CustomError
    }
    
    fileprivate static func handleError(message: String, code: String, data: Any?) -> CustomError {
        let CustomError = CustomError()
        CustomError.errorMsg = message
        CustomError.errorCode = code
        CustomError.data = data as? [String : Any] ?? [:]
        return CustomError
    }
    
    func URLforRoute(route: String,params:[String: String]) -> NSURL? {
        
        if let components: NSURLComponents  = NSURLComponents(string: (route)){
            var queryItems = [NSURLQueryItem]()
            for(key,value) in params {
                queryItems.append(NSURLQueryItem(name:key,value: value))
            }
            components.queryItems = queryItems as [URLQueryItem]?
            
            return components.url as NSURL?
        }
        return nil;
    }
}

