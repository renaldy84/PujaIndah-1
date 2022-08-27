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
  faSearch,
  faArrowLeft,
  faMapMarkerAlt,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import url from '../../config';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {BallIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

function LowonganKerja({navigation}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [listPerusahaan, setPerusahaan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/ketenagakerjaan/naker-lowongan/getall?order=id+asc`,
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

  const getPerusahaan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/ketenagakerjaan/naker-perusahaan/getall?order=id+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data);
        setPerusahaan(response.data.data);
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
            navigation.navigate('DetailLowonganKerja', {idLoker: item.id});
          }}
          style={{
            width: wp('90%'),
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: '#EFEFEF',
            marginTop: hp('2%'),
            paddingVertical: hp('3%'),
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {item.lowongan}
            </Text>
          </View>
          <View>
            <Text style={{color: '#827474'}}>
              {listPerusahaan.map(val => {
                if (val.id === item.naker_perusahaan_id) {
                  return val.nama_perusahaan;
                }
              })}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
            <View>
              <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
            </View>
            <View style={{marginLeft: 10}}>
              <Text>
                {listPerusahaan.map(val => {
                  if (val.id === item.naker_perusahaan_id) {
                    return val.nama_provinsi;
                  }
                })}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
            <View>
              <FontAwesomeIcon size={20} icon={faBriefcase} />
            </View>
            <View style={{marginLeft: 10}}>
              <Text>-</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    getListTitikRawan();
    getPerusahaan();
  }, []);

  // useEffect(() => {
  //   if (listTitikRawan.length !== 0) {
  //     setFilterTitikRawan(
  //       listTitikRawan.filter(x =>
  //         x.lowongan.toLowerCase().includes(filter.toLowerCase()),
  //       ),
  //     );
  //   }
  // }, [filter]);
  return (
    <>
      <View
        style={{
          // margin: 20,
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
            marginBottom: hp('2%'),
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DashboardKetenagakerjaan');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Lowongan Pekerjaan
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
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
  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },

  container: {
    // marginTop: hp('2%'),
    margin: 15,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: wp('100%'),
  },

  arrow: {
    // borderWidth: 1,
    // marginTop: 30,
    marginLeft: 30,
  },
  boxLogin: {
    // borderWidth: 1,
    marginLeft: 30,
    // marginTop: 30,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default LowonganKerja;
