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

function DataAnggotaDprd({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const [filterAnggotaDprd, setFilterAnggotaDprd] = useState([]);
  const [filter, setFilter] = useState('');
  const [listAnggotaDprd, setListAnggotaDprd] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListAnggotaDprd = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/aspirasi/dprd-anggota/getall?order=id+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setIsLoading(false);
        setListAnggotaDprd(response.data.data);
        setFilterAnggotaDprd(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.content}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 10,
                // alignItems: 'center',
              }}>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/image/potodpr.png')}
                    // source={{
                    //   uri: item.gambar,
                    // }}
                  />
                </View>
                <View style={{paddingLeft: 10, flex: 1}}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.nama}
                    </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                    <View style={{width: 50}}>
                      <Text style={{fontWeight: 'bold'}}>Fraksi</Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                      <Text>:</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>{!item.fraksi ? '-' : item.fraksi}</Text>
                    </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                    <View style={{width: 50}}>
                      <Text style={{fontWeight: 'bold'}}>Dapil</Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                      <Text>:</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>Nusa Tenggara Timur</Text>
                    </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                    <View style={{width: 50}}>
                      <Text style={{fontWeight: 'bold'}}>Komisi</Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                      <Text>:</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>{!item.komisi ? '-' : item.komisi}</Text>
                    </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                    <View style={{width: 50}}>
                      <Text style={{fontWeight: 'bold'}}>Profil</Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                      <Text>:</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>{item.profil}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginBottom: 10,
                  justifyContent: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailAnggotaDprd', {
                      idPejabat: item.id,
                    });
                  }}
                  style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={{color: '#2F80ED'}}>Lihat Kegiatan</Text>
                </TouchableOpacity>
                {/* <View>
                  <View
                    style={{
                      height: 30,
                      width: wp('50%'),
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
                  </View>
                </View> */}
              </View>

              {/* <View style={{marginTop: 10, marginBottom: 15}}>
                <Text>
                  Jl. Raya Bekasi No.KM.18, RT.6/RW.2, Pulo Gadung, East Jakarta
                  City, Jakarta 13260
                </Text>
                <Text>
                  <Text>Jam Mulai:</Text> 08:00 AM
                </Text>
                <Text>
                  <Text>Jam Selesai:</Text> 17:00 PM
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    getListAnggotaDprd();
  }, []);

  useEffect(() => {
    if (listAnggotaDprd.length !== 0) {
      setFilterAnggotaDprd(
        listAnggotaDprd.filter(x =>
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
                navigation.navigate('DashboardAspirasi');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Data Anggota DPRD </Text>
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
              onChangeText={() => {}}
              placeholder="Ketik daerah yang ingin dicari"></TextInput>
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
        </View>

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
        ) : listAnggotaDprd.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={listAnggotaDprd}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
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
export default DataAnggotaDprd;
