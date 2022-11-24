import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Dimensions,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faFilePdf,
  faPaperclip,
  faCamera,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Axios from 'axios';
import url from '../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-picker';

function DetailTicketing({navigation, route}) {
  const detailTicketing = route.params.detailTicketing;
  const [komentar, setKomentar] = useState('');
  const [dataKomentar, setDataKomentar] = useState([]);
  const modalizeRef = useRef(null);
  const modalizeRefKTP = useRef(null);
  const [modalHandleFoto, setModalHandleFoto] = useState(false);
  const [foto, setFoto] = useState(null);
  const [namaFoto, setNamaFoto] = useState('Unggah Foto');
  const [dataFotoKejadian, setDataFotoKejadian] = useState({});
  const [linkFotoKejadian, setLinkFotoKejadian] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);

  const getKomentar = async () => {
    Axios({
      url: url + `/v1/tickets/${detailTicketing.inquiry.id}/comments`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log('Komentar : ', response.data.data);
        setDataKomentar(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        if (!response.didCancel) {
          let formData = new FormData();
          setFoto(response.uri);
          // setDataFoto(response.data);
          setNamaFoto(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKejadian(formData);
        }
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
        if (!response.didCancel) {
          let formData = new FormData();
          setFoto(response.uri);
          // setDataFoto(response.data);
          setNamaFoto(response.fileName);
          formData.append('file', {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          // setDataFotoKejadian(formData);
          kirimFotoKejadian(formData);
        }
      },
    );
  };

  const kirimFotoKejadian = async formData => {
    fetch(url + '/api/master/media/upload', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      body: formData,
    })
      .then(async res => {
        let data = await res.json();
        console.log(data, '>>>>>>>>>>>>>>>>>>>');
        setLinkFotoKejadian(data.data.path);
      })
      .catch(err => {
        console.log('Gagal Kejadian');
      });
  };

  const cekKirim = () => {
    komentar === '' ? setModalHandleFoto(true) : kirim();
  };

  const kirim = async () => {
    console.log(detailTicketing.layanan.id);
    Axios({
      url: url + `/v1/tickets/${detailTicketing.inquiry.id}/comments`,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      data: {
        txt: komentar,
        file_url: linkFotoKejadian,
      },
    })
      .then(async res => {
        console.log(res, '>>>>>>>>>');
        setModalVisibleSukses(true);
      })
      .catch(error => {
        console.log(error);
        setModalVisible(true);
      });

    // : navigation.navigate('MenuTrantibum');
  };

  useEffect(() => {
    getKomentar();
    // getDetail();
  }, []);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSukses}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/success.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                Sukses
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisibleSukses(!modalVisibleSukses);
                getKomentar();
                setKomentar('');
                setLinkFotoKejadian('');
              }}
              style={{
                backgroundColor: '#246EE9',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Ok
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/warning.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                Gagal
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                backgroundColor: '#ff0000',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
          {/* <View
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
          </View> */}

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
      <Modal animationType="fade" transparent={true} visible={modalHandleFoto}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/image/warning.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                Harap mengisi komentar
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalHandleFoto(!modalHandleFoto);
              }}
              style={{
                backgroundColor: '#ff0000',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
            backgroundColor: '#274799',
            alignItems: 'center',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('NavigationBottom');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Detail Ticketing
            </Text>
          </View>
        </View>

        <ScrollView
          onMomentumScrollEnd={() => {
            console.log('tes scroll');
          }}
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.judul}>{detailTicketing.layanan.name}</Text>
            </View>
            <View
              style={{
                height: 30,
                width: 78,
                backgroundColor:
                  detailTicketing.inquiry.ticket_status == 0
                    ? '#D9D9D9'
                    : detailTicketing.inquiry.ticket_status == 1
                    ? '#CDFFC0'
                    : '#ffc0c0',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 12}}>
                {detailTicketing.inquiry.ticket_status == 0
                  ? 'baru'
                  : detailTicketing.inquiry.ticket_status == 1
                  ? 'diproses'
                  : 'selesai'}
              </Text>
            </View>
          </View>
          <View style={{marginTop: hp('5%')}}>
            <View>
              <Text
                style={{fontSize: 14, color: '#1C2D57', fontWeight: 'bold'}}>
                {detailTicketing.inquiry.perihal}
              </Text>
            </View>
          </View>
          <View style={{marginTop: hp('1%')}}>
            <View>
              <Text
                style={{fontSize: 12, color: '#726464', fontWeight: 'bold'}}>
                {detailTicketing.inquiry.tanggal}
              </Text>
            </View>
          </View>
          <View style={{marginTop: hp('5%')}}>
            <View>
              <Text
                style={{fontSize: 12, color: '#726464', fontWeight: 'bold'}}>
                {detailTicketing.inquiry.text}
              </Text>
            </View>
          </View>

          <View style={{marginTop: hp('3%')}}>
            {detailTicketing.inquiry.documents.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={async () => {
                    await Linking.openURL(val.file_url);
                  }}
                  style={{
                    marginTop: hp('1%'),
                    flexDirection: 'row',
                    width: wp('50%'),
                  }}>
                  <View>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      size={RFPercentage(4)}
                      color="#274799"
                    />
                  </View>
                  <View style={{justifyContent: 'center', marginLeft: 10}}>
                    <Text style={{color: '#274799'}}>{val.nama}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{marginTop: hp('5%')}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 14, color: '#1C2D57'}}>Komentar</Text>
              </View>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#274799',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>
                  {dataKomentar.length}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: hp('2%')}}>
            <View>
              <TextInput
                value={komentar}
                multiline={true}
                numberOfLines={4}
                style={{
                  textAlignVertical: 'top',
                  backgroundColor: '#F2F2F2',
                  borderRadius: 5,
                  height: 100,
                }}
                onChangeText={val => setKomentar(val)}
                placeholder="Tulis Komentar"></TextInput>
            </View>
            <View
              style={{
                backgroundColor: '#F2F2F2',
                flexDirection: 'row-reverse',
                padding: 10,
              }}>
              <View>
                <TouchableOpacity
                  onPress={cekKirim}
                  style={{
                    height: 30,
                    width: 78,
                    backgroundColor: '#274799',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      color: '#ffffff',
                    }}>
                    Kirim
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={pilihFoto}>
                <FontAwesomeIcon
                  icon={faPaperclip}
                  size={RFPercentage(4)}
                  color="#AD9E9E"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: hp('3%')}}>
            {dataKomentar.length == 0
              ? null
              : dataKomentar.map((val, index) => {
                  return (
                    <View
                      style={{
                        marginTop: hp('2%'),
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        borderBottomColor: '#b5b3b3',
                      }}
                      key={index}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                          <Text style={{fontWeight: 'bold'}}>{val.from}</Text>
                        </View>
                        <View style={{marginLeft: 5}}>
                          <Text style={{color: '#7D7D7D'}}>{val.tanggal}</Text>
                        </View>
                      </View>
                      <View
                        style={{marginTop: hp('1%'), justifyContent: 'center'}}>
                        <Text>{val.text}</Text>
                      </View>
                      {val.file_url == '' ? null : (
                        <TouchableOpacity
                          onPress={async () => {
                            await Linking.openURL(val.file_url);
                          }}
                          style={{
                            flexDirection: 'row',
                            marginTop: hp('1%'),
                            alignItems: 'center',
                          }}>
                          <View>
                            <FontAwesomeIcon
                              icon={faFilePdf}
                              size={RFPercentage(4)}
                              color="#274799"
                            />
                          </View>
                          <View style={{marginLeft: 5}}>
                            <Text style={{color: '#274799'}}>file.pdf</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  },
  container: {
    flexGrow: 1,
    margin: 15,
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    // borderWidth: 1,
    width: wp('90%'),
  },
  judul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2D57',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
  },
  containerPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DetailTicketing;
