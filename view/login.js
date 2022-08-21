import React, {useState, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import url from '../config';
import {BallIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function login({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const login = async () => {
    // let token = null;
    // let username = 'vishal';
    // let password = '1234';
    // if (username === 'vishal' && password == '1234') {
    //   token = username + password;
    //   // here we can use login api to get token and then store it
    //   await AsyncStorage.setItem('token', token);
    //   console.log('token stored');
    // }
    // dispatch({
    //   type: 'LOGIN',
    //   payload: token,
    // });
    setModalLoading(true);
    Axios({
      url: url + '/api/auth/login',
      method: 'post',
      timeout: 1000 * 5,
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        console.log('responLogin', res.data);
        setModalLoading(false);
        try {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('token', res.data.data.api_token);
        } catch (error) {}
        dispatch({type: 'LOGIN', payload: res.data.data.api_token});
        dispatch({type: 'RESPON_LOGIN', payload: res.data});
      })
      .catch(error => {
        setModalVisible(true);
        setMessage(error.response.data.message);
        setModalLoading(false);
      });
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/warning.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                {message}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                setMessage('');
              }}
              style={{
                backgroundColor: '#ff0000',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modalLoading}>
        <View style={styles.centeredView}>
          <View>
            <View style={{alignItems: 'center'}}>
              <BallIndicator color="white" />
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          // margin: 20,
          flex: 1,
          resizeMode: 'cover',
          // justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View style={styles.arrow}>
          {/* <FontAwesomeIcon
            size={30}
            icon={faArrowLeft}
            onPress={() => {
              navigation.navigate('MenuAwal');
            }}
          /> */}
        </View>
        <View style={styles.boxLogin}>
          <Text style={styles.textLogin}>Log in</Text>
        </View>
        <View style={styles.boxChildLogin}>
          <Text style={styles.textChildLogin}>Belum punya akun?</Text>
          <Text
            style={styles.textChildLogin1}
            onPress={() => {
              navigation.navigate('DaftarAkun');
            }}>
            Daftar
          </Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Email"></TextInput>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.text}>Kata Sandi</Text>
            </View>
            <View style={styles.boxInputPassword}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={passwordVisible}
                  onChangeText={val => setPassword(val)}
                  placeholder="Password"></TextInput>
              </View>
              <View style={{justifyContent: 'center'}}>
                {passwordVisible ? (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEyeSlash}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEye}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                )}
              </View>
            </View>
            <View style={styles.lupa}>
              <Text
                style={styles.textChildLogin1}
                onPress={() => {
                  navigation.navigate('LupaPassword');
                }}>
                Lupa kata sandi?
              </Text>
            </View>
            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={login}>
                <Text style={styles.textButton}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = {
  container: {
    marginTop: hp('8%'),
    margin: 30,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  boxInputPassword: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  buttonLogin: {
    borderRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  boxButton: {
    width: '100%',
    marginTop: hp('5%'),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080a1a99',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  arrow: {
    marginTop: hp('5%'),
    marginLeft: 30,
  },
  boxLogin: {
    marginLeft: 30,
    marginTop: hp('2%'),
  },
  textLogin: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  boxChildLogin: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: hp('2%'),
  },
  textChildLogin: {
    color: 'grey',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  textChildLogin1: {
    marginLeft: 10,
    color: '#274799',
    fontSize: 16,
  },
  lupa: {
    marginTop: hp('2%'),
    // borderWidth: 1,
    // flex: 1,
    borderColor: 'grey',
    width: '100%',
    alignItems: 'flex-end',
  },
};
export default login;
