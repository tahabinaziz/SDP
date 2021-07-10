import Foundation
import UIKit
import AVFoundation
import Toast_Swift
import NVActivityIndicatorView
import UserNotifications

@objc class Utility: NSObject
{
    static let main = Utility()
    fileprivate override init() {}
}


extension Utility {
    
    func roundAndFormatFloat(floatToReturn : Float, numDecimalPlaces: Int) -> String{
        
        let formattedNumber = String(format: "%.\(numDecimalPlaces)f", floatToReturn)
        return formattedNumber
    }
    func printFonts() {
        for familyName in UIFont.familyNames {
            print("\n-- \(familyName) \n")
            for fontName in UIFont.fontNames(forFamilyName: familyName) {
                print(fontName)
            }
        }
    }
    
    func resizeImage(image: UIImage,  targetSize: CGFloat) -> UIImage {
        
        guard (image.size.width > 1024 || image.size.height > 1024) else {
            return image;
        }
        
        // Figure out what our orientation is, and use that to form the rectangle
        var newRect: CGRect = CGRect.zero;
        
        if(image.size.width > image.size.height) {
            newRect.size = CGSize(width: targetSize, height: targetSize * (image.size.height / image.size.width))
        } else {
            newRect.size = CGSize(width: targetSize * (image.size.width / image.size.height), height: targetSize)
        }
        
        // Actually do the resizing to the rect using the ImageContext stuff
        UIGraphicsBeginImageContextWithOptions(newRect.size, false, 1.0)
        image.draw(in: newRect)
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage!
    }
    
    
    func thumbnailForVideoAtURL(url: URL) -> UIImage? {
        
        let asset = AVAsset(url: url)
        let assetImageGenerator = AVAssetImageGenerator(asset: asset)
        assetImageGenerator.appliesPreferredTrackTransform=true
        
        var time = asset.duration
        time.value = min(time.value, 2)
        
        do {
            let imageRef = try assetImageGenerator.copyCGImage(at: time, actualTime: nil)
            return UIImage(cgImage: imageRef)
        } catch {
            print("error")
            return nil
        }
    }
    
    
/*    func delay(delay:Double, closure:@escaping ()->()) {
        DispatchQueue.main.asyncAfter(
            deadline: DispatchTime.now() + Double(Int64(delay * Double(NSEC_PER_SEC))) / Double(NSEC_PER_SEC), execute: closure)
    }*/
    
    func delay(_ delay:Double, closure:@escaping ()->()) {
        let when = DispatchTime.now() + delay
        DispatchQueue.main.asyncAfter(deadline: when, execute: closure)
    }
    
    func showLabelIfNoData(withtext text: String, controller: UIViewController, collectionView: UICollectionView)
    {
        let messageLabel = UILabel(frame: CGRect(x: 0, y: 0, width: controller.view.bounds.size.width, height: controller.view.bounds.size.height))
        messageLabel.text = text
        messageLabel.textColor = UIColor.black
        messageLabel.numberOfLines = 0
        messageLabel.textAlignment = .center
        messageLabel.font = UIFont(name: "Palatino-Italic", size: 20) ?? UIFont()
        messageLabel.sizeToFit()
        
        collectionView.backgroundView = messageLabel;
    }
    
    func showLabelIfNoData(withtext text: String, controller: UIViewController, tableview: UITableView) {
        let messageLabel = UILabel(frame: CGRect(x: 0, y: 0, width: controller.view.bounds.size.width, height: controller.view.bounds.size.height))
        messageLabel.text = text
        messageLabel.textColor = UIColor.black
        messageLabel.numberOfLines = 0
        messageLabel.textAlignment = .center
        messageLabel.font = UIFont(name: "Palatino-Italic", size: 20) ?? UIFont()
        messageLabel.sizeToFit()
        tableview.backgroundView = messageLabel;
    }
    
    func json(from object:Any) -> String? {
        guard let data = try? JSONSerialization.data(withJSONObject: object, options: []) else {
            return nil
        }
        return String(data: data, encoding: String.Encoding.utf8)
    }
    
    // MARK: - LOCAL NOTIFICATION
    func setLocalNotification(with title: String, bodyText: String, identifier: String, timeIntervel: Double) {
        
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = bodyText
        content.sound = UNNotificationSound.default
        content.categoryIdentifier = identifier
        print("time Interval: \(timeIntervel)")
        
        let trigger = UNTimeIntervalNotificationTrigger.init(timeInterval: timeIntervel <= 0.0 ? 5.0 : timeIntervel, repeats: false) // if time intervel is zero, set default value of 5
        let request = UNNotificationRequest.init(identifier: identifier, content: content, trigger: trigger)
        
        let center = UNUserNotificationCenter.current()
        center.add(request)
    }
}

