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
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import {ActivityIndicator} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {BallIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function BookingAlat({navigation, route}) {
  const modalizeRef = useRef(null);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [telp, setTelp] = useState('');
  const [lamaPakai, setLamaPakai] = useState('');
  const [instansi, setInstansi] = useState('');
  const [alamatInstansi, setAlamatInstansi] = useState('');
  const [jumlahAlat, setJumlahAlat] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);
  const [profil, setProfil] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [showTanggal, setShowTanggal] = useState(false);
  const responLogin = useSelector(state => state.responLogin);
  const idAlatBerat = route.params.idAlat;
  // console.log(idAlatBerat, '>>>>>>>>');
  console.log(responLogin, 'responLogin');
  const submitSewaAlat = async () => {
    let date = new Date();
    let tgl = ('0' + date.getDate()).slice(-2);
    let bln = ('0' + date.getMonth() + 1).slice(-2);
    let thn = date.getFullYear();
    let fullDate = `${thn}-${bln}-${tgl}`;
    // console.log(
    //   typeof idAlatBerat,
    //   typeof jumlahAlat,
    //   tanggal,
    //   lamaPakai,
    //   instansi,
    //   alamatInstansi,
    //   typeof responLogin.detailProfile.daerah.provinsi,
    //   responLogin.detailProfile.daerah.kabkota,
    // );
    Axios({
      url: url + `/public/pu_booking_sewa`,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      data: {
        booking: fullDate,
        pu_data_alat_id: idAlatBerat,
        jumlah: parseInt(jumlahAlat),
        tanggal_pakai: tanggal,
        durasi: parseInt(lamaPakai),
        pemesan_id: responLogin.user_id,
        instansi: instansi,
        status: 0,
        alamat_instansi: alamatInstansi,
        m_daerah_id: responLogin.daerah,

        // pu_data_alat_id: idAlatBerat,
        // jumlah: parseInt(jumlahAlat),
        // tanggal_pakai: tanggal,
        // durasi: parseInt(lamaPakai),
        // instansi: instansi,
        // alamat_instansi: alamatInstansi,
        // provinsi_id: responLogin.detailProfile.daerah.provinsi,
        // kabkot_id: responLogin.detailProfile.daerah.kabkota,
      },
    })
      .then(response => {
        setMessage(response.data.message);
        setModalVisibleSukses(true);
        setModalLoading(false);
      })
      .catch(error => {
        console.log(error);
        setModalLoading(false);
        // setMessage(error.response.data.message);
        setModalVisible(true);
      });
  };

  useEffect(() => {
    // getProfil();
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
                navigation.navigate('ListAlatBerat');
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
                Gagal Mengirim!
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
                navigation.navigate('ListAlatBerat');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Form Sewa Alat
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Nama</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={responLogin.name}
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
                value={responLogin.email}
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
                value={responLogin.detailProfile.nik}
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="NIK"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>No Telp/HP</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={
                  responLogin.detailProfile.phone === null ? true : false
                }
                value={
                  responLogin.detailProfile.phone === null
                    ? ''
                    : responLogin.detailProfile.phone
                }
                style={styles.textInput}
                onChangeText={val => setTelp(val)}
                placeholder="No Telp/HP"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Tanggal Pakai</Text>
            </View>
            <View style={styles.boxInputTanggal}>
              <TouchableOpacity
                onPress={() => setShowTanggal(true)}
                style={styles.tanggal}>
                <Text
                  style={{
                    color: !tanggal ? '#b0b0b0' : 'black',
                    fontSize: 18,
                    margin: 10,
                    marginTop: 15,
                  }}
                  onChangeText={text => setTanggal(text)}>
                  {!tanggal ? 'dd/mm/yyyy' : tanggal}
                </Text>
                <View>
                  <DateTimePickerModal
                    minimumDate={new Date()}
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

            <View>
              <Text style={styles.text}>Lama Pakai (Hari)</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setLamaPakai(val)}
                placeholder="Lama Pakai"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Instansi</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setInstansi(val)}
                placeholder="Instansi"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Alamat Instansi</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={[styles.textInput, {textAlignVertical: 'top'}]}
                onChangeText={val => setAlamatInstansi(val)}
                placeholder="Alamat Instansi"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Jumlah Alat</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJumlahAlat(val)}
                placeholder="Jumlah Alat"></TextInput>
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={submitSewaAlat}>
                <Text style={styles.textButton}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 10,
  },
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
  boxInputTanggal: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    height: 50,

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
export default BookingAlat;
