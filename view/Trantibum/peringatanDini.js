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

var bencana = [
  {id: 1, jenisBencana: 'Gempa Bumi'},
  {id: 2, jenisBencana: 'Tanah Longsor'},
  {id: 3, jenisBencana: 'Banjir'},
  {id: 4, jenisBencana: 'Tsunami'},
  {id: 5, jenisBencana: 'Letusan gunung api'},
  {id: 6, jenisBencana: 'Banjir bandang'},
  {id: 7, jenisBencana: 'Angin topan'},
];

var status = [
  {id: 1, jenisStatus: 'Siaga'},
  {id: 2, jenisStatus: 'Waspada'},
  {id: 3, jenisStatus: 'Awas'},
];
function PeringatanDini({navigation}) {
  const modalizeRef = useRef(null);
  const modalizeRefBencana = useRef(null);
  const modalizeRefLokasi = useRef(null);

  const filterModal = () => {
    modalizeRef.current?.open();
  };
  const [filterPeringatan, setFilterePeringatan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listPeringatan, setListPeringatan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [namaStatus, setNamaStatus] = useState('');
  //bencana
  const [checkedBencana, setCheckedBencana] = useState('');
  const [filterBencana, setFilterBencana] = useState([
    {id: 1, jenisBencana: 'Gempa Bumi'},
    {id: 2, jenisBencana: 'Tanah Longsor'},
    {id: 3, jenisBencana: 'Banjir'},
    {id: 4, jenisBencana: 'Tsunami'},
    {id: 5, jenisBencana: 'Letusan gunung api'},
    {id: 6, jenisBencana: 'Banjir bandang'},
    {id: 7, jenisBencana: 'Angin topan'},
  ]);
  const [namaBencana, setNamaBencana] = useState('');
  //Provinsi
  const [checkedLokasi, setCheckedLokasi] = useState('');
  const [namaProvinsi, setNamaProvinsi] = useState('');
  const [provinsi, setProvinsi] = useState([]);
  const [chooseProvinsi, setChooseProvinsi] = useState({});
  const [filterProvTxt, setFilterProvTxt] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState([]);

  var bencanaTampil = bencana.slice(0, 3);

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

  const hasilFilter = async data => {
    console.log('ini dari hasil filer', data);
    setIsLoading(true);
    Axios({
      url:
        url +
        `/api/trantibumlinmas/peringatan-dini/getall?level_peringatan=${data.namaStatus}&nama_peringatan=${data.namaBencana}&nama_daerah=${data.namaProvinsi}&order=nama_peringatan+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setIsLoading(false);
        setListPeringatan(response.data.data);
        setFilterePeringatan(response.data.data);
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
  const getListPeringatan = async () => {
    setIsLoading(true);
    Axios({
      url:
        url +
        `/api/trantibumlinmas/peringatan-dini/getall?order=nama_peringatan+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        // console.log(response.data.data);
        setIsLoading(false);
        setListPeringatan(response.data.data);
        setFilterePeringatan(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.map}>
            <MapView
              style={{...StyleSheet.absoluteFillObject, borderRadius: 20}}
              initialRegion={{
                latitude: item.lat === null ? 0.0 : parseFloat(item.lat),
                longitude: item.lon === null ? 0.0 : parseFloat(item.lon),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: item.lat === null ? 0.0 : parseFloat(item.lat),
                  longitude: item.lon === null ? 0.0 : parseFloat(item.lon),
                }}></Marker>
            </MapView>
          </View>
          <View style={styles.content}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#274799',
                  fontSize: 18,
                }}>
                {item.nama_peringatan}
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Lokasi:</Text>{' '}
                {item.nama_provinsi}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Uraian Peringatan:</Text>{' '}
                {item.uraian_peringatan}
              </Text>
              <Text>
                {' '}
                <Text style={{fontWeight: 'bold'}}>Tanggal:</Text>{' '}
                {moment(new Date(item.tanggal)).format('DD-MM-YYYY')}
              </Text>
              <Text>
                {' '}
                <Text style={{fontWeight: 'bold'}}>Waktu:</Text>{' '}
                {item.waktu_mulai} - {item.waktu_selesai} WIB
              </Text>
              <Text>
                {' '}
                <Text style={{fontWeight: 'bold'}}>Status:</Text>{' '}
                {item.level_peringatan}{' '}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    getListPeringatan();
    getProvinsi();
  }, []);

  useEffect(() => {
    if (listPeringatan.length !== 0) {
      setFilterePeringatan(
        listPeringatan.filter(x =>
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
            alignItems: 'center',
            backgroundColor: '#274799',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('MenuTrantibum');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Peringatan Dini</Text>
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
        ) : filterPeringatan.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={filterPeringatan}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // ListFooterComponent={renderFooter}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
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
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>Status</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setNamaStatus('');
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#274799'}}>
                  reset status
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {status.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setNamaStatus(item.jenisStatus);
                    }}
                    key={index}
                    style={{
                      borderWidth: namaStatus === item.jenisStatus ? 2 : 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                      borderColor:
                        namaStatus === item.jenisStatus ? '#274799' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          namaStatus === item.jenisStatus ? '#274799' : 'black',
                      }}>
                      {item.jenisStatus}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Jenis Bencana
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  modalizeRefBencana.current?.open();
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
              {bencanaTampil.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setNamaBencana(item.jenisBencana);
                      setCheckedBencana(item.id);
                    }}
                    key={index}
                    style={{
                      borderWidth: namaBencana === item.jenisBencana ? 2 : 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                      borderColor:
                        namaBencana === item.jenisBencana ? '#274799' : 'black',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          namaBencana === item.jenisBencana
                            ? '#274799'
                            : 'black',
                      }}>
                      {item.jenisBencana}
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
                hasilFilter({namaStatus, namaProvinsi, namaBencana});
              }}>
              <Text style={styles.textButton}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      {/* Modal Jenis Bencana */}
      <Modalize
        ref={modalizeRefBencana}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <>
            <View style={{alignItems: 'flex-start', margin: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Jenis Bencana{' '}
              </Text>
            </View>
            <View
              style={[
                styles.boxPencarianFilter,
                {flexDirection: 'row', marginHorizontal: 20},
              ]}>
              <TextInput
                style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
                onChangeText={val =>
                  setFilterBencana(
                    bencana.filter(x =>
                      x.jenisBencana.toLowerCase().includes(val.toLowerCase()),
                    ),
                  )
                }
                placeholder="Pencarian berdasarkan bencana"></TextInput>
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
                    setCheckedBencana('');
                    setNamaBencana('');
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefBencana.current?.close();
                    setFilterBencana([
                      {id: 1, jenisBencana: 'Gempa Bumi'},
                      {id: 2, jenisBencana: 'Tanah Longsor'},
                      {id: 3, jenisBencana: 'Banjir'},
                      {id: 4, jenisBencana: 'Tsunami'},
                      {id: 5, jenisBencana: 'Letusan gunung api'},
                      {id: 6, jenisBencana: 'Banjir bandang'},
                      {id: 7, jenisBencana: 'Angin topan'},
                    ]);
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {filterBencana.map((item, index) => {
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
                      checkedBencana === item.id ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setCheckedBencana(item.id);
                      setNamaBencana(item.jenisBencana);
                    }}
                  />
                  <View>
                    <Text style={{fontSize: 12}}>{item.jenisBencana}</Text>
                  </View>
                </View>
                <View
                  key={index}
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
    color: 'white',
  },
  container: {
    // marginTop: 5,
    marginBottom: hp('3%'),
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
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
export default PeringatanDini;
