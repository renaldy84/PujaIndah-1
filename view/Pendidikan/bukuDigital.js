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
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';

function BukuDigital({navigation}) {
  const [nama, setNama] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [cari, setCari] = useState(false);

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
        <View style={styles.containerList}>
          <View style={styles.content}>
            <View>
              <Image
                resizeMode="stretch"
                style={{width: 150, height: '90%', margin: 10}}
                source={require('../../assets/image/iconPendidikan/buku1.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  Sd/Mi Kls.Iv-V-Vi Penuntun Penyelesaian....
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#817272',
                    fontSize: 12,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  Sukino
                </Text>
              </View>

              <View style={{marginTop: hp('5%'), marginBottom: 10}}>
                <TouchableOpacity
                  style={styles.buttonBooking}
                  onPress={() => {
                    // navigation.navigate('BookingAlat');
                  }}>
                  <Text style={{color: 'white'}}>Unduh</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
                navigation.navigate('DashboardPendidikan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Buku Digital
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Nama Daerah</Text>
          </View>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.textInput}
              onChangeText={val => setNama(val)}
              placeholder="Nama Daerah"></TextInput>
          </View>

          <View
            style={{
              marginTop: hp('1%'),
              marginBottom: hp('2%'),
            }}>
            <View>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  setCari(true);
                }}>
                <Text style={styles.textButton}>Cari</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.container, {flex: 1}]}>
          {cari ? (
            <>
              <View style={{marginTop: 20}}>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  // ListFooterComponent={renderFooter}
                  // onEndReached={handleLoadMore}
                  // onEndReachedThreshold={0}
                />
              </View>
            </>
          ) : null}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: wp('95%'),
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  arrow: {
    marginLeft: 30,
  },
  boxJudul: {
    marginLeft: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonLogin: {
    borderRadius: 5,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    borderRadius: 10,
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    margin: 5,
    marginTop: 15,
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000000',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#A19C9C',
  },
  containerList: {
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
  buttonBooking: {
    backgroundColor: '#274799',
    borderRadius: 5,

    height: hp('5%'),
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BukuDigital;
