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
import {
  faArrowLeft,
  faCalendarDays,
  faMapMarkerAlt,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import dataJson from '../../locales/m_daerah.json';

function Beasiswa({navigation}) {
  const [nama, setNama] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [idDaerah, setIdDaerah] = useState('');

  const getDataJson = dataJson.map(item => {
    const data = {};
    data.id = item.id;
    data.m_daerah_id = item.m_daerah_id;
    data.nama = item.nama;
    return data;
  });

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
            <Text style={[styles.textJudul, {color: 'white'}]}>Beasiswa</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* <View>
              <Text style={styles.text}>Nama Daerah</Text>
            </View> */}
            {/* <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama Daerah"
              />
            </View> */}

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Nama Daerah</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idDaerah}
                onValueChange={(itemValue, itemIndex) => {
                  setIdDaerah(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Daerah"
                  value=""
                  style={{color: '#b0b0b0', fontSize: 14}}
                />
                {getDataJson.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.nama}
                      value={item.m_daerah_id}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>

            <View
              style={{
                marginTop: hp('1%'),
                marginBottom: hp('5%'),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={() => {
                    navigation.navigate('DaftarBeasiswa', {
                      itemId: idDaerah,
                    });
                  }}>
                  <Text style={styles.textButton}>Cari</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: wp('95%'),
    paddingHorizontal: 15,
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
    height: 50,
    backgroundColor: '#274799',
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
  drbDown: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: '#A19C9C',
    width: '100%',
    marginLeft: 5,
    marginBottom: 0,
    padding: 10,
    color: '#000000',
  },
  tanggal: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: '#A19C9C',
    width: '100%',
    marginLeft: 5,
    marginBottom: 0,
    paddingLeft: 10,
    color: '#000000',
    justifyContent: 'center',
  },
  textCalendar: {
    fontSize: 14,
  },
});
export default Beasiswa;
