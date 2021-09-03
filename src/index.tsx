import { NativeModules, NativeEventEmitter } from 'react-native';

export interface AuthState {
  privKey: string;
  oAuthPrivateKey?: string;
  tKey?: string;
  walletKey?: string;
}

type OpenLoginReactNativeSdkType = {
  init(params: {
    clientId: string;
    network: OpenLoginNetwork;
    redirectUrl: string;
  }): Promise<void>;
  login(params: { provider: LoginProvider }): Promise<void>;
  logout(params: {}): Promise<void>;
  getState(): Promise<AuthState>;
};

const OpenLoginAuthStateChangedEvent = 'OpenLoginAuthStateChangedEvent';

export enum LoginProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  REDDIT = 'reddit',
  DISCORD = 'discord',
  TWITCH = 'twitch',
  APPLE = 'apple',
  LINE = 'line',
  GITHUB = 'github',
  KAKAO = 'kakao',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  WEIBO = 'weibo',
  WECHAT = 'wechat',
  EMAIL_PASSWORDLESS = 'email_passwordless',
  WEBAUTHN = 'webauthn',
  JWT = 'jwt',
}

export enum OpenLoginNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVELOPMENT = 'development',
}

const { OpenLoginReactNativeSdk } = NativeModules;

const eventEmitter = new NativeEventEmitter(OpenLoginReactNativeSdk);

const extension = {
  addOpenLoginAuthStateChangedEventListener: (
    listener: (state: AuthState) => void
  ) => {
    eventEmitter.addListener(OpenLoginAuthStateChangedEvent, listener);
  },
};

const sdk = OpenLoginReactNativeSdk as OpenLoginReactNativeSdkType;

export default { ...sdk, ...extension };
