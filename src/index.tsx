import {NativeModules} from 'react-native';

type OpenLoginReactNativeSdkType = {
  login(params: { clientId: string, provider: LoginProvider, network: OpenLoginNetwork, }): Promise<{ privKey: string }>;
};

export enum LoginProvider {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  REDDIT = "reddit",
  DISCORD = "discord",
  TWITCH = "twitch",
  APPLE = "apple",
  LINE = "line",
  GITHUB = "github",
  KAKAO = "kakao",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  WEIBO = "weibo",
  WECHAT = "wechat",
  EMAIL_PASSWORDLESS = "email_passwordless",
  WEBAUTHN = "webauthn",
  JWT = "jwt",
}

export enum OpenLoginNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVELOPMENT = "development",
}

const {OpenLoginReactNativeSdk} = NativeModules;

export default OpenLoginReactNativeSdk as OpenLoginReactNativeSdkType;
