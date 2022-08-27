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
import {faArrowLeft, faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import MapView, {Marker} from 'react-native-maps';
import {RadioButton} from 'react-native-paper';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function DetailAnggotaDprd({navigation, route}) {
  const idPejabat = route.params.idPejabat;
  const [detailProfile, setDetailProfile] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);
  const getDetailProfile = async () => {
    Axios({
      url: url + `/api/aspirasi/dprd-anggota/getid/${idPejabat}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        if (response.data.status === 1) {
          console.log(response.data.data);
          setDetailProfile(response.data.data);
        } else {
          console.log('Silahkan refresh halaman ini');
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  const getKegiatan = async () => {
    Axios({
      url: url + `/api/aspirasi/dprd-kegiatan/getid/${idPejabat}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        if (response.data.status === 1) {
          console.log(response.data.data);
          setKegiatan(response.data.data);
        } else {
          console.log('Silahkan refresh halaman ini');
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getDetailProfile();
    getKegiatan();
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
            alignItems: 'center',
            height: hp('10%'),
            backgroundColor: '#274799',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DataAnggotaDprd');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Detail Anggota DPRD</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: hp('3%'), marginHorizontal: wp('10%')}}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 136, height: 188}}
                // resizeMode="contain"
                source={{
                  uri: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1570082311/qnvzzgvbl48ivrp25shu.jpg',
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>{detailProfile.nama}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{width: 80}}>
                <Text style={{fontWeight: 'bold'}}>Fraksi</Text>
              </View>
              <View style={{marginHorizontal: 5}}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{detailProfile.fraksi}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: 80}}>
                <Text style={{fontWeight: 'bold'}}>Dapil</Text>
              </View>
              <View style={{marginHorizontal: 5}}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{detailProfile.nama_profinsi}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: 80}}>
                <Text style={{fontWeight: 'bold'}}>Komisi</Text>
              </View>
              <View style={{marginHorizontal: 5}}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{detailProfile.komisi}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: 80}}>
                <Text style={{fontWeight: 'bold'}}>Profil</Text>
              </View>
              <View style={{marginHorizontal: 5}}>
                <Text>:</Text>
              </View>
              <View style={{width: 200}}>
                <Text>{detailProfile.profil}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginLeft: 20,
              marginRight: 20,
            }}>
            <Text style={{marginTop: 20}}>Kegiatan</Text>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 15,
              marginLeft: 20,
              marginRight: 20,
            }}>
            <View>
              <Text style={{marginTop: 5, fontWeight: 'bold'}}>
                {kegiatan.kegiatan}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                Tanggal :{' '}
                {moment(new Date(kegiatan.tanggal)).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>Tempat : {kegiatan.tempat}</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                Detail Kegiatan : {kegiatan.keterangan}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 15,
              marginLeft: 20,
              marginRight: 20,
            }}>
            <View>
              <Text style={{marginTop: 5, fontWeight: 'bold'}}>
                Kunjungan Kerja Ke Kecamatan ABC
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>Tanggal : 30 Desember 2022</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>Tempat : Kecamatan ABC</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                Detail Kegiatan : Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 15,
              marginLeft: 20,
              marginRight: 20,
            }}>
            <View>
              <Text style={{marginTop: 5, fontWeight: 'bold'}}>
                Kunjungan Kerja Ke Kecamatan ABC
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>Tanggal : 30 Desember 2022</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>Tempat : Kecamatan ABC</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                Detail Kegiatan : Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's.
              </Text>
            </View>
          </View>
*/}
          {/* <View style={{marginVertical: hp('3%'), alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 30,
                width: wp('90%'),
                backgroundColor: '#2F80ED',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 12,
                  color: '#F2F2F2',
                }}>
                Sampaikan Aspirasi Anda
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
  },
  arrow: {
    // borderWidth: 1,
    // marginTop: 30,
    marginLeft: 30,
  },
  boxJudul: {
    // borderWidth: 1,
    marginLeft: 30,
    // marginTop: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    // marginTop: 5,
    marginBottom: hp('3%'),
    marginLeft: 10,
    width: wp('85%'),
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
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
    marginTop: 10,
    marginBottom: 20,
  },
  buttonTerapkan: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    backgroundColor: '#246EE9',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
  textButtonReset: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  boxButtonReset: {
    width: '50%',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonReset: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#246EE9',
    marginTop: 15,
    justifyContent: 'center',
  },
  boxPencarianFilter: {
    margin: 5,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonBencana: {
    borderRadius: 10,
    width: '50%',
    height: 40,
    backgroundColor: '#246EE9',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
  buttonBooking: {
    backgroundColor: '#2E81ED',
    borderRadius: 5,
    marginLeft: 10,
    height: hp('5%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DetailAnggotaDprd;
