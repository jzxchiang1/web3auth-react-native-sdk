import OpenLogin

@objc(OpenLoginReactNativeSdk)
class OpenLoginReactNativeSdk: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(init:withResolver:withRejecter:)
    func `init`(params: [String:String], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        guard
            let clientId = params["clientId"] as? String,
            let networkString = params["network"] as? String,
            let network = Network(rawValue: networkString)
        else {
            <#statements#>
        }
        resolve(null)
    }
    
    @objc(login:withResolver:withRejecter:)
    func login(params: [String:String], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(null)
    }
    
    @objc(logout:withResolver:withRejecter:)
    func logout(params: [String:String], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(null)
    }
}
