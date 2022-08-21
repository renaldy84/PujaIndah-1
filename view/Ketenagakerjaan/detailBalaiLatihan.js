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
  faBars,
  faLocation,
  faMapLocation,
  faMapMarkerAlt,
  faPhoneAlt,
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
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

function DetailBalaiLatihan({navigation, route}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const idBlk = route.params.idBlk;

  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/public/blk_blk/${idBlk}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setIsLoading(false);
        setListTitikRawan(response.data.data[0]);
        setFilterTitikRawan(response.data.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListTitikRawan();
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
                navigation.navigate('BalaiLatihanKerja');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              {listTitikRawan.nama_tempat}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View>
            <Image
              resizeMode="cover"
              style={{width: wp('100%'), height: hp('30%')}}
              source={{
                uri: 'https://1.bp.blogspot.com/-KM1kEir6x84/XmmEjTdKElI/AAAAAAAAAG8/NsT58hrjn9YSABbw6QDZ-228RGLxbvJDgCLcBGAsYHQ/s1600/P_20190930_170928.jpg',
              }}
            />
          </View>
          <View style={{padding: 10, paddingHorizontal: 30}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 14,
                  marginTop: hp('2%'),
                }}>
                {listTitikRawan.nama_tempat}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
              <View>
                <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>{listTitikRawan.alamat}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{rotation: 90}}>
                <FontAwesomeIcon size={20} icon={faPhoneAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>{listTitikRawan.kontak}</Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: wp('5%'), marginTop: hp('5%')}}>
            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('DaftarJadiAnggota', {idBlk: idBlk});
                }}>
                <Text style={styles.textButton}>Daftar jadi anggota</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('DaftarKegiatan');
                }}>
                <Text style={styles.textButton}>Daftar kegiatan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('TenagaAhli');
                }}>
                <Text style={styles.textButton}>Tenaga ahli</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#E8F0FA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
  },
  buttonLogin: {
    borderRadius: 5,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    marginTop: hp('3%'),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  boxButton: {
    width: wp('90%'),
  },
});
export default DetailBalaiLatihan;
