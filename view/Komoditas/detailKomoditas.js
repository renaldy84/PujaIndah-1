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
  faPhoneAlt,
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

function DetailKomoditas({navigation}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/komoditas/harga-bahan-pangan/getall?order=harga+asc`,
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
        <View
          style={{
            width: wp('90%'),
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: '#EFEFEF',
            marginTop: hp('1%'),
            paddingVertical: hp('3%'),
          }}>
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              {item.nama_bahan_pangan}
            </Text>
          </View>
          <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
            <View style={{width: wp('20%')}}>
              <Text>Harga</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text>Rp. {item.harga}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    getListTitikRawan();
  }, []);
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
                navigation.navigate('DashboardKomoditas');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Detail Komoditas
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: hp('1%'),
          }}>
          <Text style={{fontSize: 15, color: '#2A4F70'}}>
            Tanggal Update: 30 Desember 2022
          </Text>
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
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('1%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Beras</Text>
              </View>
              <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
                <View style={{width: wp('20%')}}>
                  <Text>Harga</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Rp. 9.700 / Kg</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('1%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Daging Ayam Ras Segar
                </Text>
              </View>
              <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
                <View style={{width: wp('20%')}}>
                  <Text>Harga</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Rp. 21.000 / Kg</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('1%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Bawang Merah
                </Text>
              </View>
              <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
                <View style={{width: wp('20%')}}>
                  <Text>Harga</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Rp. 34.000 / Kg</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('1%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Bawang Putih
                </Text>
              </View>
              <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
                <View style={{width: wp('20%')}}>
                  <Text>Harga</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Rp. 32.000 / Kg</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('1%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Minyak Goreng
                </Text>
              </View>
              <View style={{marginTop: hp('1%'), flexDirection: 'row'}}>
                <View style={{width: wp('20%')}}>
                  <Text>Harga</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Rp. 18.700 / Kg</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView> */}
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
    marginHorizontal: 20,
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
export default DetailKomoditas;
