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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faMapMarkerAlt,
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

function KreditUsaha({navigation}) {
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
              Kredit Usaha
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

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <TouchableOpacity
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
                  KUR Milenial
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View>
                  <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Kota Tangerang</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{rotation: 90}}>
                  <FontAwesomeIcon size={20} icon={faPhoneAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>0333-5161717</Text>
                </View>
              </View>

              <View style={{marginTop: hp('2%')}}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Keterangan
                  </Text>
                </View>
                <View>
                  <Text>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, ... Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
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
                  Kredit Usaha Mikro BRI
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View>
                  <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Kabupaten Kupang</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{rotation: 90}}>
                  <FontAwesomeIcon size={20} icon={faPhoneAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>031-75161717</Text>
                </View>
              </View>

              <View style={{marginTop: hp('2%')}}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Keterangan
                  </Text>
                </View>
                <View>
                  <Text>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, ... Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
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
                  Kredit Usaha Mikro BRI
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View>
                  <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>Kota Bengkulu</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{rotation: 90}}>
                  <FontAwesomeIcon size={20} icon={faPhoneAlt} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>0333-5161717</Text>
                </View>
              </View>

              <View style={{marginTop: hp('2%')}}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Keterangan
                  </Text>
                </View>
                <View>
                  <Text>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, ... Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
export default KreditUsaha;
