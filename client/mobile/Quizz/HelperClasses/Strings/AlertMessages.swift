//
//  AlertMessages.swift
//  Quizz
//
//  Created by Ahmed Shahid on 23/06/2021.
//

import Foundation

enum AlertMessages: String {
    
    // generic api
    case kGenericNetworkError = "The internet connection appears to be offline"
    case kGenericAPIError = "Unable to load"
    
    // login/profile
    case cityNull = "Please select your city."
    case phoneNumberNotAvailable = "Please enter phone number"
    case phoneNumberInvalid = "your entered phone is incorrect."
    case firstNameNotAvailable = "Please enter your first name."
    case lastNameNotAvailable = "Please enter your last name."
    case nameNotAvailable = "Please enter name"
    case emailAddressNotAvailable = "Please enter your email address."
    case emailAddressInvalid = "Please enter valid email address."
    case passwordNotAvailable = "Please set your password."
    case passwordInvalid = "Password should be more then 6 charactor."
    case confirmPasswordNotAvailable = "Please confirm your password"
    case confirmPasswordInvalid = "The confirm password confirmation does not match"
    case specialityNotAvailable = "Please select your speciality."
    case medicalCollegeNotAvailable = "Please enter your medical college."
    case pmdcNumberNotAvailable = "Please enter your PMDC number."
    case pmdcCertificateNotAvailable = "Please select your PMDC Certificate."
    case unableToSignIn = "Sorry, we are unable to sign you in at this time. Please try again or later."
    case enterVerificationCode = "Please enter verification code"
    case otpSend = "We have send you a message with code. Please check your message"
    case logoutMessage = "Are you sure you want to logout?"
    case editProfileFail = "Unable to edit profile at this moment, please try again or later"
    case resetPasswordSucessful = "Password reset successful"
    
    case cantFetchcompetitor = "Unable to fetch competitor at this time, please try agian or later"
    case cantFetchReviews = "Unable to fetch reviews at this time, please try again or later"
    case cantDeleteReview = "Unable to delete review at this time, please try again or later"
    case sureWantToDelete = "Are you sure want to delete this review?"
    
    case clinicNotAvailable = "Please select clinic."
    case dateNotAvailable = "Please select date."
    case timeNotAvailable = "Please select time."
    
    case leavesAdded = "Leaves Added Successfully."
    case deleteLeave = "Are you sure want to delete this?"
    case BookingSuccess = "Appointment has been booked"
    
    case NotificationSuccess = "Successfully Updated"
    case commentSuccess = "Comment added successfully."
    
    case videoCallBack = "Going back will end you call, are you sure want to end your call?"
    case referNameNotAvailable = "Please enter referral name."
    case referEmailNotAvailable = "Please enter referral email"
    case successReferADoctor = "Referral added successfully."
    // Profile
    case titleNotAvailable = "Please enter your title"
    case headlineNotAvailable = "Please enter your headline"
    case updateProfileSuccess = ""
    case organizationNotAvailable = "Please enter organization."
    case startDateNotAvailable = "Please select start date."
    case endDateNotAvailable = "Please select end date."
    case updateExperinece = "Experience updated successfully."
    case addExperinece = "Experience added successfully."
    case addLanguage = "Language added successfully."
    case addService = "Service added successfully."
    case addSpecialization = "Specialization added successfully."
    case emailChange = "Email changed successfully."
    case passwordChange = "Password changed successfully."
    case clinicNameNotAvailable = "Please enter clinic name"
    case addressNotAvailable = "Please enter your address"
    case provinceNotAvailable = "Please select province"
    case areaNotAvailable = "Please select area."
    case consultationFeeNotAvailable = "Please enter consultation fee."
    case consultationAddedSucces = "Consultation added successfully."
    case PASuccess = "Personal Assistant added successfully."
    case registrationSuccess = "Thanks for registering as doctor, we'll review your account shortly"
    case deleteConsultationSuccess = "Clinic deleted successfully"
    case deleteExperienceSuccess = "Experience deleted successfully"
    case deleteEducationSuccess = "Education deleted successfully"
    case deleteExperience = "Are you sure want to delete this experience?"
    case deleteClinic = "Are you sure want to delete this clinic?"
    case deleteEducation = "Are you sure want to delete this Education?"
    case imageNotAvailable = "Please select image."
    case imageUploadSuccess = "Image uploaded successfully."
    func value() -> String {
        return self.rawValue
    }
}

enum AlertTitles: String {
    case warning = "Warning"
    case success = "Success"
    func value() -> String {
        return self.rawValue
    }
}

