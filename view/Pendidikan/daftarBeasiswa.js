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
  Linking,
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

function DaftarBeasiswa({navigation, route}) {
  const {itemId} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    Axios({
      url:
        url + `/public/pend_beasiswa?m_daerah_id=${itemId}&page=0&per_page=20`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: wp('90%'),
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: 'white',
            marginTop: hp('2%'),
            paddingVertical: hp('3%'),
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
          }}>
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item?.nama}</Text>
          </View>
          <View style={{marginTop: hp('2%')}}>
            <Text>{item?.persyaratan}</Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: hp('2%'),
              backgroundColor: '#274799',
              height: 35,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL(item?.url)}>
            <Text style={{fontSize: 12, color: 'white'}}>
              Lihat Selengkapnya
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getData();
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
                navigation.navigate('Beasiswa');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              List Daftar Beasiswa
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
            Daftar Beasiswa {data?.m_daerah?.nama}
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
        ) : data.length !== 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
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
export default DaftarBeasiswa;
