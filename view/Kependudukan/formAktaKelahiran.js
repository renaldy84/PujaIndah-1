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
  faCalendarDays,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function FormAktaKelahiran({navigation}) {
  const modalizeRefSuratLahir = useRef(null);
  const modalizeRefBukuNikah = useRef(null);
  const modalizeRefKk = useRef(null);
  const modalizeRefAyah = useRef(null);
  const modalizeRefIbu = useRef(null);
  const modalizeRefLain = useRef(null);
  const [modalHandleFoto, setModalHandleFoto] = useState(false);
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [catatan, setCatatan] = useState('');

  const [fotoSuratLahir, setFotoSuratLahir] = useState(null);
  const [namaFotoSuratLahir, setNamaFotoSuratLahir] = useState('Unggah Foto');
  const [dataFotoSuratLahir, setDataFotoSuratLahir] = useState({});
  const [linkFotoSuratLahir, setLinkFotoSuratLahir] = useState('');

  const [fotoBukuNikah, setFotoBukuNikah] = useState(null);
  const [dataFotoBukuNikah, setDataFotoBukuNikah] = useState({});
  const [namaFotoBukuNikah, setNamaFotoBukuNikah] = useState('Unggah Foto');
  const [linkFotoBukuNikah, setLinkFotoBukuNikah] = useState('');

  const [fotoKk, setFotoKk] = useState(null);
  const [dataFotoKk, setDataFotoKk] = useState({});
  const [namaFotoKk, setNamaFotoKk] = useState('Unggah Foto');
  const [linkFotoKk, setLinkFotoKk] = useState('');

  const [fotoAyah, setFotoAyah] = useState(null);
  const [dataFotoAyah, setDataFotoAyah] = useState({});
  const [namaFotoAyah, setNamaFotoAyah] = useState('Unggah Foto');
  const [linkFotoAyah, setLinkFotoAyah] = useState('');

  const [fotoIbu, setFotoIbu] = useState(null);
  const [dataFotoIbu, setDataFotoIbu] = useState({});
  const [namaFotoIbu, setNamaFotoIbu] = useState('Unggah Foto');
  const [linkFotoIbu, setLinkFotoIbu] = useState('');

  const [fotoLain, setFotoLain] = useState(null);
  const [dataFotoLain, setDataFotoLain] = useState({});
  const [namaFotoLain, setNamaFotoLain] = useState('Unggah Foto');
  const [linkFotoLain, setLinkFotoLain] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);
  const [kategoriAduan, setKategoriAduan] = useState([]);
  const [dinasTerkait, setDinasTerkait] = useState([]);
  const [profil, setProfil] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [latMarker, setLatMarker] = useState(0.0);
  const [longMarker, setLongMarker] = useState(0.0);

  const [showTanggal, setShowTanggal] = useState(false);

  const cekKirim = () => {
    linkFotoSuratLahir === '' &&
    linkFotoBukuNikah === '' &&
    linkFotoKk === '' &&
    linkFotoAyah === '' &&
    linkFotoIbu === ''
      ? setModalHandleFoto(true)
      : kirim();
  };
  const kirim = async () => {
    // console.log(`http://maps.google.com/maps?q=${latMarker},${longMarker}`);
    setModalLoading(true);
    Axios({
      url: url + '/api/kependudukan/kelahiran/create',
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      data: {
        nama: nama,
        jenis_kelamin: jenisKelamin,
        tgl_lahir: tanggal,
        nama_ayah: namaAyah,
        nama_ibu: namaIbu,
        catatan: catatan,
        provinsi_id: 1,
        kabkot_id: 1,
        kecamatan_id: 1,
        deskel_id: 1,
        tmpt_lahir: tempatLahir,
        scan_surat_lahir: linkFotoSuratLahir,
        scan_buku_nikah: linkFotoBukuNikah,
        ktp_ayah: linkFotoAyah,
        ktp_ibu: linkFotoIbu,
        scan_kk: linkFotoKk,
        file_lainnya: linkFotoLain,
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

  const pilihFotoSuratLahir = () => {
    modalizeRefSuratLahir.current?.open();
  };

  const pilihFotoBukuNikah = () => {
    modalizeRefBukuNikah.current?.open();
  };

  const pilihFotoKk = () => {
    modalizeRefKk.current?.open();
  };

  const pilihFotoAyah = () => {
    modalizeRefAyah.current?.open();
  };

  const pilihFotoIbu = () => {
    modalizeRefIbu.current?.open();
  };

  const pilihFotoLain = () => {
    modalizeRefLain.current?.open();
  };
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

  const ambilDariCameraSuratLahir = () => {
    modalizeRefSuratLahir.current?.close();
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
          setFotoSuratLahir(response.uri);
          // setDataFoto(response.data);
          setNamaFotoSuratLahir(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoSuratLahir(formData);
        }
      },
    );
  };

  const ambilDariGalerySuratLahir = () => {
    modalizeRefSuratLahir.current?.close();
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
          setFotoSuratLahir(response.uri);
          // setDataFoto(response.data);
          setNamaFotoSuratLahir(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoSuratLahir(formData);
        }
      },
    );
  };

  const kirimFotoSuratLahir = async formData => {
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
        setLinkFotoSuratLahir(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Surat Lahir');
      });
  };

  const ambilDariCameraBukuNikah = async () => {
    modalizeRefBukuNikah.current?.close();
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
          setFotoBukuNikah(response.uri);
          // setDataFoto(response.data);
          setNamaFotoBukuNikah(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKTP(formData);
          kirimFotoBukuNikah(formData);
        }
      },
    );
  };

  const ambilDariGaleryBukuNikah = () => {
    modalizeRefBukuNikah.current?.close();
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
          setFotoBukuNikah(response.uri);
          // setDataFoto(response.data);
          setNamaFotoBukuNikah(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKTP(formData);
          kirimFotoBukuNikah(formData);
        }
      },
    );
  };

  const kirimFotoBukuNikah = async formData => {
    fetch(url + '/api/master/media/upload', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        // 'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
      body: formData,
    })
      .then(async res => {
        let data = await res.json();
        console.log(data);
        setLinkFotoBukuNikah(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Buku Nikah');
      });
  };

  const ambilDariCameraKk = () => {
    modalizeRefKk.current?.close();
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
          setFotoKk(response.uri);
          // setDataFoto(response.data);
          setNamaFotoKk(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKk(formData);
        }
      },
    );
  };

  const ambilDariGaleryKk = () => {
    modalizeRefKk.current?.close();
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
          setFotoKk(response.uri);
          // setDataFoto(response.data);
          setNamaFotoKk(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKk(formData);
        }
      },
    );
  };

  const kirimFotoKk = async formData => {
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
        setLinkFotoKk(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Surat Lahir');
      });
  };

  const ambilDariCameraAyah = () => {
    modalizeRefAyah.current?.close();
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
          setFotoAyah(response.uri);
          // setDataFoto(response.data);
          setNamaFotoAyah(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoAyah(formData);
        }
      },
    );
  };

  const ambilDariGaleryAyah = () => {
    modalizeRefAyah.current?.close();
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
          setFotoAyah(response.uri);
          // setDataFoto(response.data);
          setNamaFotoAyah(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoAyah(formData);
        }
      },
    );
  };

  const kirimFotoAyah = async formData => {
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
        setLinkFotoAyah(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Surat Lahir');
      });
  };

  const ambilDariCameraIbu = () => {
    modalizeRefIbu.current?.close();
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
          setFotoIbu(response.uri);
          // setDataFoto(response.data);
          setNamaFotoIbu(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoIbu(formData);
        }
      },
    );
  };

  const ambilDariGaleryIbu = () => {
    modalizeRefIbu.current?.close();
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
          setFotoIbu(response.uri);
          // setDataFoto(response.data);
          setNamaFotoIbu(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoIbu(formData);
        }
      },
    );
  };

  const kirimFotoIbu = async formData => {
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
        setLinkFotoIbu(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Surat Lahir');
      });
  };

  const ambilDariCameraLain = () => {
    modalizeRefLain.current?.close();
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
          setFotoLain(response.uri);
          // setDataFoto(response.data);
          setNamaFotoLain(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoLain(formData);
        }
      },
    );
  };

  const ambilDariGaleryLain = () => {
    modalizeRefLain.current?.close();
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
          setFotoLain(response.uri);
          // setDataFoto(response.data);
          setNamaFotoLain(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoLain(formData);
        }
      },
    );
  };

  const kirimFotoLain = async formData => {
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
        setLinkFotoLain(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Surat Lahir');
      });
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
                navigation.navigate('AktaKelahiran');
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
                navigation.navigate('AktaKelahiran');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Form Akta Kelahiran
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Nama Lengkap</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                value={nama}
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama"></TextInput>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Jenis Kelamin</Text>
            </View>
            <View style={[styles.boxInput, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={jenisKelamin}
                onValueChange={(itemValue, itemIndex) => {
                  setJenisKelamin(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kategori"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Laki-Laki"
                  value="Laki-Laki"
                  style={{color: 'Black'}}
                />
                <Picker.Item
                  label="Perempuan"
                  value="Perempuan"
                  style={{color: 'Black'}}
                />
              </Picker>
            </View>

            <View>
              <Text style={styles.text}>Tanggal Lahir</Text>
            </View>
            <View style={[styles.tanggal, {flexDirection: 'row'}]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setShowTanggal(true)}>
                  <Text
                    style={[
                      styles.textCalendar,
                      {color: !tanggal ? '#b0b0b0' : 'black', borderWidth: 0},
                    ]}>
                    {!tanggal ? 'Tanggal Lahir' : tanggal}
                  </Text>
                  <View>
                    <DateTimePickerModal
                      // minimumDate={new Date()}
                      isVisible={showTanggal}
                      mode="date"
                      onConfirm={val => {
                        setTanggal(
                          `${val.getFullYear()}-${(
                            '0' +
                            (val.getMonth() + 1)
                          ).slice(-2)}-${('0' + val.getDate()).slice(-2)}`,
                        );
                        setShowTanggal(false);
                      }}
                      onCancel={() => {
                        setShowTanggal(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  color="#A19C9C"
                  size={25}
                  icon={faCalendarDays}
                />
              </View>
            </View>

            <View>
              <Text style={styles.text}>Tempat Lahir</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setTempatLahir(val)}
                placeholder=" "></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Nama Ayah</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNamaAyah(val)}
                placeholder=" "></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Nama Ibu</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNamaIbu(val)}
                placeholder=" "></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Catatan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setCatatan(val)}
                placeholder="Catatan"></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Unggah Scan Surat Lahir</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoSuratLahir}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoSuratLahir}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.text}>Unggah scan Buku Nikah</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoBukuNikah}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoBukuNikah}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.text}>Unggah scan Kartu Keluarga</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoKk}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoKk}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.text}>Unggah scan KTP Ayah</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoAyah}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoAyah}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.text}>Unggah scan KTP Ibu</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoIbu}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoIbu}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={25} icon={faPaperclip} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.text}>Unggah File Lainnya</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                value={namaFotoLain}
                style={[styles.textInput, {flex: 5}]}
                // onChangeText={val => setJudulPengaduan(val)}
                // placeholder="Judul Pengaduan"
                editable={false}></TextInput>
              <TouchableOpacity
                onPress={pilihFotoLain}
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
        ref={modalizeRefSuratLahir}
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
              onPress={ambilDariCameraSuratLahir}
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
              onPress={ambilDariGalerySuratLahir}
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

      <Modalize
        ref={modalizeRefBukuNikah}
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
              onPress={ambilDariCameraBukuNikah}
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
              onPress={ambilDariGaleryBukuNikah}
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

      <Modalize
        ref={modalizeRefKk}
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
              onPress={ambilDariCameraKk}
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
              onPress={ambilDariGaleryKk}
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

      <Modalize
        ref={modalizeRefAyah}
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
              onPress={ambilDariCameraAyah}
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
              onPress={ambilDariGaleryAyah}
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

      <Modalize
        ref={modalizeRefIbu}
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
              onPress={ambilDariCameraIbu}
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
              onPress={ambilDariGaleryIbu}
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

      <Modalize
        ref={modalizeRefLain}
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
              onPress={ambilDariCameraLain}
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
              onPress={ambilDariGaleryLain}
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
    borderColor: '#A19C9C',
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
  tanggal: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: '#A19C9C',
    width: '100%',
    marginLeft: 5,
    marginBottom: 0,
    paddingLeft: 10,
    color: '#000000',
    justifyContent: 'center',
  },
  textCalendar: {
    fontSize: 14,
  },
});
export default FormAktaKelahiran;
