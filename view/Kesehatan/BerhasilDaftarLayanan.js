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
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCalendarDays,
  faMapMarkerAlt,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {faClock} from '@fortawesome/free-regular-svg-icons';

function BerhasilDaftarLayanan({navigation}) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [profil, setProfil] = useState({});
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState('');

  const getProfil = async () => {
    Axios({
      url: url + `/api/master/profile/user-detail`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data);
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
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DetailFasilitasKesehatan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Berhasil Pendaftaran Pelayanan
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {/* Lokasi Puskesmas */}
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 14,
                  marginTop: hp('2%'),
                }}>
                Puskesmas Pamulang
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
              <View>
                <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>
                  Jl. Satria - Sudirman, RT.002/RW.001, Sukaasih, Kec.
                  Tangerang, Kota Tangerang, Banten 15111
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{rotation: 90}}>
                <FontAwesomeIcon size={20} icon={faPhoneAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>021- 29662529</Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 2,
                marginTop: hp('3%'),
                borderColor: '#758097',
                opacity: 0.5,
              }}></View>
            {/* Judul Inforasi Pasien */}
            <View style={{marginTop: hp('3%')}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#ACA3A3'}}>
                Informasi Pendaftaran Layanan
              </Text>
            </View>
            {/* List Informasi Pasien */}
            <View style={{marginTop: hp('3%')}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Nama Pasien</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Jhon Doe</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Tanggal Daftar</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Senin, 04/07/2022</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Jadwal</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>07:30:00 - 20:00:00</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Keluhan</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Karang Gigi</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Poli</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Gigi dan Mulut</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
            </View>
            {/* Card Pendaftaran */}
            <View style={{marginTop: hp('5%'), marginBottom: hp('5%')}}>
              <View style={styles.card}>
                <View
                  style={{
                    backgroundColor: '#274799',
                    width: '100%',
                    borderRadius: 5,
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 40, color: 'white'}}>AT-020</Text>
                </View>
                <View>
                  <View style={{alignItems: 'center', marginTop: hp('1%')}}>
                    <Text style={{fontSize: 16}}>Nomor Antrean Kamu</Text>
                  </View>
                  <View style={{alignItems: 'center', marginTop: hp('1%')}}>
                    <Text style={{fontSize: 48}}>020</Text>
                  </View>
                  <View style={{alignItems: 'center', marginTop: hp('1%')}}>
                    <Text style={{fontSize: 16}}>Antrian Saat Ini</Text>
                  </View>
                  <View style={{alignItems: 'center', marginTop: hp('1%')}}>
                    <Text style={{fontSize: 48}}>010</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF6677',
                    width: '100%',
                    borderRadius: 5,
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginTop: hp('3%'),
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>Batalkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: wp('95%'),
    paddingHorizontal: 15,
  },
  arrow: {
    marginLeft: 30,
  },
  boxJudul: {
    marginLeft: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
});
export default BerhasilDaftarLayanan;
