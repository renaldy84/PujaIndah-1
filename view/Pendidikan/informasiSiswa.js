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
import {
  faArrowLeft,
  faCalendarDays,
  faCircleArrowUp,
  faCircleChevronDown,
  faCircleChevronUp,
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
import {faFileLines} from '@fortawesome/free-regular-svg-icons';

function InformasiSiswa({navigation}) {
  const [profil, setProfil] = useState({});
  const [statusMapel, setStatusMapel] = useState(false);
  const [statusKehadiran, setStatusKehadiran] = useState(false);
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');

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
                navigation.navigate('Rapor');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Informasi Siswa
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                    <Text>NISN</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>1002</Text>
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
                    <Text>Nama</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Lucy</Text>
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
                    <Text>Tempat Lahir</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Jakarta</Text>
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
                    <Text>Jenis Kelamin</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>Perempuan</Text>
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
                    <Text>Sekolah</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>SDN 01 Bengkulu Utara</Text>
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
                    <Text>Kelas</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>1</Text>
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
            {/* Mapel */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('3%'),
                alignItems: 'center',
              }}>
              <View>
                <FontAwesomeIcon color="#ACA3A3" size={30} icon={faFileLines} />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text style={{color: '#ACA3A3', fontSize: 18}}>
                  Mata Pelajaran
                </Text>
              </View>
              <View>
                {statusMapel ? (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusMapel(false);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusMapel(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronUp}
                  />
                )}
              </View>
            </View>

            {/* Isi List Mapel */}
            <View
              style={{
                marginTop: hp('1%'),
              }}>
              {statusMapel ? (
                <>
                  <View style={{height: 400}}>
                    <ScrollView nestedScrollEnabled={true}>
                      <View style={styles.cardMapel}>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            Bahasa Indonesia
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
                          <View
                            style={{
                              backgroundColor: '#C5CACE',
                              height: 30,
                              borderRadius: 15,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Pengetahuan
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 5,
                              backgroundColor: 'rgba(197,202,206,.5)',
                              borderRadius: 15,
                              height: 30,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Ketrampilan
                            </Text>
                          </View>
                        </View>
                        <View style={{marginTop: hp('2%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>KKM</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>65</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Nilai</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>90</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Predikat</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>B</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Keterangan</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>Baik</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.cardMapel}>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            Matematika
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
                          <View
                            style={{
                              backgroundColor: '#C5CACE',
                              height: 30,
                              borderRadius: 15,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Pengetahuan
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 5,
                              backgroundColor: 'rgba(197,202,206,.5)',
                              borderRadius: 15,
                              height: 30,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Ketrampilan
                            </Text>
                          </View>
                        </View>
                        <View style={{marginTop: hp('2%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>KKM</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Nilai</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Predikat</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>A</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Keterangan</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>Baik</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.cardMapel}>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            Biologi
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
                          <View
                            style={{
                              backgroundColor: '#C5CACE',
                              height: 30,
                              borderRadius: 15,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Pengetahuan
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 5,
                              backgroundColor: 'rgba(197,202,206,.5)',
                              borderRadius: 15,
                              height: 30,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Ketrampilan
                            </Text>
                          </View>
                        </View>
                        <View style={{marginTop: hp('2%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>KKM</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Nilai</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Predikat</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>A</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Keterangan</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>Baik</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.cardMapel}>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            Fisika
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
                          <View
                            style={{
                              backgroundColor: '#C5CACE',
                              height: 30,
                              borderRadius: 15,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Pengetahuan
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 5,
                              backgroundColor: 'rgba(197,202,206,.5)',
                              borderRadius: 15,
                              height: 30,
                              width: wp('40%'),
                              padding: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                              Aspek Ketrampilan
                            </Text>
                          </View>
                        </View>
                        <View style={{marginTop: hp('2%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>KKM</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Nilai</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>80</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Predikat</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>A</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('30%')}}>
                              <Text>Keterangan</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>Baik</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </>
              ) : null}
            </View>

            {/* Kehadiran */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('3%'),
                alignItems: 'center',
              }}>
              <View>
                <FontAwesomeIcon color="#ACA3A3" size={30} icon={faFileLines} />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text style={{color: '#ACA3A3', fontSize: 18}}>Kehadiran</Text>
              </View>
              <View>
                {statusKehadiran ? (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusKehadiran(false);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusKehadiran(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronUp}
                  />
                )}
              </View>
            </View>

            {/* Isi Kehadiran */}
            <View
              style={{
                marginTop: hp('1%'),
              }}>
              {statusKehadiran ? (
                <>
                  <View style={styles.cardMapel}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          backgroundColor: '#4CD964',
                          height: 30,
                          width: 75,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Text style={{color: 'white'}}>Sakit</Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#DADADA',
                          height: 30,
                          width: 40,
                          marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text>10</Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
                      <View
                        style={{
                          backgroundColor: '#F89D1B',
                          height: 30,
                          width: 75,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Text style={{color: 'white'}}>Izin</Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#DADADA',
                          height: 30,
                          width: 40,
                          marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text>1</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
                      <View
                        style={{
                          backgroundColor: '#D71E44',
                          height: 30,
                          width: 75,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Text style={{color: 'white'}}>Alpha</Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#DADADA',
                          height: 30,
                          width: 40,
                          marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text>5</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#758097',
                        marginTop: hp('2%'),
                        height: 80,
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      <ScrollView nestedScrollEnabled={true}>
                        <Text>
                          Catatan : jhsdjfsd jashdj ajksdhkjsd kjahsdjk jsahdjs
                          hjsdghjas jhsgdhjasd jhsgdajhsad jhsgdj sajhdgjh
                          ajhsgdjhsad jhsagdjhas jhasdhjs 12312312314234
                          kjshdjksd jkhsdjkasd kjshdkas kjshdkjasd{' '}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </>
              ) : null}
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
  cardMapel: {
    borderWidth: 1,
    borderColor: '#C5CACE',
    borderRadius: 10,
    padding: 10,
    marginTop: hp('1%'),
  },
});
export default InformasiSiswa;
