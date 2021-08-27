package com.openloginreactnativesdk

import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.openlogin.core.OpenLogin
import java.util.*

class OpenLoginReactNativeSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "OpenLoginReactNativeSdk"
  }

  private lateinit var openlogin: OpenLogin

  @ReactMethod
  fun init(clientId: String, network: String, redirectUrl: String, promise: Promise) {
    openlogin = OpenLogin(
      context = reactApplicationContext,
      clientId = clientId,
      network = OpenLogin.Network.valueOf(network.toUpperCase(Locale.ROOT)),
      redirectUrl = Uri.parse(redirectUrl)
    )
    promise.resolve(null)
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {
    promise.resolve(a * b)
  }
}
