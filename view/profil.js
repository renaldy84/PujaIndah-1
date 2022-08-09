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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHistory, faPen, faSignOut} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../config';
import Axios from 'axios';
import {faEdit} from '@fortawesome/free-regular-svg-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Profil = ({navigation}) => {
  const dispatch = useDispatch();
  const [profil, setProfil] = useState({});

  const getProfil = async () => {
    Axios({
      url: url + `/api/master/profile/user-detail`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data, 'data');
        setProfil(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
    dispatch({type: 'RESPON_LOGOUT'});
  };
  useEffect(() => {
    getProfil();
  }, []);
  return (
    <>
      <ScrollView style={styles.footer}>
        <View style={styles.boxAkun}>
          <View
            style={{
              marginTop: hp('2%'),
              marginHorizontal: wp('2%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={{
                    uri: profil.profile_pic,
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    marginLeft: wp('2%'),
                    // borderWidth: 1,
                    // aspectRatio: 2,
                    // resizeMode: 'contain',
                    borderRadius: 35,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: wp('4%'),
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {profil.name}
                </Text>
                <Text style={{fontSize: 12}}>
                  {!profil.phone ? '-' : profil.phone}
                </Text>
                <Text style={{fontSize: 12}}>{profil.email}</Text>
              </View>
              <View style={{width: 50, alignItems: 'center'}}>
                <FontAwesomeIcon
                  color="#274799"
                  size={20}
                  icon={faPen}
                  onPress={() => {
                    navigation.navigate('UbahProfile');
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                borderTopWidth: 2,
                width: wp('80%'),
                marginTop: hp('2%'),
                borderColor: '#758097',
                opacity: 0.5,
              }}></View>
          </View>

          <View
            style={{
              marginVertical: hp('2%'),
              marginHorizontal: wp('3%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text>NIK</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 5, marginLeft: 5}}>
                <Text>{profil.nik}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{flex: 1}}>
                <Text>Alamat</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 5, marginLeft: 5}}>
                <Text>{!profil.alamat ? '-' : profil.alamat}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{margin: 20}}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('PeringatanDini');
            }}
            style={styles.boxKonten}>
            <View style={styles.boxIconRight}>
              <FontAwesomeIcon color="#274799" size={25} icon={faHistory} />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 16}}>Riwayat Transaksi</Text>
            </View>
            <View style={styles.boxIconLeft}>
              <FontAwesome name="chevron-right" size={25} color="#A19C9C" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxKonten}
            onPress={() => {
              navigation.navigate('UbahPassword');
            }}>
            <View style={styles.boxIconRight}>
              <FontAwesomeIcon color="#274799" size={25} icon={faEdit} />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 16}}>Ubah Password</Text>
            </View>
            <View style={styles.boxIconLeft}>
              <FontAwesome name="chevron-right" size={25} color="#A19C9C" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxKonten} onPress={logout}>
            <View style={styles.boxIconRight}>
              <FontAwesomeIcon color="#274799" size={25} icon={faSignOut} />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 16}}>Log Out</Text>
            </View>
            <View style={styles.boxIconLeft}>
              <FontAwesome name="chevron-right" size={25} color="#A19C9C" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
const primaryColor = 'rgb(242, 69, 53)';
const disabledPrimaryColor = 'rgb(204, 88, 78)';
const styles = {
  boxAkun: {
    borderRadius: 10,
    marginTop: hp('5%'),
    marginHorizontal: wp('5%'),
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
    backgroundColor: '#fff',
  },
  footer: {
    // flex: 2,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: '#F2F2F2',
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    // borderWidth: 1,
    marginRight: 40,
    borderRadius: 15,
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
};

export default Profil;
