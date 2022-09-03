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
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
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

function PerpanjangKeur({navigation}) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [telp, setTelp] = useState('');
  const [nomorKendaraan, setNomorKendaraan] = useState('');
  const [fungsiKendaraan, setFungsiKendaraan] = useState('');
  const [tahunPembuatan, setTahunPembuatan] = useState('');
  const [nomorChasis, setNomorChasis] = useState('');
  const [nomorMesin, setNomorMesin] = useState('');
  const [muatanSumbu, setMuatanSumbu] = useState('');
  const [jumlahBeban, setJumlahBeban] = useState('');
  const [jumlahBebanIzin, setJumlahBebanIzin] = useState('');
  const [daftarKendaraan, setDaftarKendaraan] = useState([]);
  const [kendaraan, setKendaraan] = useState('');
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);

  const getData = async () => {
    const idDaerah = await AsyncStorage.getItem('m_daerah_id');
    Axios({
      url: url + `/public/jenis_kendaraan?m_daerah_id=${idDaerah}&per_page=100`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setDaftarKendaraan(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    setModalVisibleSukses(true);
    // Axios({
    //   url: url + '/api/master/profile/user-detail',
    //   method: 'get',
    //   headers: {
    //     Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    //   },
    // })
    //   .then(response => {
    //     setProfil(response.data.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
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
                navigation.navigate('DashboardPerhubungan');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Perpanjang KEUR
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Pilih Kendaraan</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={kendaraan}
                onValueChange={(itemValue, itemIndex) => {
                  setKendaraan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Nomor Kendaraan"
                  value=""
                  style={{color: '#b0b0b0', fontSize: 14}}
                />
                {daftarKendaraan.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item?.nama}
                      value={item?.nama}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>

            <View>
              <Text style={styles.text}>Fungsi Kendaraan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setFungsiKendaraan(val)}
                placeholder="Fungsi Kendaraan"
              />
            </View>
            <View>
              <Text style={styles.text}>Tahun Pembuatan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setTahunPembuatan(val)}
                placeholder="Tahun Pembuatan"
              />
            </View>
            <View>
              <Text style={styles.text}>Nomor Chasis</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNomorChasis(val)}
                placeholder="Nomor Chasis"
              />
            </View>
            <View>
              <Text style={styles.text}>Nomor Mesin</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNomorMesin(val)}
                placeholder="Nomor Mesin"
              />
            </View>
            <View>
              <Text style={styles.text}>Muatan Sumbu Terberat</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setMuatanSumbu(val)}
                placeholder="Muatan Sumbu Terberat"
              />
            </View>
            <View>
              <Text style={styles.text}>Jumlah beban yang diperbolehkan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJumlahBeban(val)}
                placeholder="Jumlah beban yang diperbolehkan"
              />
            </View>
            <View>
              <Text style={styles.text}>Jumlah beban yang di izinkan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJumlahBebanIzin(val)}
                placeholder="Jumlah beban yang di izinkan"
              />
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleSubmit}>
                <Text style={styles.textButton}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSukses}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/success.png')}
            />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                ok
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisibleSukses(!modalVisibleSukses);
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
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },

  container: {
    marginTop: -20,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#E6E6E6',
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
    fontSize: 14,
    margin: 5,
    marginTop: 15,
    color: '#2A4F70',
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
    borderColor: '#A19C9C',
    width: '100%',
    marginLeft: 5,
    marginBottom: 0,
    padding: 10,
    color: '#000000',
  },
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
    width: '80%',
  },
});
export default PerpanjangKeur;
