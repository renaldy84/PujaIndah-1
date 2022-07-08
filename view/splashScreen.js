import React from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SplashScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={require('../assets/image/logoPujaindah.png')}
          />
        </View>

        {/* <ActivityIndicator size="large" /> */}
        {/* <View style={styles.lingkaran}></View> */}
      </View>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#274799',
  },
  logo: {
    width: hp('20%'),
    height: hp('25%'),
    // marginTop: hp('25%'),
  },
  lingkaran: {
    marginTop: hp('80%'),
    position: 'absolute',
    flex: 1,
    // marginLeft: -wp('1%'),
    width: wp('100%'),
    height: wp('100%'),
    borderRadius: wp('100%') / 2,
    backgroundColor: '#1475D7',
  },
};
