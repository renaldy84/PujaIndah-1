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

function DetailInfrastruktur({navigation, route}) {
  const idInfrastruktur = route.params.idInfrastruktur;
  const [detail, setDetail] = useState({});

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
            backgroundColor: '#274799',
            height: hp('10%'),
            alignItems: 'center',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DataInfrastruktur');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Detail Infrastruktur
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.judul}>{detail.nama}</Text>
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
            <Text style={{fontWeight: 'bold'}}>Jenis Infrastruktur: </Text>
            <Text style={{flex: 1}}>{detail.pu_infrastruktur_jenis_id}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Kelas/Type Infrastruktur: </Text>
            <Text style={{flex: 1}}>{detail.kelas}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>
              Dimensi/Ukuran Infrastruktur:{' '}
            </Text>
            <Text style={{flex: 1}}>{detail.ukuran}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Kondisi: </Text>
            <Text>{detail.kondisi}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Tanggal Pembangunan: </Text>
            <Text style={{flex: 1}}>
              {moment(new Date(detail.tanggal_pembangunan)).format(
                'DD-MM-YYYY',
              )}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Sumber Pembiayaan: </Text>
            <Text style={{flex: 1}}>{detail.sumber_pembiayaan}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>
              Estimasi nilai Infrastruktur:{' '}
            </Text>
            <Text style={{flex: 1}}>{detail.nilai}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Status Kepemilikan: </Text>
            <Text style={{flex: 1}}>{detail.status}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontWeight: 'bold'}}>Koordinat Lokasi: </Text>
            <TouchableOpacity
              onPress={openLink}
              style={{flex: 1, width: wp('55%')}}>
              <Text style={{color: 'blue'}}>{detail.alamat_lokasi}</Text>
            </TouchableOpacity>
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
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
  },
});

export default DetailInfrastruktur;
