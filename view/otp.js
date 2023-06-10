import React, {useState} from 'react';
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
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function inputOtp({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const login = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {email === '' ? (
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/image/warning.png')}></Image>
            ) : (
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/image/success.png')}></Image>
            )}

            {email === '' ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Email Anda Kosong
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Email berhasil dikirim
              </Text>
            )}
            {email == '' ? (
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
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
            ) : (
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Login');
                }}
                style={{
                  backgroundColor: 'green',
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
                  Ok
                </Text>
              </Pressable>
            )}
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
          <FontAwesomeIcon
            size={30}
            icon={faArrowLeft}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        <View style={styles.boxLogin}>
          <Text style={styles.textLogin}>Masukkan Kode OTP</Text>
        </View>
        <View style={styles.boxChildLogin}>
          <Text style={styles.textChildLogin}>
            Silahkan masukkan kode OTP anda yang telah kami kirimkan melalui
            email.
          </Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <OTPInputView
              pinCount={4}
              style={styles.boxKode}
              autoFocusOnLoad
              codeInputFieldStyle={styles.fieldStyled}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
            {/* <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Email"></TextInput>
            </View> */}

            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={login}>
                <Text style={styles.textButton}>Kirim</Text>
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
    margin: 5,
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    fontWeight: 'bold',
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
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginLeft: 30,
    marginTop: hp('2%'),
    width: wp('90%'),
  },
  textChildLogin: {
    color: 'grey',
    fontSize: 12,
  },
  boxKode: {
    height: 50,
  },
  underlineStyleHighLighted: {
    borderBottomColor: '#01499F',
    borderBottomWidth: 2,
  },
  fieldStyled: {
    fontWeight: '600',
    fontSize: 24,
    color: '#323232',
  },
};
export default inputOtp;
