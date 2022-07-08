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
  faCamera,
  faFolderOpen,
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
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

function RiwayatPelayananKeur({navigation}) {
  const modalizeRef = useRef(null);

  const pilihFoto = () => {
    modalizeRef.current?.open();
  };

  const ambilDariCamera = () => {
    modalizeRef.current?.close();
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        // if (!response.didCancel) {
        //   let formData = new FormData();
        //   setFoto(response.uri);
        //   // setDataFoto(response.data);
        //   setNamaFoto(response.fileName);
        //   formData.append('file', {
        //     uri: response.uri,
        //     name: response.fileName,
        //     type: response.type,
        //   });
        //   // setDataFotoKejadian(formData);
        //   kirimFotoKejadian(formData);
        // }
      },
    );
  };

  const ambilDariGalery = () => {
    modalizeRef.current?.close();
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        //   maxHeight: 200,
        //   maxWidth: 200,
        quality: 0.3,
      },
      response => {
        // if (!response.didCancel) {
        //   let formData = new FormData();
        //   setFoto(response.uri);
        //   // setDataFoto(response.data);
        //   setNamaFoto(response.fileName);
        //   formData.append('file', {
        //     uri: response.uri,
        //     name: response.fileName,
        //     type: response.type,
        //   });
        //   // setDataFotoKejadian(formData);
        //   kirimFotoKejadian(formData);
        // }
      },
    );
  };

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
                navigation.navigate('DashboardPerhubungan');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Riwayat Pelayanan KEUR
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: hp('3%')}}>
              <View style={styles.buttonPendaftaran}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                  Pendaftaran
                </Text>
              </View>
              <View style={styles.buttonPerpanjangan}>
                <Text
                  style={{fontSize: 12, fontWeight: 'bold', color: '#758097'}}>
                  Perpanjangan
                </Text>
              </View>
            </View>

            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontWeight: 'bold'}}>ID KEUR : JKT0001010</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>NAMA PEMILIK</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>DEVICTOR KALE DARA</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>ALAMAT</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>JL. KEMANG RAYA NO.10 JAKSEL</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>NO. KENDARAAN</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>B 1101 AC</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>BIAYA RETRIBUSI</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>Rp. 500.000,00</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>BIAYA DENDA</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>0</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>ADMIN BANK</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>Rp. 20.000,00</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>BIAYA DENDA</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>0</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>TOTAL BIAYA</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>Rp. 520.000,00</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>LOKASI UJI</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>PKB MENTENG</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>TANGGAL UJI</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>14 DESEMBER 2022</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>STATUS UJI</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>BELUM DI LAKUKAN</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: hp('1%'),
              }}>
              <View style={{width: wp('30%')}}>
                <Text>PEMBAYARAN</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>BELUM LUNAS</Text>
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', marginTop: hp('3%')}}>
              <TouchableOpacity onPress={pilihFoto} style={styles.buttonUpload}>
                <Text style={{fontSize: RFValue(10)}}>UPLOAD BUKTI BAYAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonInvoice}>
                <Text style={{fontSize: RFValue(10), color: 'black'}}>
                  INVOICE
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ContainerQR}>
              <View style={styles.BoxQR}>
                <Text>QR Code</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={150}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 10}}>
            <Text style={{fontSize: 14}}>Pilih File</Text>
          </View>
        }>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 30,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={ambilDariCamera}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon color="#274799" size={35} icon={faCamera} />
              </View>
              <View>
                <Text>Kamera</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 100,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={ambilDariGalery}
              style={{alignItems: 'center'}}>
              <View>
                <FontAwesomeIcon
                  color="#274799"
                  size={35}
                  icon={faFolderOpen}
                />
              </View>
              <View>
                <Text>Files</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    margin: 30,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  ContainerQR: {
    flex: 1,
    marginTop: hp('5%'),
    width: '100%',
    alignItems: 'center',
  },
  BoxQR: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUpload: {
    width: 160,
    height: 35,
    margin: 5,
    marginLeft: 0,
    backgroundColor: '#E7EFD6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInvoice: {
    width: 130,
    height: 35,
    margin: 5,
    backgroundColor: '#E7EFD6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPendaftaran: {
    width: 130,
    height: 35,
    margin: 5,
    marginLeft: 0,
    backgroundColor: '#EAC324',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPerpanjangan: {
    width: 130,
    height: 35,
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#758097',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RiwayatPelayananKeur;
