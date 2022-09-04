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
  Linking,
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
  const [isLoading, setIsLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

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

  const getData = async () => {
    const idDaerah = await AsyncStorage.getItem('m_daerah_id');
    setIsLoading(true);
    Axios({
      url: url + `/keur/riwayat/8?m_daerah_id=${idDaerah}&per_page=100`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        setIsLoading(false);
        setDataDetail(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const _renderDataStatusUji = () => {
    if (dataDetail.status_uji === 0) {
      return 'BELUM UJI';
    } else if (dataDetail.status_uji === 1) {
      return 'TIDAK LAYAK';
    } else {
      return 'LULUS UJI';
    }
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

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
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
                <Text>{dataDetail?.nama}</Text>
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
                <Text>{dataDetail?.alamat}</Text>
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
                <Text>{dataDetail?.no_kendaraan}</Text>
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
                <Text>{dataDetail?.retribusi}</Text>
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
                <Text>{dataDetail?.biaya_denda}</Text>
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
                <Text>{dataDetail.admin_bank}</Text>
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
                <Text>{dataDetail?.lokasi_uji}</Text>
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
                <Text>: {dataDetail?.tgl_uji}</Text>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <Text>{dataDetail?.tgl_dikerjakan}</Text>
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
                <Text>{_renderDataStatusUji()}</Text>
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
                <Text>
                  {dataDetail?.status_pembayaran === 0
                    ? 'BELUM LUNAS'
                    : 'LUNAS'}{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: hp('3%'),
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.buttonUpload}
                onPress={() => Linking.openURL(dataDetail?.foto_stnk)}>
                <Text style={{fontSize: RFValue(10)}}>Foto STNK</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.buttonInvoice}>
                <Text style={{fontSize: RFValue(10), color: 'black'}}>
                  Unduh Invoice
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buttonInvoice}
                onPress={() =>
                  navigation.navigate('QrCodeKendaraan', {
                    link: dataDetail?.qrcode_text,
                  })
                }>
                <Text style={{fontSize: RFValue(10), color: 'black'}}>
                  Lihat QR Code
                </Text>
              </TouchableOpacity>
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
    height: 35,
    margin: 5,
    padding: 10,
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
