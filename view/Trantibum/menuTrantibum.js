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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MenuTrantibum = ({navigation}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0323C4',
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
                Trantibum Linmas
              </Text>
            </View>
          </View>
          <View style={styles.boxIsi}>
            <Text style={{color: 'white', textAlign: 'left'}}>
              Layanan Trantibum Linmas adalah layanan masyarakat Reference site
              about Lorem Ipsum, giving information on its origins, as well as a
              random Lipsum generator. giving information on its origins, as
              well as a random Lipsum generator. giving information on its
              origins, as well as a random Lipsum generator.
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PeringatanDini');
              }}
              style={styles.boxKonten}>
              <View style={styles.boxIconRight}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/image/iconTrantibum/trantibumLokasi.png')}
                />
              </View>
              <View style={styles.boxText}>
                <Text style={{fontSize: 16}}>Peringatan Dini</Text>
              </View>
              <View style={styles.boxIconLeft}>
                <FontAwesome name="caret-right" size={35} color="#0323C4" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxKonten}
              onPress={() => {
                navigation.navigate('BuatPengaduan');
              }}>
              <View style={styles.boxIconRight}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/image/iconTrantibum/trantibumPengaduan.png')}
                />
              </View>
              <View style={styles.boxText}>
                <Text style={{fontSize: 16}}>Buat Pengaduan</Text>
              </View>
              <View style={styles.boxIconLeft}>
                <FontAwesome name="caret-right" size={35} color="#0323C4" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxKonten}
              onPress={() => {
                navigation.navigate('RiwayatPengaduan');
              }}>
              <View style={styles.boxIconRight}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/image/iconTrantibum/trantibumRiwayat.png')}
                />
              </View>
              <View style={styles.boxText}>
                <Text style={{fontSize: 16}}>Riwayat Pengaduan</Text>
              </View>
              <View style={styles.boxIconLeft}>
                <FontAwesome name="caret-right" size={35} color="#0323C4" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const primaryColor = 'rgb(242, 69, 53)';
const disabledPrimaryColor = 'rgb(204, 88, 78)';
const styles = {
  header: {
    // flex: 1,
    flexDirection: 'row',
    width: screenWidth,
  },
  arrow: {
    // borderWidth: 1,
    marginTop: 50,
    marginLeft: 30,
  },
  boxJudul: {
    // borderWidth: 1,
    marginTop: 50,
    paddingLeft: 30,
  },
  boxIsi: {
    // borderWidth: 1,
    marginLeft: 30,
    margin: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 30,
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
    elevation: 14,
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

export default MenuTrantibum;
