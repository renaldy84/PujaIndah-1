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

function TenagaAhli({navigation}) {
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
              Daftar Tenaga Ahli
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Jamludin</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. KTP</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>31097363635535</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. Telp</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>0210009387</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Keahlian</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Sistem Analisis</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Pekerjaan</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Dosen</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Alamat</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Jl. Pasar Minggu</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Jamludin</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. KTP</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>31097363635535</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. Telp</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>0210009387</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Keahlian</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Sistem Analisis</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Pekerjaan</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Dosen</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Alamat</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Jl. Pasar Minggu</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: wp('90%'),
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#EFEFEF',
                marginTop: hp('2%'),
                paddingVertical: hp('3%'),
              }}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Jamludin</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. KTP</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>31097363635535</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>No. Telp</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>0210009387</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Keahlian</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Sistem Analisis</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Pekerjaan</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Dosen</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
                <View style={{width: wp('20%')}}>
                  <Text>Alamat</Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text>Jl. Pasar Minggu</Text>
                </View>
              </View>
            </View>
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
export default TenagaAhli;
