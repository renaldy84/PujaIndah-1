import React from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/image/logoPuja.png')}
      />
      {/* <ActivityIndicator size="large" /> */}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E81ED',
  },
  logo: {
    width: 150,
    height: 200,
  },
};
