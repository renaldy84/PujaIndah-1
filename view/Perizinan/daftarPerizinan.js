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
  faSearch,
  faMapMarkerAlt,
  faPhoneAlt,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
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

function DaftarPerizinan({navigation}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const DATA = [
    {
      id: 1,
      judul: 'PTSP Kota Tangerang',
      alamat:
        'Jl. Satria - Sudirman, RT.002/RW.001, Sukaasih, Kec.Tangerang, Kota Tangerang, Banten 15111',
      telp: '021- 29662529',
      link: 'https://perizinanonline.tangerangkota.go.id/	',
    },
    {
      id: 2,
      judul: 'PTSP Kota Malang',
      alamat:
        'Jl. Mayjen Sungkono No.2, Arjowinangun, Kec. Kedungkandang, Kota Malang, Jawa Timur 65135',
      telp: '(0341) 751942',
      link: 'https://disnakerpmptsp.malangkota.go.id/	',
    },
    {
      id: 3,
      judul: 'PTSP Kota Surabaya',
      alamat: 'Jl. Tunjungan No.1-3(Mall Pelayanan Publik Lt.3)Surabaya 60275',
      telp: '(031) 99001785',
      link: 'http://dpm-ptsp.surabaya.go.id',
    },
    {
      id: 4,
      judul: 'PTSP Kota Sidoarjo',
      alamat:
        'Jl. Pahlawan No.141, Jetis, Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61211',
      telp: '(031) 8052090',
      link: 'http://www.dpmptsp.sidoarjokab.go.id/web/?hom_page=home-page-04	',
    },
  ];
  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/sosial/bansosmas/getall?order=pemberi_bansos+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setIsLoading(false);
        setListTitikRawan(response.data.data);
        setFilterTitikRawan(response.data.data);
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
            <View>
              <Image
                resizeMode="contain"
                style={{width: 150, height: 150, margin: 10, borderRadius: 15}}
                source={{
                  uri: 'https://cdn.antaranews.com/cache/800x533/2019/07/06/izin-kota-tng.jpeg',
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 14,
                    marginTop: 15,
                  }}>
                  {item.judul}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <View>
                  <FontAwesomeIcon size={15} icon={faMapMarkerAlt} />
                </View>
                <View style={{marginLeft: 5, flex: 1}}>
                  <Text style={{fontSize: 12}}>{item.alamat}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{rotation: 90}}>
                  <FontAwesomeIcon size={15} icon={faPhoneAlt} />
                </View>
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 12}}>{item.telp}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View>
                  <FontAwesomeIcon size={15} icon={faGlobe} />
                </View>
                <View
                  style={{
                    marginLeft: 5,
                    flex: 1,
                  }}>
                  <Text style={{fontSize: 12}}>{item.link}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailPerizinan');
            }}
            style={{
              marginVertical: hp('3%'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#274799',
              height: 35,
              marginHorizontal: wp('5%'),
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>Daftar Perizinan</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  useEffect(() => {
    getListTitikRawan();
  }, []);

  useEffect(() => {
    if (listTitikRawan.length !== 0) {
      setFilterTitikRawan(
        listTitikRawan.filter(x =>
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
                navigation.navigate('DashboardPerizinan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Daftar Perizinan
            </Text>
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
        ) : filterTitikRawan.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={DATA}
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
export default DaftarPerizinan;
