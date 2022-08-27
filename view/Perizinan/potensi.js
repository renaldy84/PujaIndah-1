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
import {faBuilding} from '@fortawesome/free-regular-svg-icons';

function Potensi({navigation}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  const data = [
    {
      gambar: 'https://joso.id/img/js_works/6041b0588330c.jpg',
      judul: 'Breda Pala Resort',
      alamat: 'Maluku Tengah, Maluku',
      telp: '(0914) 22543',
      link: 'https://dpmptsp.maltengkab.go.id/',
      office: 'DPMPTSP Kabupaten Maluku Tengah',
      sektor: 'Sektor Pariwisata',
    },
    {
      gambar:
        'https://i0.wp.com/tannebo.se/images/stora_bilder/industri/industri_37.jpg',
      judul: 'Industri Pengolahan Pati Sagu Terintegrasi',
      alamat: 'Jayapura, Papua',
      telp: '08114826222',
      link: 'https://ptsp.jayapurakab.go.id/',
      office: 'DPMPTSP Kabupaten Jayapura',
      sektor: 'Sektor Industri',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.container}>
          <View>
            <Image
              resizeMode="stretch"
              style={{width: '100%', height: 200}}
              source={{
                uri: item.gambar,
              }}
            />
            <TouchableOpacity
              style={{
                height: 30,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.56)',
                position: 'absolute',
                bottom: 10,
                right: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{fontSize: 11, color: 'white'}}>{item.sektor}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
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
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <View>
                  <FontAwesomeIcon size={15} icon={faBuilding} />
                </View>
                <View style={{marginLeft: 5, flex: 1}}>
                  <Text style={{fontSize: 12}}>{item.office}</Text>
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
              //   navigation.navigate('DetailPerizinan');
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
            <Text style={{color: 'white'}}>Lihat selekapnya</Text>
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
            <Text style={[styles.textJudul, {color: 'white'}]}>Potensi</Text>
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
              data={data}
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
    paddingHorizontal: wp('5%'),
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
export default Potensi;
