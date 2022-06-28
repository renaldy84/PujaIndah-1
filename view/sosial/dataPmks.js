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

function DataPmks({navigation}) {
  const modalizeRef = useRef(null);
  const modalizeRefJenisLks = useRef(null);
  const modalizeRefLokasi = useRef(null);

  const filterModal = () => {
    modalizeRef.current?.open();
  };

  const [listDataLks, setListDataLks] = useState([]);
  const [filterListDataLks, setFilterListDataLks] = useState([]);
  const [filter, setFilter] = useState('');

  //Jenis LKS
  const [filterJenisDataLks, setFilterJenisDataLks] = useState([]);
  const [jenisDataLks, setJenisDataLks] = useState([]);
  const [chooseJeninLks, setChooseJenisLks] = useState({});
  const [checkedJenisLks, setCheckedJenisLks] = useState('');
  const [checkedIDJenisLks, setCheckedIDJenisLks] = useState('');
  const [namaJenisLks, setNamaJenisLks] = useState('');
  const [filterJenisLksTxt, setFilterJenisLksTxt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //Provinsi
  const [checkedLokasi, setCheckedLokasi] = useState('');
  const [namaProvinsi, setNamaProvinsi] = useState('');
  const [provinsi, setProvinsi] = useState([]);
  const [chooseProvinsi, setChooseProvinsi] = useState({});
  const [filterProvTxt, setFilterProvTxt] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState([]);

  const getProvinsi = () => {
    Axios({
      url: url + `/api/master/m-daerah/getall?order=nama+asc&tingkat=1`,
      method: 'get',
    })
      .then(response => {
        setProvinsi(response.data.data);
        setFilterProvinsi(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (provinsi.length !== 0) {
      setFilterProvinsi(
        provinsi.filter(x =>
          x.nama.toLowerCase().includes(filterProvTxt.toLowerCase()),
        ),
      );
    }
  }, [filterProvTxt]);

  useEffect(() => {
    if (jenisDataLks.length !== 0) {
      setFilterJenisDataLks(
        jenisDataLks.filter(x =>
          x.nama.toLowerCase().includes(filterJenisLksTxt.toLowerCase()),
        ),
      );
    }
  }, [filterJenisLksTxt]);

  const getListDataLKS = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/sosial/pmks/getall?order=nama_program+desc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setIsLoading(false);
        setListDataLks(response.data.data);
        setFilterListDataLks(response.data.data);
      })
      .catch(error => {
        console.log('asu');
        console.log(error);
      });
  };

  const hasilFilter = async data => {
    setIsLoading(true);

    if (
      (namaProvinsi != '' || namaProvinsi != undefined) &&
      checkedJenisLks != ''
    ) {
      Axios({
        url:
          url +
          `/api/sosial/pmks/getall?order=nama_program+desc&sos_pmks_jenis_id=${data.checkedJenisLks}&nama_daerah=${data.namaProvinsi}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
        .then(response => {
          setIsLoading(false);
          setListDataLks(response.data.data);
          setFilterListDataLks(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (namaProvinsi != '' || namaProvinsi != undefined) {
      Axios({
        url:
          url +
          `/api/sosial/pmks/getall?order=nama_program+desc&nama_daerah=${data.namaProvinsi}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
        .then(response => {
          setIsLoading(false);
          setListDataLks(response.data.data);
          setFilterListDataLks(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (checkedJenisLks != '') {
      Axios({
        url:
          url +
          `/api/sosial/pmks/getall?order=nama_program+desc&sos_pmks_jenis_id=${data.checkedJenisLks}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
        .then(response => {
          setIsLoading(false);
          setListDataLks(response.data.data);
          setFilterListDataLks(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getJenisDataLks = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/sosial/pmks-jenis/getall?order=nama+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log('jenis PMKS', response.data.data);
        setJenisDataLks(response.data.data);
        setFilterJenisDataLks(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            // console.log(item.id);
            // navigation.navigate('DetailInfrastruktur', {
            //   idInfrastruktur: item.id,
            // });
          }}
          style={styles.container}>
          <View style={styles.content}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 18,
                }}>
                {item.nama}
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Jenis :</Text>{' '}
                {item.sos_pmks_jenis_id}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Bidang :</Text> Sosial Care
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>No.Tlp/HP :</Text>{' '}
                {!item.contact_telp ? '-' : item.contact_telp}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Penanggung Jawab :</Text>{' '}
                {!item.penanggung_jawab ? '-' : item.penanggung_jawab}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Alamat :</Text> {item.alamat}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    getListDataLKS();
    getJenisDataLks();
    getProvinsi();
    // getInfrastruktur();
  }, []);

  useEffect(() => {
    if (listDataLks.length !== 0) {
      setFilterListDataLks(
        listDataLks.filter(x =>
          x.nama_provinsi.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }
  }, [filter]);

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
            marginTop: hp('5%'),
            alignItems: 'center',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DashboardSosial');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Data PMKS</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: hp('2%'),
          }}>
          <View style={[styles.boxInput, {flexDirection: 'row', flex: 4}]}>
            <TextInput
              style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
              onChangeText={val => setFilter(val)}
              placeholder="Pencarian berdasarkan daerah"></TextInput>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesomeIcon color="grey" size={20} icon={faSearch} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={filterModal}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: '#E0E0E0',
              }}>
              <FontAwesomeIcon color="grey" size={25} icon={faBars} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <ScrollView contentContainerStyle={{flexGrow: 1, margin: 20}}>
          {listPeringatan.map((val, index) => {
            console.log(val);
            return (
              
            );
          })}
        </ScrollView> */}
        {isLoading ? (
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={30} />
          </View>
        ) : filterListDataLks.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={filterListDataLks}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Text>Data tidak ditemukan</Text>
            </View>
          </>
        )}
      </View>
      {/* Modal Filter Pertama */}
      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 20}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Filter </Text>
          </View>
        }>
        <View style={{marginHorizontal: 20}}>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Jenis PMKS
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  modalizeRefJenisLks.current?.open();
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#0094FF'}}>
                  lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {jenisDataLks.slice(0, 3).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setChooseJenisLks(item);
                      setCheckedJenisLks(item.id);
                      setNamaJenisLks(item.nama);
                    }}
                    key={index}
                    style={{
                      borderWidth: namaJenisLks === item.nama ? 3 : 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                      borderColor:
                        namaJenisLks === item.nama ? 'blue' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: namaJenisLks === item.nama ? 'blue' : 'black',
                      }}>
                      {item.nama}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>Lokasi</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  modalizeRefLokasi.current?.open();
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#0094FF'}}>
                  lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {provinsi.slice(0, 3).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setChooseProvinsi(item);
                      setCheckedLokasi(item.id);
                      setNamaProvinsi(item.nama);
                    }}
                    key={index}
                    style={{
                      borderWidth: namaProvinsi === item.nama ? 3 : 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                      borderColor:
                        namaProvinsi === item.nama ? 'blue' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: namaProvinsi === item.nama ? 'blue' : 'black',
                      }}>
                      {item.nama}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.boxButton}>
            <TouchableOpacity
              style={styles.buttonTerapkan}
              onPress={() => {
                modalizeRef.current?.close();
                if (
                  (namaProvinsi == undefined || namaProvinsi == '') &&
                  checkedJenisLks == ''
                ) {
                  getListDataLKS();
                } else {
                  hasilFilter({checkedJenisLks, namaProvinsi});
                }
              }}>
              <Text style={styles.textButton}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      {/* Modal Jenis Bencana */}
      <Modalize
        ref={modalizeRefJenisLks}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <>
            <View style={{alignItems: 'flex-start', margin: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Jenis Data PMKS{' '}
              </Text>
            </View>
            <View
              style={[
                styles.boxPencarianFilter,
                {flexDirection: 'row', marginHorizontal: 20},
              ]}>
              <TextInput
                style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
                onChangeText={val => setFilterJenisLksTxt(val)}
                placeholder="Pencarian berdasarkan Jenis PMKS"></TextInput>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={20} icon={faSearch} />
              </TouchableOpacity>
            </View>
          </>
        }
        FooterComponent={
          <>
            <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
              <View style={styles.boxButtonReset}>
                <TouchableOpacity
                  style={styles.buttonReset}
                  onPress={() => {
                    setCheckedJenisLks('');
                    setFilterJenisLksTxt('');
                    getJenisDataLks();
                    setNamaJenisLks('');
                    setChooseJenisLks({});
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefJenisLks.current?.close();
                    setNamaJenisLks(chooseJeninLks.nama);
                    setFilterJenisLksTxt('');
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {filterJenisDataLks.map((item, index) => {
            return (
              <>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <RadioButton
                    color="#246EE9"
                    value="first"
                    status={
                      checkedJenisLks === item.id ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setChooseJenisLks(item);
                      setCheckedJenisLks(item.id);
                    }}
                  />
                  <View>
                    <Text style={{fontSize: 12}}>{item.nama}</Text>
                  </View>
                </View>
                <View
                  key={item.id}
                  style={{
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    width: '90%',
                  }}
                />
              </>
            );
          })}
        </View>
      </Modalize>
      {/* Modal Lokasi */}
      <Modalize
        ref={modalizeRefLokasi}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <>
            <View style={{alignItems: 'flex-start', margin: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Lokasi </Text>
            </View>
            <View
              style={[
                styles.boxPencarianFilter,
                {flexDirection: 'row', marginHorizontal: 20},
              ]}>
              <TextInput
                value={filterProvTxt}
                style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
                onChangeText={val => setFilterProvTxt(val)}
                placeholder="Pencarian berdasarkan lokasi"></TextInput>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon color="grey" size={20} icon={faSearch} />
              </TouchableOpacity>
            </View>
          </>
        }
        FooterComponent={
          <>
            <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
              <View style={styles.boxButtonReset}>
                <TouchableOpacity
                  style={styles.buttonReset}
                  onPress={() => {
                    setCheckedLokasi('');
                    setFilterProvTxt('');
                    getProvinsi();
                    setNamaProvinsi('');
                    setChooseProvinsi({});
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefLokasi.current?.close();
                    setNamaProvinsi(chooseProvinsi.nama);
                    setFilterProvTxt('');
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {filterProvinsi.map((item, index) => {
            return (
              <>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <RadioButton
                    color="#246EE9"
                    value="first"
                    status={checkedLokasi === item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChooseProvinsi(item);
                      setCheckedLokasi(item.id);
                    }}
                  />
                  <View>
                    <Text style={{fontSize: 12}}>{item.nama}</Text>
                  </View>
                </View>
                <View
                  key={item.id}
                  style={{
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    width: '90%',
                  }}
                />
              </>
            );
          })}
        </View>
      </Modalize>
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
  },
  container: {
    // marginTop: 5,
    marginLeft: 10,
    marginBottom: hp('3%'),
    width: wp('85%'),
    borderRadius: 20,
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
  map: {
    height: 200,
  },
  content: {
    flex: 1,
    margin: 10,
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
    backgroundColor: '#2F80ED',
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
    backgroundColor: '#2F80ED',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
});
export default DataPmks;
