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
import LinearGradient from 'react-native-linear-gradient';

function menuAwal() {
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
      <View style={{flex: 1, backgroundColor: '#246EE9'}}>
        <LinearGradient
          colors={['#116FD5', '#2288E5', '#369FF4']}
          style={styles.lingkaran1}>
          <LinearGradient
            colors={['#116FD5', '#2288E5', '#369FF4']}
            style={styles.lingkaran2}></LinearGradient>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = {
  lingkaran1: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    height: 400,
    width: 400,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: -100,
  },
  lingkaran2: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 100,
  },
};
export default menuAwal;
