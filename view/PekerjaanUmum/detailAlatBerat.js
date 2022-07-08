import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Linking} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Axios from 'axios';
import url from '../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';

function DetailAlatBerat({navigation}) {
  //   const idInfrastruktur = route.params.idInfrastruktur;
  const [detail, setDetail] = useState({});

  const openLink = async () => {
    await Linking.openURL(detail.alamat_lokasi);
  };
  //   const getDetail = async () => {
  //     Axios({
  //       url: url + `/api/pu/infrastruktur/getid/${idInfrastruktur}`,
  //       method: 'get',
  //       headers: {
  //         Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
  //       },
  //     })
  //       .then(response => {
  //         if (response.data.status === 1) {
  //           console.log(response.data.data);
  //           setDetail(response.data.data);
  //         } else {
  //           console.log('Silahkan refresh halaman ini');
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.response.data);
  //       });
  //   };

  //   useEffect(() => {
  //     getDetail();
  //   }, []);
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
                navigation.navigate('ListAlatBerat');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Detail Alat Berat
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.judul}>Bulldozer</Text>
            </View>
            <View>
              <Image
                resizeMode="contain"
                style={{
                  width: wp('90%'),
                  height: wp('50%'),
                  marginTop: hp('2%'),
                }}
                source={{
                  uri: 'https://pngimg.com/uploads/bulldozer/bulldozer_PNG16429.png',
                }}
              />
            </View>
            <View style={styles.content}>
              <Text style={{fontWeight: 'bold'}}>Deskripsi </Text>
              <View style={styles.isiContent}>
                <Text style={{textAlign: 'justify'}}>
                  Bulldozer merupakan alat yang digunakan untuk mengolah tanah.
                  Bulldozer digunakan untuk mendorong material tanah hasil
                  galian, baik kedepan maupun ke samping, maupun untuk membuat
                  timbunan material. Selain itu, alat berat ini juga dapat
                  digunakan untuk membersihkan medan dari kayu, batu batuan
                  hingga tonggak tonggak pohon. Bulldozer juga disebut dengan
                  front end dozer, karena terdapat bucket di bagian dozer. Alat
                  berat ini terdiri dari dua tipe yaitu dozer yang menggunakan
                  roda kelabang (Crawler Tractor Dozer) dan dozer yang
                  menggunakan roda karet (Whell Tracktor Dozer).{' '}
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={{fontWeight: 'bold'}}>Tata cara sewa </Text>
              <View style={styles.isiContent}>
                <Text style={{textAlign: 'justify'}}>
                  Isi form booking setelah itu nanti akan dihub oleh admin,
                  terkait persyaratan lengkap dan cara transfer via Whatsapp
                  atau Email Anda.
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={{fontWeight: 'bold'}}>Daftar Harga</Text>
              <View style={styles.isiContent}>
                <Text>Bulldozer D20-3 Komatsu IDR 150.000 /Jam</Text>
                <Text>Bulldozer D31E Komatsu IDR 155.000 /Jam</Text>
                <Text>Bulldozer D65P Komatsu IDR 170.000 /Jam</Text>
                <Text>Bulldozer D85 Komatsu IDR 185.000 /Jam</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonBooking}>
            {/* <TouchableOpacity
              onPress={() => {
                console.log('tes');
              }}> */}
            <Text style={{color: 'white'}}>Booking</Text>
            {/* </TouchableOpacity> */}
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
    // flexDirection: 'row',
    marginTop: hp('2%'),
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  isiContent: {
    marginTop: hp('2%'),
  },
  buttonBooking: {
    backgroundColor: '#274799',
    height: hp('8%'),
    width: wp('100%'),
    marginLeft: 0,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailAlatBerat;
