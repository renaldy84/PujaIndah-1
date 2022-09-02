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
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';

function ProfilSekolah({navigation}) {
  const [nama, setNama] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [cari, setCari] = useState(false);
  const [npsn, setNpsn] = useState('');
  const [profilSekolah, setProfilSekolah] = useState([]);

  const handleCari = async () => {
    Axios({
      url: url + `/public/pend_sekolah/${npsn}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setProfilSekolah(response.data.data[0]);
        setCari(true);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

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
                navigation.navigate('DashboardPendidikan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Profil Sekolah
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>NPSN</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNpsn(val)}
                placeholder="NPSN"
              />
            </View>

            <View
              style={{
                marginTop: hp('1%'),
                marginBottom: hp('2%'),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={handleCari}>
                  <Text style={styles.textButton}>Cari</Text>
                </TouchableOpacity>
              </View>
            </View>

            {cari ? (
              <>
                {!npsn ? (
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={styles.text}>Harap Isi NPSN</Text>
                  </View>
                ) : !profilSekolah ? (
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={styles.text}>Data Tidak Ditemukan</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: hp('2%'),
                    }}>
                    <View>
                      <Text style={{fontSize: 18, color: '#ACA3A3'}}>
                        Informasi Sekolah
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('3%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View>
                        <Text style={{fontSize: 14, width: wp('40%')}}>
                          NPSN
                        </Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.npsn}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('1%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text style={{fontSize: 14}}>Nama</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.nama}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('1%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text style={{fontSize: 14}}>Alamat</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.alamat}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('1%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text style={{fontSize: 14}}>No Telp</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.no_telp}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('1%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text style={{fontSize: 14}}>Jumlah Ruangan</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.jumlah_ruang}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp('1%'),
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#F0E4E4',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text style={{fontSize: 14}}>Sarana/Prasarana</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14}}>:</Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                          {profilSekolah?.sarana_prasarana}
                        </Text>
                      </View>
                    </View>
                    {/* <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1%'),
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#F0E4E4',
            }}>
            <View style={{width: wp('40%')}}>
              <Text style={{fontSize: 14}}>Provinsi</Text>
            </View>
            <View>
              <Text style={{fontSize: 14}}>:</Text>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{fontSize: 14}}>Prov. Bengkulu</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1%'),
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#F0E4E4',
            }}>
            <View style={{width: wp('40%')}}>
              <Text style={{fontSize: 14}}>Status</Text>
            </View>
            <View>
              <Text style={{fontSize: 14}}>:</Text>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{fontSize: 14}}>Negeri</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1%'),
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#F0E4E4',
            }}>
            <View style={{width: wp('40%')}}>
              <Text style={{fontSize: 14}}>Jenjang Pendidikan</Text>
            </View>
            <View>
              <Text style={{fontSize: 14}}>:</Text>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{fontSize: 14}}>SD</Text>
            </View>
          </View>

          <View style={styles.map}>
            <MapView
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 20,
              }}
              initialRegion={{
                latitude: -3.4239992178178844,
                longitude: 102.19370287150612,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: -3.4239992178178844,
                  longitude: 102.19370287150612,
                }}
              />
            </MapView>
          </View> */}
                  </View>
                )}
              </>
            ) : null}
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
    paddingBottom: 20,
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

  buttonLogin: {
    borderRadius: 5,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    borderRadius: 10,
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    margin: 5,
    marginTop: 15,
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000000',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#A19C9C',
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
  map: {
    marginTop: hp('3%'),
    height: hp('30%'),
  },
});
export default ProfilSekolah;
