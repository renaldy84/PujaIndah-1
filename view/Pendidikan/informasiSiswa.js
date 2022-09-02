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

function InformasiSiswa({navigation, route}) {
  const {data} = route.params;
  const [profil, setProfil] = useState({});
  const [statusMapel, setStatusMapel] = useState(false);
  const [statusKehadiran, setStatusKehadiran] = useState(false);
  const [statusNilaiSikap, setStatusNilaiSikap] = useState(false);
  const [statusEkstrakulikuler, setStatusEkstrakulikuler] = useState(false);
  const [statusPrestasi, setStatusPrestasi] = useState(false);
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
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {marginTop: 15}]}>
            <View>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: wp('30%')}}>
                    <Text>NISN</Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text>{data?.murid?.nisn}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    <Text>{data?.murid?.nama}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    <Text>{data?.murid?.tempat_lahir}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    <Text>
                      {data?.murid?.kelamin === 'P' ? 'Perempuan' : 'Laki-Laki'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    <Text>{data?.sekolah?.nama}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    <Text>{data?.kelas?.kelas}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: hp('1%'),
                    borderColor: '#758097',
                    opacity: 0.5,
                  }}
                />
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
                    icon={faCircleChevronUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusMapel(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
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
                  <View style={{maxHeight: 400}}>
                    <ScrollView nestedScrollEnabled={true}>
                      {data.mapel.map((item, index) => {
                        return (
                          <View style={styles.cardMapel}>
                            <View>
                              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                {item?.nama}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              {/*
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
                                <Text
                                  style={{fontSize: 12, fontWeight: 'bold'}}>
                                  Aspek Ketrampilan
                                </Text>
                              </View> */}
                            </View>
                            <View style={{marginTop: 10}}>
                              <View style={{flexDirection: 'row'}}>
                                <View style={{width: wp('30%')}}>
                                  <Text>KKM</Text>
                                </View>
                                <View>
                                  <Text>:</Text>
                                </View>
                                <View style={{marginLeft: 10, flex: 1}}>
                                  <Text>{item?.th_kkm}</Text>
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
                                  <Text>{item?.th_nilai}</Text>
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
                                  <Text>{item?.th_predikat}</Text>
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
                                  <Text>{item?.th_keterangan}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
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
                    icon={faCircleChevronUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusKehadiran(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
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
                  {data.kehadiran.map((item, index) => {
                    return (
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
                            <Text>{item?.sakit}</Text>
                          </View>
                        </View>

                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
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
                            <Text>{item?.izin}</Text>
                          </View>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginTop: hp('2%')}}>
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
                            <Text>{item?.alpha}</Text>
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
                            <Text>Catatan : {item?.catatan}</Text>
                          </ScrollView>
                        </View>
                      </View>
                    );
                  })}
                </>
              ) : null}
            </View>

            {/* Nilai Sikap */}
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
                  Nilai Sikap
                </Text>
              </View>
              <View>
                {statusNilaiSikap ? (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusNilaiSikap(false);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusNilaiSikap(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
                  />
                )}
              </View>
            </View>

            {/* Isi Nilai Sikap */}
            {data.sikap.map((item, index) => {
              return (
                <View
                  style={{
                    marginTop: hp('1%'),
                  }}>
                  {statusNilaiSikap ? (
                    <>
                      <View style={styles.cardMapel}>
                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('40%')}}>
                              <Text>Predikat Spritual</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>{item?.spiritual_predikat}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('40%')}}>
                              <Text>Keterangan Spritual</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>{item?.spiritual_keterangan}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('40%')}}>
                              <Text>Predikat Sosial</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>{item?.sosial_predikat}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('40%')}}>
                              <Text>Keterangan Sosial</Text>
                            </View>
                            <View>
                              <Text>:</Text>
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                              <Text>{item?.sosial_keterangan}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </>
                  ) : null}
                </View>
              );
            })}

            {/* Ekstrakulikuler */}
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
                  Ekstrakulikuler
                </Text>
              </View>
              <View>
                {statusEkstrakulikuler ? (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusEkstrakulikuler(false);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusEkstrakulikuler(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
                  />
                )}
              </View>
            </View>

            {/* Isi Ekstrakulikuler */}
            <View
              style={{
                marginTop: hp('1%'),
              }}>
              {statusEkstrakulikuler ? (
                <>
                  <View style={[styles.cardMapel, {height: 200}]}>
                    <View>
                      <ScrollView nestedScrollEnabled={true}>
                        {data.ekstra.map((item, index) => {
                          return (
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#F0E4E4',
                                paddingBottom: 20,
                                marginTop: hp('2%'),
                              }}>
                              <View>
                                <Text
                                  style={{fontSize: 15, fontWeight: 'bold'}}>
                                  {item?.nama}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: hp('1%'),
                                }}>
                                <View style={{width: wp('30%')}}>
                                  <Text>Predikat</Text>
                                </View>
                                <View>
                                  <Text>:</Text>
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                  <Text>{item?.predikat}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: hp('1%'),
                                }}>
                                <View style={{width: wp('30%')}}>
                                  <Text>Keterangan</Text>
                                </View>
                                <View>
                                  <Text>:</Text>
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                  <Text>{item?.keterangan}</Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </>
              ) : null}
            </View>

            {/* Prestasi */}
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
                <Text style={{color: '#ACA3A3', fontSize: 18}}>Prestasi</Text>
              </View>
              <View>
                {statusPrestasi ? (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusPrestasi(false);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    onPress={() => {
                      setStatusPrestasi(true);
                    }}
                    color="#ACA3A3"
                    size={30}
                    icon={faCircleChevronDown}
                  />
                )}
              </View>
            </View>

            {/* Isi Prestasi */}
            <View
              style={{
                marginTop: hp('1%'),
              }}>
              {statusPrestasi ? (
                <>
                  <View style={[styles.cardMapel, {height: 200}]}>
                    <View>
                      <ScrollView nestedScrollEnabled={true}>
                        {data.prestasi.map((item, index) => {
                          return (
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#F0E4E4',
                                paddingBottom: 15,
                                marginTop: hp('2%'),
                              }}>
                              <View>
                                <Text
                                  style={{fontSize: 15, fontWeight: 'bold'}}>
                                  {item?.prestasi}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
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
