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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function home({navigation}) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({type: 'LOGOUT'});
  };

  return (
    <>
      <View style={styles.containerHeader}>
        <View
          style={{
            width: wp('80%'),
            // borderWidth: 1,
            marginTop: 30,
            // marginRight: 50,
            alignItems: 'flex-end',
          }}>
          <Fontisto
            color="white"
            size={30}
            name="bell"
            onPress={() => {
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
            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
              2
            </Text>
          </View>
        </View>
        <View style={styles.child1}>
          <View>
            <Image
              source={{
                uri: 'https://blogger.googleusercontent.com/img/a/AVvXsEisUBhb8W_4oOgwJmAGcw_131KKxTtzyX28LkAhuG7-nDSGb3XGeLxrLXEombzEpKKN2GDsPvBPFQmQBUGiO_W0-KQSF-Uz686SJQiCTwiH3zHdv8Dc4WmNzq8prp8c6EGV_QRZBc6hCV-e7mEwzQYx0FdttYEWYboMnwJEmJiDz3nP-V6nTQ9tORHdyA=s16000',
              }}
              style={{
                width: 60,
                height: 60,
                marginLeft: 0,
                // aspectRatio: 2,
                // resizeMode: 'contain',
                borderRadius: 30,
              }}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 20,
                color: 'white',
              }}>
              Hi, Dara
            </Text>
          </View>
          {/* <View
            style={{
              borderWidth: 1,
              width: '50%',
              flexDirection: 'row',
              height: '100%',
            }}>
            <Text>
              asbdhjasbdhasbdhasdbjsahdjashgdjsahdgajshdgashgdhjasgdjahsgd
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: '50%',
              flexDirection: 'row',
              height: '100%',
            }}>
            <Text>
              asjdhgjasbdkjashdkjasdjkasndkjas xjansbcjkasjdbasj
              cjkabsdjasndkjas kajs
            </Text>
          </View> */}
        </View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <CarauselHeader />
        <View style={[styles.iconMenuBOX, {margin: 10, marginBottom: 20}]}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MenuTrantibum');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#ECF0DC'},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/trantibum.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Trantibum Limnas</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ListPariwisata');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#DCEFF0'},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/pariwisata.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Pariwisata</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#FFF38B'},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/pekerjaan_umum.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Pekerjaan Umum</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#C7E1FF', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/perhubungan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Perhubungan</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#EBFFC2', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/sosial.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Sosial</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#8BDCFF', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/aspirasi.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Aspirasi</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#00F0F0', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/ketenagakerjaan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Ketenagakerjaan</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#DCEFF0', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/komoditas.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Komoditas</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#EDEDED', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/perizinan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Perizinan</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#DAF899', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/kependudukan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Kependudukan</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#C2FFD3', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/kesehatan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Kesehatan</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('History Absensi');
                }}
                style={[
                  styles.iconMenuContainer,
                  {backgroundColor: '#28A16E', marginTop: 30},
                ]}>
                <Image
                  style={styles.iconMenuImage}
                  source={require('../assets/image/iconpng/pendidikan.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconMenuText}>Pendidikan</Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <View
            style={{
              backgroundColor: 'red',
              width: 150,
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
            }}>
            <TouchableOpacity onPress={() => logout()}>
              <Text
                style={{
                  fontFamily: 'helvetica-rounded-bold',
                  fontSize: 14,
                  color: 'white',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </>
  );
}

const styles = {
  containerHeader: {
    backgroundColor: '#0323C4',
    height: '20%',
    alignItems: 'center',
  },
  child1: {
    width: wp('90%'),
    // borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbf3fa',
  },
  iconMenuBOX: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: -40,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
    justifyContent: 'center',
  },
  iconMenuContainer: {
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 13.16,
    // elevation: 20,
    height: 62,
    width: 72,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 15,
    margin: 20,
  },

  iconMenuImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  iconMenuText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
    marginTop: -5,
    marginBottom: 15,
  },
};
export default home;
