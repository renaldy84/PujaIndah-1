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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCamera,
  faFolderOpen,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import url from '../../config';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {BallIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

function FormBuatAspirasi({navigation}) {
  const modalizeRef = useRef(null);
  const modalizeRefKTP = useRef(null);
  const [modalHandleFoto, setModalHandleFoto] = useState(false);
  const [nama, setNama] = useState('');
  const [nkk, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [telp, setTelp] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [idDinasTerkait, setIdDinasTerkait] = useState('');
  const [judulPengaduan, setJudulPengaduan] = useState('');
  const [detailPengaduan, setDetailPengaduan] = useState('');
  const [solusi, setSolusi] = useState('');
  const [idStatus, setIdStatus] = useState('');
  const [idOrang, setIdOrang] = useState('');

  const [foto, setFoto] = useState(null);
  const [namaFoto, setNamaFoto] = useState('Unggah Foto');
  const [dataFotoKejadian, setDataFotoKejadian] = useState({});
  const [linkFotoKejadian, setLinkFotoKejadian] = useState('');
  const [fotoKTP, setFotoKTP] = useState(null);
  const [dataFotoKTP, setDataFotoKTP] = useState({});
  const [namaFotoKTP, setNamaFotoKTP] = useState('Unggah Foto');
  const [linkFotoKTP, setLinkFotoKTP] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);
  const [kategoriAduan, setKategoriAduan] = useState([]);
  const [dinasTerkait, setDinasTerkait] = useState([]);
  const [profil, setProfil] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [latMarker, setLatMarker] = useState(0.0);
  const [longMarker, setLongMarker] = useState(0.0);
  const [keterangan, setKeterangan] = useState('');

  const [listAnggotaDprd, setListAnggotaDprd] = useState([]);

  const getListAnggotaDprd = async () => {
    Axios({
      url: url + `/api/aspirasi/dprd-anggota/getall?order=id+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setListAnggotaDprd(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const cekKirim = () => {
    linkFotoKejadian === '' ? setModalHandleFoto(true) : kirim();
  };
  const kirim = async () => {
    // console.log(`http://maps.google.com/maps?q=${latMarker},${longMarker}`);
    setModalLoading(true);
    Axios({
      url: url + '/api/aspirasi/dprd-aspirasi/create',
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      data: {
        dprd_anggota_id: parseInt(idOrang),
        dprd_aspirasi_id: parseInt(idStatus),
        usr_user_id: 1,
        usr_asn_id: 1,
        deskripsi: keterangan,
        publish: 1,
        closed: 0,
        file_url: linkFotoKejadian,
      },
    })
      .then(async res => {
        setMessage(res.data.message);
        setModalVisibleSukses(true);
        setModalLoading(false);
      })
      .catch(error => {
        console.log(error.response);
        setModalLoading(false);
        // setMessage(error.response.data.message);
        setModalVisible(true);
      });
    // : navigation.navigate('MenuTrantibum');
  };

  const pilihFoto = () => {
    modalizeRef.current?.open();
  };

  // const pilihFotoKTP = () => {
  //   modalizeRefKTP.current?.open();
  // };

  const getProfil = async () => {
    Axios({
      url: url + `/api/master/profile/user-detail`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setProfil(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const ambilDariCamera = () => {
    modalizeRef.current?.close();
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        if (!response.didCancel) {
          let formData = new FormData();
          setFoto(response.uri);
          // setDataFoto(response.data);
          setNamaFoto(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKejadian(formData);
        }
      },
    );
  };

  const ambilDariGalery = () => {
    modalizeRef.current?.close();
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        if (!response.didCancel) {
          let formData = new FormData();
          setFoto(response.uri);
          // setDataFoto(response.data);
          setNamaFoto(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKejadian(formData);
        }
      },
    );
  };

  const kirimFotoKejadian = async formData => {
    fetch(url + '/api/master/media/upload', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      body: formData,
    })
      .then(async res => {
        let data = await res.json();
        console.log(data);
        setLinkFotoKejadian(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Kejadian');
      });
  };

  const ambilDariCameraKTP = async () => {
    // modalizeRefKTP.current?.close();
    // ImagePicker.launchCamera(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     //   maxHeight: 200,
    //     //   maxWidth: 200,
    //     quality: 0.3,
    //   },
    //   response => {
    //     if (!response.didCancel) {
    //       let formData = new FormData();
    //       setFotoKTP(response.uri);
    //       // setDataFoto(response.data);
    //       setNamaFotoKTP(response.fileName);
    //       formData.append('file', {
    //         uri: response.uri,
    //         name: response.fileName,
    //         type: response.type,
    //       });
    //       // setDataFotoKTP(formData);
    //       kirimFotoKTP(formData);
    //     }
    //   },
    // );
  };

  const ambilDariGaleryKTP = () => {
    // modalizeRefKTP.current?.close();
    // ImagePicker.launchImageLibrary(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     //   maxHeight: 200,
    //     //   maxWidth: 200,
    //     quality: 0.3,
    //   },
    //   response => {
    //     if (!response.didCancel) {
    //       let formData = new FormData();
    //       setFotoKTP(response.uri);
    //       // setDataFoto(response.data);
    //       setNamaFotoKTP(response.fileName);
    //       formData.append('file', {
    //         uri: response.uri,
    //         name: response.fileName,
    //         type: response.type,
    //       });
    //       // setDataFotoKTP(formData);
    //       kirimFotoKTP(formData);
    //     }
    //   },
    // );
  };

  const kirimFotoKTP = async formData => {
    // fetch(url + '/api/master/media/upload', {
    //   method: 'post',
    //   headers: {
    //     Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    //     // 'Content-Type': 'multipart/form-data',
    //     Accept: '*/*',
    //   },
    //   body: formData,
    // })
    //   .then(async res => {
    //     let data = await res.json();
    //     console.log(data);
    //     setLinkFotoKTP(data.data.path);
    //   })
    //   .catch(err => {
    //     console.log('Gagal KTP');
    //   });
  };

  const getKategoriAduan = async () => {
    // Axios({
    //   url:
    //     url + `/api/trantibumlinmas/kategori-aduan/getall?order=kategori+asc`,
    //   method: 'get',
    // })
    //   .then(response => {
    //     setKategoriAduan(response.data.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const getDinasTerkait = async () => {
    // Axios({
    //   url:
    //     url + `/api/trantibumlinmas/dinas-terkait/getall?order=nama_dinas+asc`,
    //   method: 'get',
    // })
    //   .then(response => {
    //     setDinasTerkait(response.data.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    getListAnggotaDprd();
    getKategoriAduan();
    getDinasTerkait();
    getProfil();
  }, []);
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSukses}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/success.png')}></Image>

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
                setModalVisibleSukses(!modalVisibleSukses);
                setMessage('');
                navigation.navigate('BuatAspirasi');
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/warning.png')}></Image>

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
        <View
          style={{
            flexDirection: 'row',
            // marginTop: hp('5%'),
            height: hp('10%'),
            backgroundColor: '#274799',
            alignItems: 'center',
            marginBottom: hp('2%'),
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('BuatAspirasi');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Form Aspirasi Anda
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Nama</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.name}
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.email}
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Email"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Nomor Induk Kependudukan (NIK)</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.nik}
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="NIK"></TextInput>
            </View>
            {/* <View>
              <Text style={styles.text}>No Telp/HP</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={profil.phone === null ? true : false}
                // value={profil.phone === null ? '' : profil.phone}
                style={styles.textInput}
                onChangeText={val => setTelp(val)}
                placeholder="No Telp/HP"></TextInput>
            </View> */}

            {/* <View>
              <Text style={styles.text}>Judul Aspirasi</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJudulPengaduan(val)}
                placeholder="Keahlian"></TextInput>
            </View> */}

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>DPRD/Eksekutif</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idStatus}
                onValueChange={(itemValue, itemIndex) => {
                  setIdStatus(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kategori"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item label="DPRD" value="0" style={{color: 'Black'}} />
                <Picker.Item
                  label="EKSEKUTIF"
                  value="1"
                  style={{color: 'Black'}}
                />
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Ditujukan Kepada </Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idOrang}
                onValueChange={(itemValue, itemIndex) => {
                  setIdOrang(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kategori"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                {listAnggotaDprd.map(val => {
                  return (
                    <Picker.Item
                      label={val.nama}
                      value={val.id}
                      style={{color: 'Black'}}
                    />
                  );
                })}
              </Picker>
            </View>

            <View>
              <Text style={styles.text}>Isi Aspirasi</Text>
            </View>
            <View style={[styles.boxInput, {height: 100}]}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={[styles.textInput, {textAlignVertical: 'top'}]}
                onChangeText={val => setKeterangan(val)}
                placeholder=" "></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Unggah File</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFoto}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFoto}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={cekKirim}>
                <Text style={styles.textButton}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={150}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 10}}>
            <Text style={{fontSize: 14}}>Pilih File</Text>
          </View>
        }>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 30,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={ambilDariCamera}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon color="#274799" size={35} icon={faCamera} />
              </View>
              <View>
                <Text>Kamera</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 100,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={ambilDariGalery}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon
                  color="#274799"
                  size={35}
                  icon={faFolderOpen}
                />
              </View>
              <View>
                <Text>Files</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>

      {/* <Modalize
        ref={modalizeRefKTP}
        // snapPoint={150}
        modalHeight={150}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 10}}>
            <Text style={{fontSize: 14}}>Pilih File</Text>
          </View>
        }>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 30,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={ambilDariCameraKTP}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon color="#274799" size={35} icon={faCamera} />
              </View>
              <View>
                <Text>Kamera</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 100,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={ambilDariGaleryKTP}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon
                  color="#274799"
                  size={35}
                  icon={faFolderOpen}
                />
              </View>
              <View>
                <Text>Files</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize> */}

      <Modal animationType="fade" transparent={true} visible={modalHandleFoto}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/warning.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                Harap melengkapi foto terlebih dahulu
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalHandleFoto(!modalHandleFoto);
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
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },

  container: {
    marginTop: hp('2%'),
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
  },
  boxInputPassword: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
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
    marginTop: 15,
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
    // borderWidth: 1,
    // marginTop: 30,
    marginLeft: 30,
  },
  boxLogin: {
    // borderWidth: 1,
    marginLeft: 30,
    // marginTop: 30,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
export default FormBuatAspirasi;
