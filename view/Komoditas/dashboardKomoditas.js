import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Keyboard,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
  faPhoneAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native-paper';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DashboardKomoditas = ({navigation}) => {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [listPerusahaan, setPerusahaan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/komoditas/pasar/getall?order=nama+asc`,
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailKomoditas');
        }}
        style={{
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          backgroundColor: '#EFEFEF',
          padding: 15,
          paddingHorizontal: 25,
          borderRadius: 20,
        }}>
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.nama}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
          <View>
            <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text>{item.nama_kabkot}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
          <View style={{rotation: 90}}>
            <FontAwesomeIcon size={20} icon={faPhoneAlt} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text>{item.pengurus}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getListTitikRawan();
  }, []);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#274799',
          }}>
          <View style={styles.header}>
            <View style={styles.arrow}>
              <FontAwesomeIcon
                size={30}
                icon={faArrowLeft}
                color="#fff"
                onPress={() => {
                  navigation.navigate('NavigationBottom');
                }}
              />
            </View>
            <View style={styles.boxJudul}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Layanan Komoditas
              </Text>
            </View>
          </View>
          <View style={styles.boxIsi}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'white', textAlign: 'left'}}>
                  Aplikasi layanan komuditas telah running yang bermanfaat bagi
                  pemerintah daerah, pelaku usaha, distributor dan masyarakat
                  perorangan dalam memberikan data tentang harga dan distribusi
                  serta jumlah hasil produksi kebutuhan 9 bahan pokok.
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  style={{width: wp('40%'), height: wp('40%')}}
                  source={require('../../assets/image/iconKomoditas/komoditas.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                style={[styles.textInput, {fontSize: 12, height: 40, flex: 5}]}
                onChangeText={val => {
                  setFilter(val);
                }}
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
                  data={filterTitikRawan}
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
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const primaryColor = 'rgb(242, 69, 53)';
const disabledPrimaryColor = 'rgb(204, 88, 78)';
const styles = {
  header: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: hp('5%'),
  },
  arrow: {
    // borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 30,
  },
  boxJudul: {
    width: '80%',
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: 20,
    paddingRight: 10,
  },
  boxIsi: {
    // borderWidth: 1,
    marginTop: hp('3%'),
    marginLeft: 30,
    margin: 30,
  },
  footer: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: hp('1%'),
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    // borderWidth: 1,
    marginRight: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  boxIconRight: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    // borderWidth: 1,
    justifyContent: 'center',
    height: '100%',
    width: '60%',
  },
  boxIconLeft: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInput: {
    margin: 5,
    marginVertical: hp('3%'),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
};

export default DashboardKomoditas;
