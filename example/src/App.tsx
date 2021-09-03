import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import OpenLoginReactNativeSdk, {
  AuthState,
  LoginProvider,
  OpenLoginNetwork,
} from 'openlogin-react-native-sdk';

export default function App() {
  const [authState, setAuthState] = React.useState<Partial<AuthState>>({});

  React.useEffect(() => {
    OpenLoginReactNativeSdk.addOpenLoginAuthStateChangedEventListener(
      setAuthState
    );
    OpenLoginReactNativeSdk.init({
      clientId:
        'BFDssx7rrb7p90lZ9l28PxB9fcIIai81pmOaMt1rMwzyQ-uWuG2srWRK_07Y55cNWbv2qVXVXNM-OXCW95c3TuQ',
      network: OpenLoginNetwork.TESTNET,
      redirectUrl: 'com.example.openloginreactnativesdk://auth',
    }).catch((err) => console.error(err));
  }, []);

  // React.useEffect(() => {
  //   // OpenloginReactNativeSdk.multiply(3, 7).then(setResult);
  // }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() =>
          OpenLoginReactNativeSdk.login({
            provider: LoginProvider.GOOGLE,
          }).catch(console.error)
        }
      />
      <Button
        title="Logout"
        onPress={() =>
          OpenLoginReactNativeSdk.logout({
            provider: LoginProvider.GOOGLE,
          }).catch(console.error)
        }
      />
      <Text>Result: {JSON.stringify(authState)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
