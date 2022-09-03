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
import url from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Ticketing({navigation}) {
  const [listTicket, setListTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getTicket = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/tickets`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log('Kartu Identitas Anak : ', response.data);
        setListTicket(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    console.log(item.layanan.nama);
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
              <View style={{borderWidth: 1, flexDirection: 'row'}}>
                <View style={{marginTop: 5}}>
                  <Text style={{fontWeight: 'bold'}}>xxx</Text>
                </View>
              </View>
              {/* <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>NIK :</Text> {item.nik}
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>NKK :</Text> {item.nkk}
              </Text> */}
              <View style={{marginTop: 20, alignItems: 'flex-end'}}>
                <View
                  style={{
                    height: 30,
                    width: 117,
                    backgroundColor: '#F2C94C',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>
                    PENDING
                  </Text>
                </View>
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
    getTicket();
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
            alignItems: 'center',
            backgroundColor: '#274799',
          }}>
          {/* <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DashboardKependudukan');
              }}
            />
          </View> */}
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Eticketing</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: hp('2%'),
          }}></View>

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
        ) : listTicket.length !== 0 ? (
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={listTicket}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={renderFooter}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
            />
          </View>
        ) : (
          <View>
            <Text>Data Tidak ditemukan</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormKIA');
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#274799',
            position: 'absolute',
            bottom: 20,
            right: 30,
          }}>
          <Text style={{fontSize: 35, color: 'white'}}>+</Text>
        </TouchableOpacity>
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
export default Ticketing;
