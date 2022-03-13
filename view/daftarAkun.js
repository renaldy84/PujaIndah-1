import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

function daftarAkun({navigation}) {
  const dispatch = useDispatch();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [passwordUlang, setPasswordUlang] = useState('');
  const [idProvinsi, setIdProvinsi] = useState();
  const [idKota, setIdKota] = useState();
  const [idKecamata, setIdKecamatan] = useState();
  const [idKelurahan, setIdKelurahan] = useState();
  const [provinsi, setProvinsi] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordUlangVisible, setPasswordUlangVisible] = useState(true);
  const pilihProvinsi = [
    {id: 1, namaProvinsi: 'Jakarta'},
    {id: 2, namaProvinsi: 'Jawa Barat'},
    {id: 3, namaProvinsi: 'Jawa Tengah'},
    {id: 4, namaProvinsi: 'Jawa Timur'},
  ];

  const login = () => {
    navigation.navigate('Login');
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
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Email atau Password Anda Kosong
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
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
              navigation.navigate('MenuAwal');
            }}
          />
        </View>
        <View style={styles.boxLogin}>
          <Text style={styles.textLogin}>Daftar Akun</Text>
        </View>
        <View style={styles.boxChildLogin}>
          <Text style={styles.textChildLogin}>Sudah punya akun?</Text>
          <Text
            style={styles.textChildLogin1}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login
          </Text>
        </View>
        {/* <View style={styles.boxLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/healingcircle.png')}></Image>
        </View> */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Nama</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Email"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Nomor Induk Kependudukan (NIK)</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="NIK"></TextInput>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Password</Text>
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
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Konfirmasi Password</Text>
            </View>
            <View style={styles.boxInputPassword}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={passwordUlangVisible}
                  onChangeText={val => setPasswordUlang(val)}
                  placeholder="Password"></TextInput>
              </View>

              <View style={{justifyContent: 'center'}}>
                {passwordUlangVisible ? (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEyeSlash}
                    onPress={() => {
                      setPasswordUlangVisible(!passwordUlangVisible);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    size={30}
                    icon={faEye}
                    onPress={() => {
                      setPasswordUlangVisible(!passwordUlangVisible);
                    }}
                  />
                )}
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Provinsi</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idProvinsi}
                onValueChange={(itemValue, itemIndex) => {
                  setIdProvinsi(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Provinsi"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Jakarta"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Barat"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Tengah"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Timur"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kabupaten/Kota</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idKota}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKota(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kabupaten/Kota"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Jakarta"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Barat"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Tengah"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Timur"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kecamatan</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idKecamata}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKecamatan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kecamatan"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Jakarta"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Barat"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Tengah"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Timur"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kelurahan/Desa</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idKelurahan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKelurahan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kelurahan/Desa"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Jakarta"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Barat"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Tengah"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Jawa Timur"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>

            {/* <View style={styles.lupa}>
              <Text
                style={styles.textChildLogin1}
                onPress={() => {
                  navigation.navigate('LupaPassword');
                }}>
                Lupa kata sandi?
              </Text>
            </View> */}
            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={login}>
                <Text style={styles.textButton}>Daftar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
  },
  boxInputPassword: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
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
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 10,
  },
  textChildLogin: {
    color: 'grey',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  textChildLogin1: {
    marginLeft: 10,
    color: 'blue',
    fontSize: 16,
  },
  lupa: {
    marginTop: 10,
    // borderWidth: 1,
    // flex: 1,
    borderColor: 'grey',
    width: '100%',
    alignItems: 'flex-end',
  },

  drbDown: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: '100%',
    margin: 10,
    marginBottom: 0,
    padding: 10,
    color: '#000000',
  },
};
export default daftarAkun;
