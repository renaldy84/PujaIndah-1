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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

function lupaPassword({navigation}) {
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
                    ffontWeight: 'bold',
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
          <Text style={styles.textLogin}>Lupa Kata Sandi</Text>
        </View>
        <View style={styles.boxChildLogin}>
          <Text style={styles.textChildLogin}>
            Silahkan masukkan alamat email anda saat mendaftar
          </Text>
        </View>
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

          <View style={styles.boxButton}>
            <TouchableOpacity style={styles.buttonLogin} onPress={login}>
              <Text style={styles.textButton}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = {
  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },
  boxLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  logo: {
    width: 150,
    height: 150,
  },
  container: {
    marginTop: 70,
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
    backgroundColor: '#246EE9',
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
    marginTop: 40,
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
    marginTop: 50,
    marginLeft: 30,
  },
  boxLogin: {
    marginLeft: 30,
    marginTop: 30,
  },
  textLogin: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  boxChildLogin: {
    marginLeft: 30,
    marginTop: 10,
  },
  textChildLogin: {
    color: 'grey',
    fontSize: 12,
  },
};
export default lupaPassword;
