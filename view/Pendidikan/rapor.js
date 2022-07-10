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

function Rapor({navigation}) {
  const [nama, setNama] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');

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
            <Text style={[styles.textJudul, {color: 'white'}]}>Rapor</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>NISN</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="NISN"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Tanggal Lahir</Text>
            </View>

            <View style={[styles.tanggal, {flexDirection: 'row'}]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setShowTanggal(true)}>
                  <Text
                    style={[
                      styles.textCalendar,
                      {color: !tanggal ? '#b0b0b0' : 'black', borderWidth: 0},
                    ]}>
                    {!tanggal ? 'Tanggal Lahir' : tanggal}
                  </Text>
                  <View>
                    <DateTimePickerModal
                      isVisible={showTanggal}
                      mode="date"
                      onConfirm={val => {
                        setTanggal(
                          `${('0' + val.getDate()).slice(-2)}-${(
                            '0' +
                            (val.getMonth() + 1)
                          ).slice(-2)}-${val.getFullYear()}`,
                        );
                        setShowTanggal(false);
                      }}
                      onCancel={() => {
                        setShowTanggal(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  color="#A19C9C"
                  size={25}
                  icon={faCalendarDays}
                />
              </View>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Tahun Ajaran</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKategoriAduan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKategoriAduan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Tahun Ajaran"
                  value=""
                  style={{color: '#b0b0b0', fontSize: 14}}
                />
                <Picker.Item
                  label="2021/2022"
                  value="java"
                  style={{fontSize: 14}}
                />
                <Picker.Item
                  label="2020/2019"
                  value="js"
                  style={{fontSize: 14}}
                />
              </Picker>
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Semester</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKategoriAduan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKategoriAduan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Semester"
                  value=""
                  style={{color: '#b0b0b0', fontSize: 14}}
                />
                <Picker.Item
                  label="Gasal"
                  value="java"
                  style={{fontSize: 14}}
                />
                <Picker.Item label="Genap" value="js" style={{fontSize: 14}} />
              </Picker>
            </View>

            <View
              style={{
                marginTop: hp('3%'),
                marginBottom: hp('5%'),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={() => {
                    navigation.navigate('InformasiSiswa');
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
export default Rapor;