// MARK: - ALERT HELPER UTILITY
extension Utility
{
    func showAlert(message:String,title:String,controller:UIViewController){
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
        controller.present(alertController, animated: true, completion: nil)
    }
    
    func showAlertWithOptionalController(message:String,title:String,controller:UIViewController?) -> UIViewController?{
        if(controller == nil)
        {
            let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
            alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            
            return alertController
        }
        else
        {
            let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
            alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            controller!.present(alertController, animated: true, completion: nil)
            
            return nil
        }
    }
    
    func showAlert(message: String, title: String, controller: UIViewController, usingCompletionHandler handler:@escaping (() -> Swift.Void))
    {
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: {
            
            (action) in
            
            handler()
        }
        ))
        controller.present(alertController, animated: true, completion: nil)
    }
    
    func showAlert(message:String,title:String,controller:UIViewController, completionHandler: @escaping (UIAlertAction?, UIAlertAction?) -> Void){
        
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "YES", style: .default){ (alertActionYES) in
            completionHandler(alertActionYES, nil)
        })
        
        alertController.addAction(UIAlertAction(title: "NO", style: .cancel){ (alertActionNO) in
            completionHandler(nil, alertActionNO)
        })
        
        controller.present(alertController, animated: true, completion: nil)
        
    }
    
    func showAlert(message:String,title:String,controller:UIViewController, firstButtonText: String, secondButtonText: String, completionHandler: @escaping (UIAlertAction?, UIAlertAction?) -> Void){
        
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: firstButtonText, style: .default){ (alertActionYES) in
            completionHandler(alertActionYES, nil)
        })
        
        alertController.addAction(UIAlertAction(title: secondButtonText, style: .cancel){ (alertActionNO) in
            completionHandler(nil, alertActionNO)
        })
        
        controller.present(alertController, animated: true, completion: nil)
        
    }
    
    func showAlert(message:String,title:String){
        if var topController = UIApplication.shared.keyWindow?.rootViewController {
            while let presentedViewController = topController.presentedViewController {
                topController = presentedViewController
            }
            
            let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
            alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            topController.present(alertController, animated: true, completion: nil)
            
        }
    }
}


// MARK:- INDICATOR
extension Utility {
    func showLoader() {
//        UIApplication.shared.isNetworkActivityIndicatorVisible = true
//        let size = CGSize(width: 50, height: 50)
//        let bgColor = UIColor.clear//UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
//        let activityData = ActivityData(size: size, message: "", messageFont: UIFont.systemFont(ofSize: 12), type: .ballClipRotate, color: ColorSheet.THEME_DARK_BLUE , padding: 0, displayTimeThreshold: 0, minimumDisplayTime: 1, backgroundColor: bgColor, textColor: UIColor.black)
//        
//        NVActivityIndicatorPresenter.sharedInstance.startAnimating(activityData)
    }
    
    func hideLoader() {
//        UIApplication.shared.isNetworkActivityIndicatorVisible = false
//        NVActivityIndicatorPresenter.sharedInstance.stopAnimating()
    }
}
// MARK:- TOAST HELPER UTILITY
extension Utility {
    func showToast(message: String, controller: UIViewController) {
        // Show the message.
        controller.view.hideToastActivity()
        controller.view.makeToast(message, duration: 3.0, position: .center)
    }

    func showToast(message: String, controller: UIViewController, position: ToastPosition) {
        controller.view.hideToastActivity()
        controller.view.makeToast(message, duration: 3.0, position: position)
    }
    func showToast(message: String, controller: UIViewController, duration: TimeInterval) {
        controller.view.hideToastActivity()
        controller.view.makeToast(message, duration: duration, position: .center)
    }

    func showToasst(message: String, controller: UIViewController, duration: TimeInterval, postion: ToastPosition) {
        controller.view.hideToastActivity()
        controller.view.makeToast(message, duration: duration, position: postion)
    }
    
    func showToast(message: String) {
        let topController = UIApplication.shared.keyWindow?.rootViewController
        topController?.view.hideToastActivity()
        topController?.view.makeToast(message, duration: 3.0, position: .center)
    }
    
    
}
 

