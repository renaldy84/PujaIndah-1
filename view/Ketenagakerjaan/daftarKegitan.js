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
  faArrowRight,
  faCamera,
  faFolderOpen,
  faPaperclip,
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

function DaftarKegiatan({navigation}) {
  const [filterTitikRawan, setFilterTitikRawan] = useState([]);
  const [filter, setFilter] = useState('');
  const [listTitikRawan, setListTitikRawan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListTitikRawan = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/public/blk_kategori`,
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
        <TouchableOpacity
          style={{
            width: wp('90%'),
            flexDirection: 'row',
            height: hp('6%'),
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: '#EFEFEF',
            marginTop: hp('2%'),
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>{item.nama}</Text>
          </View>
          {/* <View>
            <FontAwesomeIcon size={16} icon={faArrowRight} />
          </View> */}
        </TouchableOpacity>
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
                navigation.navigate('DetailBalaiLatihan');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Daftar Kegiatan
            </Text>
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
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Teknik Otomotif (Unggulan)</Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>
                  Teknologi Informasi Dan Komunikasi
                </Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Pariwisata</Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Pertanian</Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Teknik Listrik</Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('90%'),
                flexDirection: 'row',
                height: hp('6%'),
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Tata Boga</Text>
              </View>
              <View>
                <FontAwesomeIcon size={16} icon={faArrowRight} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TambahKegiatanBlk');
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#274799',
            position: 'absolute',
            bottom: 50,
            right: 30,
          }}>
          <Text style={{fontSize: 35, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
export default DaftarKegiatan;
