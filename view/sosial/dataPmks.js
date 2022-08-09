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
  const modalizeRefJenisPMKS = useRef(null);
  const modalizeRefLokasi = useRef(null);

  const filterModal = () => {
    modalizeRef.current?.open();
  };

  const [listDataPMKS, setListDataPMKS] = useState([]);
  const [filterListDataPMKS, setFilterListDataPMKS] = useState([]);
  const [filter, setFilter] = useState('');

  //Jenis PMKS
  const [filterJenisDataPMKS, setFilterJenisDataPMKS] = useState([]);
  const [jenisDataPMKS, setJenisDataPMKS] = useState([]);
  const [chooseJeninPMKS, setChooseJenisPMKS] = useState({});
  const [checkedJenisPMKS, setCheckedJenisPMKS] = useState('');
  const [checkedIDJenisPMKS, setCheckedIDJenisPMKS] = useState('');
  const [namaJenisPMKS, setNamaJenisPMKS] = useState('');
  const [filterJenisPMKSTxt, setFilterJenisPMKSTxt] = useState('');

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
    if (jenisDataPMKS.length !== 0) {
      setFilterJenisDataPMKS(
        jenisDataPMKS.filter(x =>
          x.nama.toLowerCase().includes(filterJenisPMKSTxt.toLowerCase()),
        ),
      );
    }
  }, [filterJenisPMKSTxt]);

  const getListDataPMKS = async () => {
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
        setListDataPMKS(response.data.data);
        setFilterListDataPMKS(response.data.data);
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
      checkedJenisPMKS != ''
    ) {
      Axios({
        url:
          url +
          `/api/sosial/pmks/getall?order=nama_program+desc&sos_pmks_jenis_id=${data.checkedJenisPMKS}&nama_daerah=${data.namaProvinsi}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
        .then(response => {
          setIsLoading(false);
          setListDataPMKS(response.data.data);
          setFilterListDataPMKS(response.data.data);
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
          setListDataPMKS(response.data.data);
          setFilterListDataPMKS(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (checkedJenisPMKS != '') {
      Axios({
        url:
          url +
          `/api/sosial/pmks/getall?order=nama_program+desc&sos_pmks_jenis_id=${data.checkedJenisPMKS}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
        .then(response => {
          setIsLoading(false);
          setListDataPMKS(response.data.data);
          setFilterListDataPMKS(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getJenisDataPMKS = async () => {
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
        setJenisDataPMKS(response.data.data);
        setFilterJenisDataPMKS(response.data.data);
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
                {item.nama_program}
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Jenis :</Text>{' '}
                {jenisDataPMKS.map(val => {
                  if (val.id == item.sos_pmks_jenis_id) {
                    return val.nama;
                  }
                })}
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
    getListDataPMKS();
    getJenisDataPMKS();
    getProvinsi();
    // getInfrastruktur();
  }, []);

  useEffect(() => {
    if (listDataPMKS.length !== 0) {
      setFilterListDataPMKS(
        listDataPMKS.filter(x =>
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
                navigation.navigate('DashboardSosial');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>Data PMKS</Text>
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
        ) : filterListDataPMKS.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={filterListDataPMKS}
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
                  modalizeRefJenisPMKS.current?.open();
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#274799'}}>
                  lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {jenisDataPMKS.slice(0, 3).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setChooseJenisPMKS(item);
                      setCheckedJenisPMKS(item.id);
                      setNamaJenisPMKS(item.nama);
                    }}
                    key={index}
                    style={{
                      borderWidth: namaJenisPMKS === item.nama ? 3 : 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                      borderColor:
                        namaJenisPMKS === item.nama ? '#274799' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          namaJenisPMKS === item.nama ? '#274799' : 'black',
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
                <Text style={{fontSize: 12, color: '#274799'}}>
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
                        namaProvinsi === item.nama ? '#274799' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: namaProvinsi === item.nama ? '#274799' : 'black',
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
                  checkedJenisPMKS == ''
                ) {
                  getListDataPMKS();
                } else {
                  hasilFilter({checkedJenisPMKS, namaProvinsi});
                }
              }}>
              <Text style={styles.textButton}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      {/* Modal Jenis Bencana */}
      <Modalize
        ref={modalizeRefJenisPMKS}
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
                onChangeText={val => setFilterJenisPMKSTxt(val)}
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
                    setCheckedJenisPMKS('');
                    setFilterJenisPMKSTxt('');
                    getJenisDataPMKS();
                    setNamaJenisPMKS('');
                    setChooseJenisPMKS({});
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefJenisPMKS.current?.close();
                    setNamaJenisPMKS(chooseJeninPMKS.nama);
                    setFilterJenisPMKSTxt('');
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {filterJenisDataPMKS.map((item, index) => {
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
                    color="#274799"
                    value="first"
                    status={
                      checkedJenisPMKS === item.id ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setChooseJenisPMKS(item);
                      setCheckedJenisPMKS(item.id);
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
                    color="#274799"
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
    backgroundColor: '#274799',
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
    borderColor: '#274799',
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
    backgroundColor: '#274799',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
});
export default DataPmks;
