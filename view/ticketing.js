import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
  faComments,
  faHouse,
  faCamera,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
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
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {faComment} from '@fortawesome/free-regular-svg-icons';

function Ticketing({navigation}) {
  const [listTicket, setListTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalizeRef = useRef(null);
  const getTicket = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/v1/my_tickets`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        // console.log('Ticket : ', response.data.data);
        setListTicket(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            // console.log(item);
            navigation.navigate('DetailTicketing', {
              detailTicketing: item,
            });
          }}>
          <View style={styles.content}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold', color: '#1C2D57'}}>
                    {item.layanan.name}
                  </Text>
                </View>
                <View
                  style={{
                    height: 30,
                    width: 78,
                    backgroundColor:
                      item.inquiry.ticket_status == 0
                        ? '#D9D9D9'
                        : item.inquiry.ticket_status == 1
                        ? '#CDFFC0'
                        : '#ffc0c0',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>
                    {item.inquiry.ticket_status == 0
                      ? 'baru'
                      : item.inquiry.ticket_status == 1
                      ? 'diproses'
                      : 'selesai'}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 12, color: '#1C2D57'}}>
                    {item.inquiry.perihal}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 12}}>{item.inquiry.tanggal}</Text>
                </View>
                <View style={{marginHorizontal: 10}}>
                  <FontAwesomeIcon
                    icon={faComment}
                    size={RFPercentage(5)}
                    color="#274799"
                  />
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: -5,
                      right: -8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                        textAlign: 'center',
                      }}>
                      {item.inquiry.documents.length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const pilihLayanan = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    getTicket();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTicket();
    }, []),
  );

  return (
    <>
      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={hp('50%')}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 10}}>
            <Text style={{fontSize: 14}}>Pilih Layanan</Text>
          </View>
        }>
        <ScrollView
          style={{
            width: wp('100%'),
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BuatPengaduan');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Trantibumlinmas</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PengajuanKeur');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Perhubungan</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AktaKelahiran');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Kependudukan (Akta Kelahiran)</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AktaKematian');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Kependudukan (Akta Kematian)</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('KartuIdentitasAnak');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Kependudukan (KIA)</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('KartuTandaPenduduk');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Kependudukan (KTP)</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FormBuatAspirasi');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Aspirasi</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C9C8C8',
              width: wp('100%'),
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BuatPengaduanPekerjaanUmum');
              }}
              style={{alignItems: 'center', marginLeft: 20}}>
              <View>
                <Text>Layanan Pekerjaan Umum</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modalize>
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
          onPress={pilihLayanan}
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
