import React, {useState, useRef} from 'react';
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
  faCamera,
  faEye,
  faEyeSlash,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function BuatPengaduan({navigation}) {
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [telp, setTelp] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [idDinasTerkait, setIdDinasTerkait] = useState('');
  const [judulPengaduan, setJudulPengaduan] = useState('');
  const [detailPengaduan, setDetailPengaduan] = useState('');
  const [foto, setFoto] = useState(null);
  const [dataFoto, setDataFoto] = useState(null);
  const [namaFoto, setNamaFoto] = useState('Unggah Foto');
  const [modalVisible, setModalVisible] = useState(false);
  const pilihKategori = [
    {id: 1, namaKategori: 'Kategori 1'},
    {id: 2, namaKategori: 'Kategori 2'},
    {id: 3, namaKategori: 'Kategori 3'},
    {id: 4, namaKategori: 'Kategori 4'},
  ];

  const kirim = () => {
    navigation.navigate('MenuTrantibum');
  };

  const pilihFoto = () => {
    modalizeRef.current?.open();
  };

  const ambilDariCamera = () => {
    modalizeRef.current?.close();
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        console.log(response.assets[0].fileName);
        if (!response.didCancel) {
          setFoto(response.assets[0].uri);
          // setDataFoto(response.data);
          setNamaFoto(response.assets[0].fileName);
        }
        // if (!response.didCancel) {
        //   let formData = new FormData();
        //   formData.append('foto', {
        //     uri: response.uri,
        //     name: `izin.jpg`,
        //     type: 'image/jpeg',
        //   });
        //   formData.append('nopeg', auth.nopeg);
        //   formData.append('tgl_awal', tanggal);
        //   formData.append('keterangan', keterangan);
        //   formData.append('keperluan', 'Terlambat');
        //   setDataFoto(formData);
        //   setFoto(response.uri);
        // }
      },
    );
  };

  const ambilDariGalery = () => {
    modalizeRef.current?.close();
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        console.log(response);
        if (!response.didCancel) {
          setFoto(response.assets[0].uri);
          // setDataFoto(response.data);
          setNamaFoto(response.assets[0].fileName);
        }
        // if (!response.didCancel) {
        //   let formData = new FormData();
        //   formData.append('foto', {
        //     uri: response.uri,
        //     name: `izin.jpg`,
        //     type: 'image/jpeg',
        //   });
        //   formData.append('nopeg', auth.nopeg);
        //   formData.append('tgl_awal', tanggal);
        //   formData.append('keterangan', keterangan);
        //   formData.append('keperluan', 'Terlambat');
        //   setDataFoto(formData);
        //   setFoto(response.uri);
        // }
      },
    );
  };

  return (
    <>
      {/* <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/warning.png')}></Image>
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
      </Modal> */}

      <View
        style={{
          // margin: 20,
          flex: 1,
          resizeMode: 'cover',
          // justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('MenuTrantibum');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={styles.textLogin}>Buat Pengaduan</Text>
          </View>
        </View>

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
            <View>
              <Text style={styles.text}>No Telp/HP</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setTelp(val)}
                placeholder="No Telp/HP"></TextInput>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Kategori Aduan</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idKategoriAduan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKategoriAduan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kategori"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Kategori 1"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Kategori 2"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Kategori 3"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Kategori 4"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Dinas Terkait</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                selectedValue={idDinasTerkait}
                onValueChange={(itemValue, itemIndex) => {
                  setIdDinasTerkait(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Dinas Terkait Aduan"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item
                  label="Dinas 1"
                  value="1"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Dinas 2"
                  value="2"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Dinas 3"
                  value="3"
                  style={{color: '#000000'}}
                />
                <Picker.Item
                  label="Dinas 4"
                  value="4"
                  style={{color: '#000000'}}
                />
              </Picker>
            </View>
            <View>
              <Text style={styles.text}>Judul Pengaduan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJudulPengaduan(val)}
                placeholder="Judul Pengaduan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Penjelasan Detail Aduan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={[styles.textInput, {textAlignVertical: 'top'}]}
                onChangeText={val => setDetailPengaduan(val)}
                placeholder="Detail Pengaduan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Unggah Gambar/Foto</Text>
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
                <FontAwesomeIcon color="grey" size={25} icon={faCamera} />
              </TouchableOpacity>
            </View>
            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={kirim}>
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
        // HeaderComponent={
        //   <View style={{alignItems: 'center', margin: 20}}>
        //     <Text style={{fontSize: 24}}>Pilih </Text>
        //   </View>
        // }
      >
        <View style={{marginLeft: 30, marginTop: 20}}>
          <TouchableOpacity
            onPress={ambilDariCamera}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
            }}>
            <View>
              <FontAwesomeIcon color="grey" size={25} icon={faCamera} />
            </View>
            <View style={{flex: 4, marginLeft: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Pilih dari Camera
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 2,
              marginRight: 20,
            }}
          />
          <TouchableOpacity
            onPress={ambilDariGalery}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginTop: 10,
            }}>
            <View>
              <FontAwesomeIcon color="grey" size={25} icon={faFolderOpen} />
            </View>
            <View style={{flex: 4, marginLeft: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Pilih dari Galery
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 2,
              marginRight: 20,
            }}
          />
        </View>
      </Modalize>
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
    marginTop: 20,
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
    marginTop: 30,
    marginLeft: 30,
  },
  boxLogin: {
    // borderWidth: 1,
    marginLeft: 30,
    marginTop: 30,
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
};
export default BuatPengaduan;
