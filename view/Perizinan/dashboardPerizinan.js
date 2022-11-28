import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Keyboard,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DashboardPerizinan = ({navigation}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#274799',
          }}>
          <View style={styles.header}>
            <View style={styles.arrow}>
              <FontAwesomeIcon
                size={30}
                icon={faArrowLeft}
                color="#fff"
                onPress={() => {
                  navigation.navigate('NavigationBottom');
                }}
              />
            </View>
            <View style={styles.boxJudul}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Perizinan
              </Text>
            </View>
          </View>
          <View style={styles.boxIsi}>
            <Text style={{color: 'white', textAlign: 'justify'}}>
              Aplikasi ini berfungsi memberikan informasi kepada masyarakat
              terkait perizinan dari setiap PTSP dengan daftar perizinan yang
              ada di daerah tersebut. Aplikasi ini juga memberikan informasi
              terkait dengan potensi-potensi yang ada di daerah tersebut baik
              itu sector pariwisata, industry dan sumber daya alam.
            </Text>
          </View>
          <ScrollView
            style={styles.footer}
            showsVerticalScrollIndicator={false}>
            <View style={{margin: 20}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DaftarPerizinan');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/image/iconPerizinan/daftarPerizinan.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 15, color: '#4B4646'}}>
                    Daftar Perizianan
                  </Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="chevron-right" size={25} color="#A19C9C" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.boxKonten}
                onPress={() => {
                  navigation.navigate('Potensi');
                }}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/image/iconPerizinan/potensiPerizinan.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 15, color: '#4B4646'}}>
                    Potensi SDA dan Investasi
                  </Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="chevron-right" size={25} color="#A19C9C" />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const primaryColor = 'rgb(242, 69, 53)';
const disabledPrimaryColor = 'rgb(204, 88, 78)';
const styles = {
  header: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: hp('5%'),
  },
  arrow: {
    // borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 30,
  },
  boxJudul: {
    width: '80%',
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: 20,
    paddingRight: 10,
  },
  boxIsi: {
    // borderWidth: 1,
    marginTop: hp('3%'),
    marginLeft: 30,
    margin: 30,
  },
  footer: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F2F2F2',
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    // borderWidth: 1,
    marginRight: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  boxIconRight: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    // borderWidth: 1,
    justifyContent: 'center',
    height: '100%',
    width: '60%',
  },
  boxIconLeft: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DashboardPerizinan;
