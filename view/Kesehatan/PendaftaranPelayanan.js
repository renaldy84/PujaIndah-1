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

function PendaftaranPelayananKesehatan({navigation}) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [idKategoriAduan, setIdKategoriAduan] = useState();
  const [profil, setProfil] = useState({});
  const [showTanggal, setShowTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState('');

  const getProfil = async () => {
    Axios({
      url: url + `/api/master/profile/user-detail`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data);
        setProfil(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfil();
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
                navigation.navigate('DetailFasilitasKesehatan');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              Pendaftaran Pelayanan
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 14,
                  marginTop: hp('2%'),
                }}>
                Puskesmas Pamulang
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
              <View>
                <FontAwesomeIcon size={20} icon={faMapMarkerAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>
                  Jl. Satria - Sudirman, RT.002/RW.001, Sukaasih, Kec.
                  Tangerang, Kota Tangerang, Banten 15111
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{rotation: 90}}>
                <FontAwesomeIcon size={20} icon={faPhoneAlt} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text>021- 29662529</Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 2,
                marginTop: hp('3%'),
                borderColor: '#758097',
                opacity: 0.5,
              }}></View>
            <View style={{marginTop: hp('3%')}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Form Pendaftaran Layanan
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Nama</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.name}
                style={styles.textInput}
                onChangeText={val => setNama(val)}
                placeholder="Nama"></TextInput>
            </View>

            <View>
              <Text style={styles.text}>NIK</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.nik}
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="NIK"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Alamat</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                editable={false}
                value={profil.alamat}
                style={styles.textInput}
                onChangeText={val => setEmail(val)}
                placeholder="Alamat"></TextInput>
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
                      minimumDate={new Date()}
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

            <View>
              <Text style={styles.text}>Tempat Lahir</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="Tempat Lahir"></TextInput>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Jenis Kelamin</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKategoriAduan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKategoriAduan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Kategori"
                  value=""
                  style={{color: '#b0b0b0', fontSize: 14}}
                />
                <Picker.Item
                  label="Laki-Laki"
                  value="java"
                  style={{fontSize: 14}}
                />
                <Picker.Item
                  label="Perempuan"
                  value="js"
                  style={{fontSize: 14}}
                />
              </Picker>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Tinggi Badan</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                keyboardType="numeric"
                style={[styles.textInput, {flex: 5}]}
                onChangeText={val => setNik(val)}
                placeholder="Tinggi Badan"></TextInput>
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#A19C9C'}}>cm</Text>
                {/* <FontAwesomeIcon color="grey" size={25} icon={fa} /> */}
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Berat Badan</Text>
            </View>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                keyboardType="numeric"
                style={[styles.textInput, {flex: 5}]}
                onChangeText={val => setNik(val)}
                placeholder="Berat Badan"></TextInput>
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#A19C9C'}}>Kg</Text>
                {/* <FontAwesomeIcon color="grey" size={25} icon={fa} /> */}
              </View>
            </View>
            <View>
              <Text style={styles.text}>Riwayat Kesehatan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="Riwayat Kesehatan"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Alergi Obat</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="Alergi Obat"></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Alergi Makanan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setNik(val)}
                placeholder="Alergi Makanan"></TextInput>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={styles.text}>Pilih Poli</Text>
            </View>
            <View style={[styles.drbDown, {justifyContent: 'center'}]}>
              <Picker
                mode="dropdown"
                selectedValue={idKategoriAduan}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKategoriAduan(itemValue);
                }}>
                <Picker.Item
                  label="Pilih Poli"
                  value=""
                  style={{color: '#b0b0b0'}}
                />
                <Picker.Item label="Poli Gigi" value="java" />
                <Picker.Item label="Poli Kulit" value="js" />
              </Picker>
            </View>
            <View>
              <Text style={styles.text}>Pilih Tanggal Daftar</Text>
            </View>

            <View style={[styles.tanggal, {flexDirection: 'row'}]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setShowTanggal(true)}>
                  <Text
                    style={[
                      styles.textCalendar,
                      {color: !tanggal ? '#b0b0b0' : 'black', borderWidth: 0},
                    ]}>
                    {!tanggal ? 'Tanggal Daftar' : tanggal}
                  </Text>
                  <View>
                    <DateTimePickerModal
                      minimumDate={new Date()}
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
            <View>
              <Text style={styles.text}>Pilih Jadwal</Text>
            </View>

            <View style={[styles.tanggal, {flexDirection: 'row'}]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setShowTime(true)}>
                  <Text
                    style={[
                      styles.textCalendar,
                      {color: !time ? '#b0b0b0' : 'black', borderWidth: 0},
                    ]}>
                    {!time ? 'Pilih Jadwal' : time}
                  </Text>
                  <View>
                    <DateTimePickerModal
                      isVisible={showTime}
                      mode="time"
                      onConfirm={val => {
                        setTime(
                          `${('0' + val.getHours()).slice(-2)}:${(
                            '0' + val.getMinutes()
                          ).slice(-2)}`,
                        );
                        setShowTime(false);
                      }}
                      onCancel={() => {
                        setShowTime(false);
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
                <FontAwesomeIcon color="#A19C9C" size={25} icon={faClock} />
              </View>
            </View>
            <View>
              <Text style={styles.text}>Keluhan</Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={[styles.textInput, {textAlignVertical: 'top'}]}
                onChangeText={val => setNik(val)}
                placeholder="Keluhan"></TextInput>
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
                    navigation.navigate('BerhasilDaftarLayanan');
                  }}>
                  <Text style={styles.textButton}>Daftar Layanana</Text>
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
export default PendaftaranPelayananKesehatan;
