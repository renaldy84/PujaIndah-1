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
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import MapView, {Marker} from 'react-native-maps';
import {RadioButton} from 'react-native-paper';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function BuatAspirasi({navigation}) {
  
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            // console.log(item.id);
            // navigation.navigate('DetailInfrastruktur', {
            //   idInfrastruktur: item.id,
            // });
          }}
          style={styles.container}>
          <View style={styles.content}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 10,
                // alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    marginTop: 15,
                  }}>
                  judul
                </Text>
              </View>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Tanggal Pengiriman :</Text>{' '}
                p
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Untuk Anggota Dewan :</Text>{' '}
                p
              </Text>
              <Text style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold'}}>Isi Aspirasi :</Text>{' '}
                p
              </Text>
              <Text style={{marginTop: 25}}>
                <Text style={{fontWeight: 'bold'}}>Dokumen :</Text>{' '}
                <Text style={{color:"#2F80ED"}}> 
                Lampiran.pdf
                </Text>
              </Text>
              <View style={{ marginTop:20, alignItems:'flex-end'}}>
              <View style={{height:30, width:117, backgroundColor:"#F2C94C", borderRadius:15, alignItems:'center', justifyContent:'center'}}> 
                <Text style= {{fontWeight:"bold", fontSize: 12}}>
                    PENDING
                </Text>
              </View>
              </View>
              {/* <View style={{marginTop: 10, marginBottom: 15}}>
                <Text>
                  Jl. Raya Bekasi No.KM.18, RT.6/RW.2, Pulo Gadung, East Jakarta
                  City, Jakarta 13260
                </Text>
                <Text>
                  <Text>Jam Mulai:</Text> 08:00 AM
                </Text>
                <Text>
                  <Text>Jam Selesai:</Text> 17:00 PM
                </Text>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

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
            alignItems: 'center',
            height: hp('10%'),
            backgroundColor: '#274799',
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color='white'
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DashboardAspirasi');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Buat Aspirasi Anda</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: hp('2%'),
          }}>
          {/* <View style={[styles.boxInput, {flexDirection: 'row', flex: 4}]}>
            <TextInput
              style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
              onChangeText={( ) => {} }
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
          </View> */}
        </View>

        {/* {isLoading ? (
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={30} />
          </View>
        ) : filterDataBansos.length !== 0 ? ( */}
          <View style={{flex: 1, margin: 20}}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // ListFooterComponent={renderFooter}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
            />
          </View>
        {/* ) : (
          <>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Text>Data tidak ditemukan</Text>
            </View>
          </>
        )} */}
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
    color:'white'
  },
  container: {
    // marginTop: 5,
    marginBottom: hp('3%'),
    marginLeft: 10,
    width: wp('85%'),
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
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
    marginTop: 10,
    marginBottom: 20,
  },
  buttonTerapkan: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    backgroundColor: '#246EE9',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
  textButtonReset: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  boxButtonReset: {
    width: '50%',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonReset: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#246EE9',
    marginTop: 15,
    justifyContent: 'center',
  },
  boxPencarianFilter: {
    margin: 5,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonBencana: {
    borderRadius: 10,
    width: '50%',
    height: 40,
    backgroundColor: '#246EE9',
    marginTop: 15,
    marginLeft: 5,
    justifyContent: 'center',
  },
  buttonBooking: {
    backgroundColor: '#2E81ED',
    borderRadius: 5,
    marginLeft: 10,
    height: hp('5%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BuatAspirasi;
