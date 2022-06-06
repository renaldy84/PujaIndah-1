import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCaretDown,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import url from '../config';
import {ActivityIndicator} from 'react-native-paper';
import {BallIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function daftarAkun({navigation}) {
  const dispatch = useDispatch();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [passwordUlang, setPasswordUlang] = useState('');
  //Provinsi
  const [provinsi, setProvinsi] = useState([]);
  const [idProvinsi, setIdProvinsi] = useState();
  const [namaProvinsi, setNamaProvinsi] = useState();
  //Kota
  const [kota, setKota] = useState([]);
  const [idKota, setIdKota] = useState();
  const [namaKota, setNamaKota] = useState();
  //Kecamatan
  const [kecamatan, setKecamatan] = useState([]);
  const [idKecamata, setIdKecamatan] = useState();
  const [namaKecamatan, setNamaKecamatan] = useState();
  //Kelurahan
  const [kelurahan, setKelurahan] = useState([]);
  const [idKelurahan, setIdKelurahan] = useState();
  const [namaKelurahan, setNamaKelurahan] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordUlangVisible, setPasswordUlangVisible] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState('');

  const pilihProvinsi = [
    {id: 1, namaProvinsi: 'Jakarta'},
    {id: 2, namaProvinsi: 'Jawa Barat'},
    {id: 3, namaProvinsi: 'Jawa Tengah'},
    {id: 4, namaProvinsi: 'Jawa Timur'},
  ];

  const login = () => {
    navigation.navigate('Login');
  };

  //Provinsi
  const getProvinsi = () => {
    Axios({
      url: url + `/api/master/m-daerah/getall?order=nama+asc&tingkat=1`,
      method: 'get',
    })
      .then(response => {
        setProvinsi(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Kabupaten/Kota
  const getKota = idProv => {
    Axios({
      url:
        url +
        `/api/master/m-daerah/getall?order=nama+asc&tingkat=2&m_daerah_id=${idProv}`,
      method: 'get',
    })
      .then(response => {
        setKota(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Kecamatan
  const getKecamatan = idKot => {
    Axios({
      url:
        url +
        `/api/master/m-daerah/getall?order=nama+asc&tingkat=3&m_daerah_id=${idKot}`,
      method: 'get',
    })
      .then(response => {
        setKecamatan(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getKelurahan = idKec => {
    Axios({
      url:
        url +
        `/api/master/m-daerah/getall?order=nama+asc&tingkat=4&m_daerah_id=${idKec}`,
      method: 'get',
    })
      .then(response => {
        setKelurahan(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const daftar = () => {
    setModalLoading(true);
    Axios({
      url: url + '/api/auth/register',
      method: 'post',
      data: {
        provinsi_id: Number(idProvinsi),
        kabkot_id: Number(idKota),
        kecamatan_id: Number(idKecamata),
        deskel_id: Number(idKelurahan),
        nik: nik,
        name: nama,
        email: email,
        password: password,
        password_confirmation: passwordUlang,
      },
    })
      .then(res => {
        console.log(res);
        setModalLoading(false);
        setModalVisibleSukses(true);
        setMessage(res.data.message);
      })
      .catch(err => {
        console.log(nama);
        setModalVisible(true);
        console.log(err.response.data);
        setModalLoading(false);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    getProvinsi();
  }, []);
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSukses}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/success.png')}></Image>

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
                navigation.navigate('Login');
                setModalVisibleSukses(!modalVisibleSukses);
                setIdProvinsi('');
                setIdKota('');
                setIdKecamatan('');
                setIdKelurahan('');
                setNik('');
                setNama('');
                setEmail('');
                setPassword('');
                setPasswordUlang('');

                // setMessage('');
              }}
              style={{
                backgroundColor: '#246EE9',
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
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredViewModal}>
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
        <View style={styles.centeredViewModal}>
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
            source={require('../assets/PujaIndahcircle.png')}></Image>
        </View> */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Nama</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                value={nama}
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                value={email}
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Email"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Nomor Induk Kependudukan (NIK)</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                value={nik}
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
                  value={password}
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
                  value={passwordUlang}
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
                mode="dropdown"
                selectedValue={idProvinsi}
                onValueChange={(itemValue, itemIndex) => {
                  setIdProvinsi(itemValue);
                  getKota(itemValue);
                  setIdKota('');
                  setIdKecamatan('');
                  setIdKelurahan('');
                }}>
                <Picker.Item
                  label="Pilih Provinsi"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                {provinsi.map(val => {
                  return (
                    <Picker.Item
                      key={val.id}
                      label={val.nama}
                      value={val.id}
                      style={{color: '#000000'}}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kabupaten/Kota</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKota}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKota(itemValue);
                  getKecamatan(itemValue);
                  setIdKecamatan('');
                  setIdKelurahan('');
                }}>
                <Picker.Item
                  label="Pilih Kabupaten/Kota"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                {kota.map(val => {
                  return (
                    <Picker.Item
                      key={val.id}
                      label={val.nama}
                      value={val.id}
                      style={{color: '#000000'}}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kecamatan</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKecamata}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKecamatan(itemValue);
                  getKelurahan(itemValue);
                  setIdKelurahan('');
                }}>
                <Picker.Item
                  label="Pilih Kecamatan"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                {kecamatan.map(val => {
                  return (
                    <Picker.Item
                      key={val.id}
                      label={val.nama}
                      value={val.id}
                      style={{color: '#000000'}}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kelurahan/Desa</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKelurahan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKelurahan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kelurahan/Desa"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                {kelurahan.map(val => {
                  return (
                    <Picker.Item
                      key={val.id}
                      label={val.nama}
                      value={val.id}
                      style={{color: '#000000'}}
                    />
                  );
                })}
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
              <TouchableOpacity style={styles.buttonLogin} onPress={daftar}>
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
  centeredViewModal: {
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

  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },
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
    backgroundColor: '#2F80ED',
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
    color: '#2F80ED',
    fontSize: 16,
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
