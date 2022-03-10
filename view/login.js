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

function login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const login = () => {
    if (email === '123456' && password === '123456') {
      dispatch({type: 'LOGIN'});
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/warning.png')}></Image>
            {email === '' || password === '' ? (
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Email atau Password Anda Kosong
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Email atau Pasword Anda Salah
              </Text>
            )}

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                backgroundColor: '#ff0000',
                marginTop: 20,
                borderRadius: 10,
                width:100,
                alignItems:'center'
              }}>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
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

      <ImageBackground
        style={{flex: 1, resizeMode: 'cover',justifyContent: 'center'}}
        source={require('../assets/image/original.gif')} imageStyle={{opacity: 0.98}}>
        <View style={styles.boxLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/healingcircle.png')}></Image>
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
          <View style={{marginTop: 25}}>
            <Text style={styles.text}>Password</Text>
          </View>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={val => setPassword(val)}
              placeholder="Password"></TextInput>
          </View>
          <View style={styles.boxButton}>
            <TouchableOpacity style={styles.buttonLogin} onPress={login}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    marginTop:35
  },
  logo: {
    width: 150,
    height: 150,
  },
  container: {
    marginTop: 50,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: 250,
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
    width: 150,
    height: 45,
    backgroundColor: '#bd59d5',
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
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
    margin: 5,
    color:'#ffffff'
  },
  textInput: {
    marginLeft: 10,
    fontFamily: 'JosefinSans-Bold',
    fontSize: 20,
    color: '#000000',
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontFamily: 'JosefinSans-Bold',
    fontSize: 14,
    color:'#ffffff'
  },
  boxButton: {
    margin: 10,
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
};
export default login;
