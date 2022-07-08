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
import {faArrowLeft, faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function RiwayatPasien({navigation}) {
  const [profil, setProfil] = useState({});
  const [status, setStatus] = useState('Riwayat');
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');

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
                navigation.navigate('DashboardKesehatan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Riwayat Pasien
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {/* Judul Inforasi Pasien */}
            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                {profil.name}
              </Text>
            </View>
            {/* List Informasi Pasien */}
            <View style={{marginTop: hp('1%')}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Tanggal Lahir</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>30/12/1991</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Tempat Lahir</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Jakarta</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>No. KTP</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>53920192820011</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Telp./WA</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>082144090623</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: hp('1%')}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>Alamat</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Pamulang Permai Blok A25/18, Pamulang</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('2%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}></View>
              </View>
            </View>
            {/* Card Pendaftaran */}
            <View style={{flexDirection: 'row', marginTop: hp('3%')}}>
              <TouchableOpacity
                onPress={() => {
                  setStatus('Riwayat');
                }}
                style={{
                  backgroundColor:
                    status == 'Riwayat' ? '#274799' : 'rgba(47, 128, 237, 0.5)',
                  width: wp('30%'),
                  height: hp('3%'),
                  alignItems: 'center',
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: status == 'Riwayat' ? 'white' : '#645B9C',
                  }}>
                  Riwayat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStatus('Rekam');
                }}
                style={{
                  backgroundColor:
                    status == 'Riwayat' ? 'rgba(47, 128, 237, 0.5)' : '#274799',
                  width: wp('30%'),
                  height: hp('3%'),
                  alignItems: 'center',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: status == 'Riwayat' ? '#645B9C' : 'white',
                  }}>
                  Rekam Medis
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              {status == 'Riwayat' ? (
                <>
                  <View style={{marginTop: hp('2%')}}>
                    <Text style={{fontSize: 12}}>
                      <Text style={{fontWeight: 'bold'}}>
                        Poli Gigi dan Mulut
                      </Text>{' '}
                      dengan{' '}
                      <Text style={{color: '#274799'}}>
                        dr. R. Eddy Setiyoso, SpPD-KGEH
                      </Text>{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: hp('1%'),
                      backgroundColor: '#F1F1F1',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Tanggal Periksa</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Senin, 04/07/2022</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: '#F1F1F1',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Jam</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>10:00:00</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{marginTop: hp('2%')}}>
                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                      Detail Check Up
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: hp('1%'),
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Berat Badan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>60 Kg</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Tinggi</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>179 cm</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Alergi Obat</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Tidak</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Alergi Makanan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Tidak</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Keluhan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Sakit Gigi</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Diagnosa</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>
                          Sakit Gigi, Gusi Bengkak
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Terapi/Obat</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Obat sakit gigi 3x1</Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={{marginTop: hp('2%')}}>
                    <Text style={styles.text}>Pilih Tanggal Periksa</Text>
                  </View>

                  <View style={[styles.tanggal, {flexDirection: 'row'}]}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <TouchableOpacity onPress={() => setShowTanggal(true)}>
                        <Text
                          style={[
                            styles.textCalendar,
                            {
                              color: !tanggal ? '#b0b0b0' : 'black',
                              borderWidth: 0,
                            },
                          ]}>
                          {!tanggal ? 'Tanggal Periksa' : tanggal}
                        </Text>
                        <View>
                          <DateTimePickerModal
                            minimumDate={new Date()}
                            isVisible={showTanggal}
                            mode="date"
                            onConfirm={val => {
                              setTanggal(
                                `${('0' + val.getDate()).slice(-2)}-${(
                                  '0' +
                                  (val.getMonth() + 1)
                                ).slice(-2)}-${val.getFullYear()}`,
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
                  <View style={{marginTop: hp('2%')}}>
                    <Text style={{fontSize: 12}}>
                      <Text style={{fontWeight: 'bold'}}>
                        Poli Gigi dan Mulut
                      </Text>{' '}
                      dengan{' '}
                      <Text style={{color: '#274799'}}>
                        dr. R. Eddy Setiyoso, SpPD-KGEH
                      </Text>{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: hp('1%'),
                      backgroundColor: '#F1F1F1',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Tanggal Periksa</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Senin, 04/07/2022</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: '#F1F1F1',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Jam</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>10:00:00</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{marginTop: hp('2%')}}>
                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                      Detail Check Up
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: hp('1%'),
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Berat Badan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>60 Kg</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Tinggi</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>179 cm</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Alergi Obat</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Tidak</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Alergi Makanan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Tidak</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Keluhan</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Sakit Gigi</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Diagnosa</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>
                          Sakit Gigi, Gusi Bengkak
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: 'rgba(225, 220, 116, 0.3)',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: wp('30%')}}>
                        <Text style={{fontSize: 12}}>Terapi/Obat</Text>
                      </View>
                      <View>
                        <Text>:</Text>
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{fontSize: 12}}>Obat sakit gigi 3x1</Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
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
  text: {
    fontSize: 14,
    margin: 5,
    marginTop: 15,
    color: 'black',
  },
});
export default RiwayatPasien;
