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
  const [profil, setProfil] = useState({});

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

  useEffect(() => {
    getProfil();
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

        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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
            <View>
              <Text style={styles.text}>No Telp/HP</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={profil.phone === null ? true : false}
                // value={profil.phone === null ? '' : profil.phone}
                style={styles.textInput}
                onChangeText={val => setTelp(val)}
                placeholder="No Telp/HP"></TextInput>
            </View>

            <View>
              <Text style={styles.text}>Nomor Kendaraan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNomorKendaraan(val)}
                placeholder="Nomor Kendaraan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Fungsi Kendaraan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setFungsiKendaraan(val)}
                placeholder="Fungsi Kendaraan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Tahun Pembuatan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setTahunPembuatan(val)}
                placeholder="Tahun Pembuatan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Nomor Chasis</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNomorChasis(val)}
                placeholder="Nomor Chasis"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Nomor Mesin</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNomorMesin(val)}
                placeholder="Nomor Mesin"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Muatan Sumbu Terberat</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setMuatanSumbu(val)}
                placeholder="Muatan Sumbu Terberat"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Jumlah beban yang diperbolehkan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJumlahBeban(val)}
                placeholder="Jumlah beban yang diperbolehkan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Jumlah beban yang di izinkan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJumlahBebanIzin(val)}
                placeholder="Jumlah beban yang di izinkan"></TextInput>
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={() => {}}>
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
});
export default PerpanjangKeur;
