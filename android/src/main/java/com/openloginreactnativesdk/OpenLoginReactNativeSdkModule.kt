package com.openloginreactnativesdk

import android.app.Activity
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openlogin.core.OpenLogin
import java.lang.Exception
import java.util.*
import com.facebook.react.bridge.WritableMap

import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.openlogin.core.AuthStateChangeListener


// Quick note on allowing RN Modules to receive Activity Events
// https://stackoverflow.com/questions/45744013/onnewintent-is-not-called-on-reactcontextbasejavamodule-react-native

class OpenLoginReactNativeSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "OpenLoginReactNativeSdk"
  }


  private fun sendEvent(reactContext: ReactContext,
                        eventName: String,
                        params: WritableMap?) {
    reactContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  private lateinit var openlogin: OpenLogin

  @ReactMethod
  fun init(params: ReadableMap, promise: Promise) = try {
    val clientId = params.getString("clientId") as String
    val network = params.getString("network") as String
    val redirectUrl = params.getString("redirectUrl")
    openlogin = OpenLogin(
      context = reactApplicationContext,
      clientId = clientId,
      network = OpenLogin.Network.valueOf(network.toUpperCase(Locale.ROOT)),
      redirectUrl = Uri.parse(redirectUrl ?: "${reactApplicationContext!!.packageName}://auth")
    )
    openlogin.addAuthStateChangeListener(AuthStateChangeListener {
      val map = Arguments.createMap()
      map.putString("oAuthPrivateKey", it.oAuthPrivateKey)
      map.putString("privKey", it.privKey)
      map.putString("tKey", it.tKey)
      map.putString("walletKey", it.walletKey)

      sendEvent(reactApplicationContext, "OpenLoginAuthStateChangedEvent", map)
    })

    openlogin.setResultUrl(reactApplicationContext.currentActivity?.intent?.data)
    reactApplicationContext.addActivityEventListener(object : ActivityEventListener {
      override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {}

      override fun onNewIntent(p0: Intent?) {
        openlogin.setResultUrl(p0?.data)
      }
    })
    promise.resolve(null)
  } catch (e: Exception) {
    promise.reject(e)
  }

  @ReactMethod
  fun login(params: ReadableMap, promise: Promise) {
    try {
      val provider = params.getString("provider") as String
      openlogin.login(loginProvider = OpenLogin.Provider.valueOf(provider.toUpperCase(Locale.ROOT)))
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun logout(params: ReadableMap, promise: Promise) {
    try {
      openlogin.logout()
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

}
