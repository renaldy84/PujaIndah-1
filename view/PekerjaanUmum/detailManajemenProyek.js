import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Axios from 'axios';
import url from '../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';

function DetailManajemenProyek({navigation, route}) {
  const idInfrastruktur = route.params.idInfrastruktur;
  const [detail, setDetail] = useState({});
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };
  const openLink = async () => {
    await Linking.openURL(detail.alamat_lokasi);
  };
  const getDetail = async () => {
    Axios({
      url: url + `/api/pu/infrastruktur/getid/${idInfrastruktur}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        if (response.data.status === 1) {
          console.log(response.data.data);
          setDetail(response.data.data);
        } else {
          console.log('Silahkan refresh halaman ini');
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getDetail();
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
            backgroundColor: '#274799',
            alignItems: 'center',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('ManajemenProyek');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Detail Manajemen Proyek
            </Text>
          </View>
        </View>

        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.judul}>
              {/* {detail.nama} */}Pembangunan Jaringan Perpipaan
            </Text>
          </View>
          <View>
            <Image
              style={{
                width: wp('90%'),
                height: wp('50%'),
                marginTop: hp('2%'),
              }}
              source={{
                uri: 'https://img.inews.co.id/media/1200/files/inews_new/2021/11/06/06_ant_banjir_karawang__3_.jpg',
              }}
            />
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Lokasi: </Text>
            <Text style={{flex: 1}}>
              {/* {detail.pu_infrastruktur_jenis_id} */}
              Kecamatan Takeran, Kabupaten Magentan
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Tahun: </Text>
            <Text style={{flex: 1}}>{/* {detail.kelas} */}2021</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>SumberDana: </Text>
            <Text style={{flex: 1}}>
              {/* {detail.ukuran} */}APBN Tahun 2021
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Waktu Pelaksanaan: </Text>
            <Text>{/* {detail.kondisi} */}180 Hari</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Nomor & Tgl.Kontrak: </Text>
            <Text style={{flex: 1}}>
              {/* {moment(new Date(detail.tanggal_pembangunan)).format(
                'DD-MM-YYYY',
              )} */}
              03/PPK.AM/APBN/2021, 05/03/2021
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Tgl. Mulai s.d Selesai: </Text>
            <Text style={{flex: 1}}>
              {detail.sumber_pembiayaan}
              05/03/2022 s.d 06/09/2022{' '}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Nilai Kontrak: </Text>
            <Text style={{flex: 1}}>
              {/* {detail.nilai} */}
              Rp. 6.500.000.000,-
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Penyedia Jasa: </Text>
            <Text style={{flex: 1}}>
              {/* {detail.status} */}
              PT. Eratama Putra Perkasa
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Supervisi: </Text>
            <Text style={{flex: 1}}>
              {/* {detail.status} */}
              PT. Skala Pilar Utama
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Progress Pekerjaan:</Text>
            <Text style={{flex: 1}}>
              {/* {detail.status} */}
              70%
            </Text>
          </View>
          {/* <View style={styles.containerPDF}>
            <Pdf
              trustAllCerts={false}
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          </View> */}
          <TouchableOpacity style={{marginTop: 25, alignItems: 'center'}}>
            <View>
              <FontAwesomeIcon size={45} icon={faFilePdf} />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#274799'}}>Unduh Laporan Pekerjaan</Text>
            </View>
          </TouchableOpacity>
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
});

export default DetailManajemenProyek;
