import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CarauselHeader from './carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

function home({navigation}) {
  const dispatch = useDispatch();
  const responLogin = useSelector(state => state.responLogin);
  // const logout = () => {
  //   dispatch({type: 'LOGOUT'});
  // };

  useEffect(async () => {
    console.log(responLogin);
    console.log('ini token dari local', await AsyncStorage.getItem('token'));
  });
  return (
    <>
      <View style={styles.containerHeader}>
        <View style={styles.child1}>
          <View>
            <Image
              source={{
                uri: responLogin.profilPic,
              }}
              style={{
                width: 50,
                height: 50,
                marginLeft: 15,
                // aspectRatio: 2,
                // resizeMode: 'contain',
                borderRadius: 30,
              }}
            />
          </View>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 20,
                color: 'white',
              }}>
              Hi, {responLogin.name}
            </Text>
          </View>
          <View style={{justifyContent: 'center', flex: 1}}>
            <View
              style={{
                alignItems: 'flex-end',
                // borderWidth: 1,
              }}>
              <Fontisto
                color="white"
                size={30}
                name="bell"
                onPress={() => {
                  // logout();
                  // navigation.navigate('MenuTrantibum');
                }}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -5,
                  right: -8,
                }}>
                <Text
                  style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                  2
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <CarauselHeader />
        <View style={[styles.iconMenuBOX]}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MenuTrantibum');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/trantibum.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Trantibum{'\n'}Limnas</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ListPariwisata');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/pariwisata.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Pariwisata{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardPekerjaanUmum');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/pekerjaanUmum.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Pekerjaan{'\n'}Umum</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardPerhubungan');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/perhubungan.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Perhubungan{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardSosial');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/sosial.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Sosial{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('History Absensi');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/aspirasi.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Aspirasi{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardKetenagakerjaan');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/ketenagakerjaan.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Ketenagakerjaan{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('History Absensi');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/komoditas.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Komoditas{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('History Absensi');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/perizinan.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Perizinan{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('History Absensi');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/kependudukan.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Kependudukan{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardKesehatan');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/kesehatan.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Kesehatan{'\n'}</Text>
              </View>
            </View>
            <View style={[styles.boxIcon]}>
              <View
                style={{
                  // borderWidth: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginLeft: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DashboardPendidikan');
                  }}
                  style={[styles.iconMenuContainer]}>
                  <Image
                    style={styles.iconMenuImage}
                    source={require('../assets/image/newIcon/pendidikan.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.iconMenuText}>Pendidikan{'\n'}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = {
  containerHeader: {
    backgroundColor: '#274799',
    alignItems: 'center',
  },
  child1: {
    width: wp('90%'),
    flexDirection: 'row',
    margin: 20,
    paddingRight: 20,
    // borderWidth: 1,
  },
  iconMenuBOX: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: -hp('2%'),
    backgroundColor: 'white',
    // borderWidth: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  // iconMenuContainer: {
  //   backgroundColor: 'white',
  //   height: 62,
  //   width: 72,
  //   borderTopLeftRadius: 50,
  //   borderTopRightRadius: 50,
  //   borderBottomLeftRadius: 50,
  //   borderBottomRightRadius: 20,
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
  // },
  iconMenuContainer: {
    // borderWidth: 1,
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconMenuImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 20,
  },
  boxText: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 2,
  },
  iconMenuText: {
    flex: 1,
    width: wp('25%'),
    textAlign: 'center',
    fontSize: RFPercentage(1.5),
    color: 'grey',
    // borderWidth: 1,
  },
  boxIcon: {
    // borderWidth: 1,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    // marginRight: hp('1%'),
    // marginLeft: hp('1%'),
  },
};
export default home;
