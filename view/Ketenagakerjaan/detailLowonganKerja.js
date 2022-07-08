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
  faBriefcase,
  faPhoneAlt,
  faEnvelope,
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

function DetailLowonganKerja({navigation}) {
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
                navigation.navigate('LowonganKerja');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Detail Lowongan Pekerjaan
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Data Analytics Manager
              </Text>
            </View>
            <View style={{marginTop: hp('1%')}}>
              <Text style={{color: '#827474'}}>PT. Consulting Indonesia</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{justifyContent: 'center'}}>
                <FontAwesomeIcon
                  size={15}
                  icon={faMapMarkerAlt}
                  color="#726767"
                />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>DKI Jakarta</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{justifyContent: 'center'}}>
                <FontAwesomeIcon size={15} icon={faBriefcase} color="#726767" />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>Minimal pengalaman 7 tahun</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{rotation: 90, justifyContent: 'center'}}>
                <FontAwesomeIcon size={15} icon={faPhoneAlt} color="#726767" />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>082144090623</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{justifyContent: 'center'}}>
                <FontAwesomeIcon size={15} icon={faEnvelope} color="#726767" />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>dkaledara@gmail.com</Text>
              </View>
            </View>

            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontWeight: 'bold'}}>Tanggal lowongan ditutup</Text>
            </View>
            <View>
              <Text style={{color: '#756565'}}>30 Desember 2022</Text>
            </View>
            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontWeight: 'bold'}}>Deskripsi Pekerjaan</Text>
            </View>
            <View>
              <Text style={{color: '#756565', textAlign: 'justify'}}>
                Beberapa gambaran pekerjaan di IT Kantor Pusat, yaitu
                Application Developer, IT Infrastructure (Storage Area
                Network/SAN, Mainframe System, Server & Operating System,
                Automation, Network, Data Center Operation, Data Center Facility
                Management), Data Warehouse & Data Mining, IT Risk & Governance,
                IT Architecture, dan IT Service Management & Service Quality
              </Text>
            </View>
            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontWeight: 'bold'}}>Kualifikasi</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>1.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>
                  Lulusan S1 dengan latar belakang pendidikan atau pekerjaan di
                  bidang IT / komputer
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>2.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>IPK minimal 2,75 (skala 4,00)</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>3.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>Usia maksimal 27 tahun</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>4.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>
                  Memiliki pengetahuan mengenai Database (SQL Server, Oracle)
                  dan Big Data dapat menjadi nilai lebih
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>5.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>
                  Memiliki pengetahuan mengenai bahasa pemograman seperti C#,
                  .Net, Java (OOP, ASP .Net MVC), Javascript, Python, dan JSON,
                  dan framework seperti Spring, Angular, React, Vue, dan Node.
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>6.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>Memiliki pengetahuan terkait infrastruktur IT</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>7.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>
                  Bersedia bekerja dengan sistem shift (untuk posisi Data Center
                  Operation)
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>8.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>
                  Disiplin, jujur, teliti, dan memiliki motivasi kerja yang
                  tinggi
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
              }}>
              <View>
                <Text>9.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>Mampu bekerja sama dalam tim</Text>
              </View>
            </View>
            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontWeight: 'bold'}}>Gaji</Text>
            </View>
            <View>
              <Text style={{color: '#756565', textAlign: 'justify'}}>
                Rp. 7.000.000,- s.d Rp. 20.000.000
              </Text>
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('FormLamaran');
                }}>
                <Text style={styles.textButton}>Lamar Lamaran</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    marginHorizontal: 30,
    paddingRight: 30,

    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: wp('90%'),
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
  buttonLogin: {
    borderRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
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
    marginTop: 40,
    marginBottom: 30,
  },
});
export default DetailLowonganKerja;
