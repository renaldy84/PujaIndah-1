import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {faClock} from '@fortawesome/free-regular-svg-icons';

function UbahPassword({navigation}) {
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [passwordUlangi, setPasswordUlangi] = useState('');
  const [passwordVisibleLama, setPasswordVisibleLama] = useState(true);
  const [passwordVisibleBaru, setPasswordVisibleBaru] = useState(true);
  const [passwordVisibleUlangi, setPasswordVisibleUlangi] = useState(true);

  return (
    <>
      <View
        style={{
          flex: 1,
          resizeMode: 'cover',
          // justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: hp('5%'),
            height: hp('10%'),
            backgroundColor: '#274799',
            alignItems: 'center',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('NavigationBottom');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Ubah Password
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>
                Password Sebelumnya / Password Saat ini
              </Text>
            </View>
            <View style={styles.boxInputPassword}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={passwordVisibleLama}
                  onChangeText={val => setPasswordLama(val)}
                  placeholder="Password Sebelumnya"></TextInput>
              </View>
              <View style={{justifyContent: 'center'}}>
                {passwordVisibleLama ? (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEyeSlash}
                    onPress={() => {
                      setPasswordVisibleLama(!passwordVisibleLama);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEye}
                    onPress={() => {
                      setPasswordVisibleLama(!passwordVisibleLama);
                    }}
                  />
                )}
              </View>
            </View>
            <View>
              <Text style={styles.text}>Password Baru</Text>
            </View>

            <View style={styles.boxInputPassword}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={passwordVisibleBaru}
                  onChangeText={val => setPasswordBaru(val)}
                  placeholder="Password Baru"></TextInput>
              </View>
              <View style={{justifyContent: 'center'}}>
                {passwordVisibleBaru ? (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEyeSlash}
                    onPress={() => {
                      setPasswordVisibleBaru(!passwordVisibleBaru);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEye}
                    onPress={() => {
                      setPasswordVisibleBaru(!passwordVisibleBaru);
                    }}
                  />
                )}
              </View>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>
                Konfirmasi Password / Ketik Ulang Password Baru
              </Text>
            </View>
            <View style={styles.boxInputPassword}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={passwordVisibleUlangi}
                  onChangeText={val => setPasswordUlangi(val)}
                  placeholder="Konfirmasi Password "></TextInput>
              </View>
              <View style={{justifyContent: 'center'}}>
                {passwordVisibleUlangi ? (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEyeSlash}
                    onPress={() => {
                      setPasswordVisibleUlangi(!passwordVisibleUlangi);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEye}
                    onPress={() => {
                      setPasswordVisibleUlangi(!passwordVisibleUlangi);
                    }}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: hp('3%'),
                marginBottom: hp('5%'),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={() => {
                    // navigation.navigate('InformasiSiswa');
                  }}>
                  <Text style={styles.textButton}>Ubah Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: wp('95%'),
    paddingHorizontal: 15,
  },
  arrow: {
    marginLeft: 30,
  },
  boxJudul: {
    marginLeft: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonLogin: {
    borderRadius: 5,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    borderRadius: 10,
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    margin: 5,
    marginTop: 15,
    color: 'black',
  },

  boxInputPassword: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
  },
});
export default UbahPassword;
