import React, {useState, useRef} from 'react';
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
import {faArrowLeft, faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import MapView, {Marker} from 'react-native-maps';
import {RadioButton} from 'react-native-paper';

var status = [
  {id: 1, jenisStatus: 'Siaga'},
  {id: 2, jenisStatus: 'Waspada'},
  {id: 3, jenisStatus: 'Awas'},
];
var bencana = [
  {id: 1, jenisBencana: 'Gempa Bumi'},
  {id: 2, jenisBencana: 'Tanah Longsor'},
  {id: 3, jenisBencana: 'Banjir'},
  {id: 4, jenisBencana: 'Tsunami'},
  {id: 5, jenisBencana: 'Letusan gunung api'},
  {id: 6, jenisBencana: 'Banjir bandang'},
  {id: 7, jenisBencana: 'Angin topan'},
];

var bencanaTampil = bencana.slice(0, 3);

var lokasi = [
  {id: 1, tempat: 'DKI Jakarta'},
  {id: 2, tempat: 'Jawa Barat'},
  {id: 3, tempat: 'Jawa Tengah'},
  {id: 4, tempat: 'Banten'},
  {id: 5, tempat: 'Jawa Timur'},
  {id: 6, tempat: 'Bali'},
  {id: 7, tempat: 'Nusa Tenggara Barat'},
  {id: 8, tempat: 'Nusa Tenggara Timur'},
];

var lokasiTampil = lokasi.slice(0, 3);

function PeringatanDini({navigation}) {
  const modalizeRef = useRef(null);
  const modalizeRefBencana = useRef(null);
  const modalizeRefLokasi = useRef(null);
  const [checkedBencana, setCheckedBencana] = React.useState('');
  const [checkedLokasi, setCheckedLokasi] = React.useState('');
  const filterModal = () => {
    modalizeRef.current?.open();
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
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('MenuTrantibum');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Peringatan Dini</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <View style={[styles.boxInput, {flexDirection: 'row', flex: 4}]}>
            <TextInput
              style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
              // onChangeText={val => setJudulPengaduan(val)}
              placeholder="Pencarian berdasarkan daerah"></TextInput>
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
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={filterModal}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: '#E0E0E0',
              }}>
              <FontAwesomeIcon color="grey" size={25} icon={faBars} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, margin: 20}}>
          <View style={styles.container}>
            <View style={styles.map}>
              <MapView
                style={{...StyleSheet.absoluteFillObject, borderRadius: 20}}
                initialRegion={{
                  latitude: -8.025799249673277,
                  longitude: 110.3342902104315,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{
                    latitude: -8.025799249673277,
                    longitude: 110.3342902104315,
                  }}></Marker>
              </MapView>
            </View>
            <View style={styles.content}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#0094FF', fontSize: 18}}>
                  Waspada Banjir Bandang!
                </Text>
                <Text style={{marginTop: 5}}>
                  <Text style={{fontWeight: 'bold'}}>Lokasi:</Text> Kecamatan
                  Oebobo, Kota Kupang, Provinisi NTT
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Uraian Peringatan:</Text>{' '}
                  Masyarakat harap segera mengungsi ke tempat yang lebih tinggi
                  !!!
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Tanggal:</Text> 31 Desember
                  2021 - 10 Januari 2022
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Waktu:</Text> 13:00 - 17:00
                  WIB
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Status:</Text> Siaga{' '}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.map}>
              <MapView
                style={{...StyleSheet.absoluteFillObject, borderRadius: 20}}
                initialRegion={{
                  latitude: -8.025799249673277,
                  longitude: 110.3342902104315,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{
                    latitude: -8.025799249673277,
                    longitude: 110.3342902104315,
                  }}></Marker>
              </MapView>
            </View>
            <View style={styles.content}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#0094FF', fontSize: 18}}>
                  Waspada Banjir Bandang!
                </Text>
                <Text style={{marginTop: 5}}>
                  <Text style={{fontWeight: 'bold'}}>Lokasi:</Text> Kecamatan
                  Oebobo, Kota Kupang, Provinisi NTT
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Uraian Peringatan:</Text>{' '}
                  Masyarakat harap segera mengungsi ke tempat yang lebih tinggi
                  !!!
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Tanggal:</Text> 31 Desember
                  2021 - 10 Januari 2022
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Waktu:</Text> 13:00 - 17:00
                  WIB
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Status:</Text> Siaga{' '}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.map}>
              <MapView
                style={{...StyleSheet.absoluteFillObject, borderRadius: 20}}
                initialRegion={{
                  latitude: -8.025799249673277,
                  longitude: 110.3342902104315,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{
                    latitude: -8.025799249673277,
                    longitude: 110.3342902104315,
                  }}></Marker>
              </MapView>
            </View>
            <View style={styles.content}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#0094FF', fontSize: 18}}>
                  Waspada Banjir Bandang!
                </Text>
                <Text style={{marginTop: 5}}>
                  <Text style={{fontWeight: 'bold'}}>Lokasi:</Text> Kecamatan
                  Oebobo, Kota Kupang, Provinisi NTT
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Uraian Peringatan:</Text>{' '}
                  Masyarakat harap segera mengungsi ke tempat yang lebih tinggi
                  !!!
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Tanggal:</Text> 31 Desember
                  2021 - 10 Januari 2022
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Waktu:</Text> 13:00 - 17:00
                  WIB
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Status:</Text> Siaga{' '}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.map}>
              <MapView
                style={{...StyleSheet.absoluteFillObject, borderRadius: 20}}
                initialRegion={{
                  latitude: -8.025799249673277,
                  longitude: 110.3342902104315,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{
                    latitude: -8.025799249673277,
                    longitude: 110.3342902104315,
                  }}></Marker>
              </MapView>
            </View>
            <View style={styles.content}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#0094FF', fontSize: 18}}>
                  Waspada Banjir Bandang!
                </Text>
                <Text style={{marginTop: 5}}>
                  <Text style={{fontWeight: 'bold'}}>Lokasi:</Text> Kecamatan
                  Oebobo, Kota Kupang, Provinisi NTT
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Uraian Peringatan:</Text>{' '}
                  Masyarakat harap segera mengungsi ke tempat yang lebih tinggi
                  !!!
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Tanggal:</Text> 31 Desember
                  2021 - 10 Januari 2022
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Waktu:</Text> 13:00 - 17:00
                  WIB
                </Text>
                <Text>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}>Status:</Text> Siaga{' '}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Modal Filter Pertama */}
      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 20}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Filter </Text>
          </View>
        }>
        <View style={{marginHorizontal: 20}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Status</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {status.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      borderWidth: 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                    }}>
                    <Text style={{fontSize: 12}}>{item.jenisStatus}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Jenis Bencana
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  modalizeRefBencana.current?.open();
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#0094FF'}}>
                  lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {bencanaTampil.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      borderWidth: 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                    }}>
                    <Text style={{fontSize: 12}}>{item.jenisBencana}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>Lokasi</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  modalizeRefLokasi.current?.open();
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 12, color: '#0094FF'}}>
                  lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {lokasiTampil.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      borderWidth: 1,
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 5,
                      margin: 5,
                    }}>
                    <Text style={{fontSize: 12}}>{item.tempat}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.boxButton}>
            <TouchableOpacity
              style={styles.buttonTerapkan}
              onPress={() => {
                modalizeRef.current?.close();
              }}>
              <Text style={styles.textButton}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      {/* Modal Jenis Bencana */}
      <Modalize
        ref={modalizeRefBencana}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <>
            <View style={{alignItems: 'flex-start', margin: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Jenis Bencana{' '}
              </Text>
            </View>
            <View
              style={[
                styles.boxPencarianFilter,
                {flexDirection: 'row', marginHorizontal: 20},
              ]}>
              <TextInput
                style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
                // onChangeText={val => setJudulPengaduan(val)}
                placeholder="Pencarian berdasarkan bencana"></TextInput>
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
            </View>
          </>
        }
        FooterComponent={
          <>
            <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
              <View style={styles.boxButtonReset}>
                <TouchableOpacity
                  style={styles.buttonReset}
                  onPress={() => {
                    setCheckedBencana('');
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefBencana.current?.close();
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {bencana.map((item, index) => {
            return (
              <>
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <RadioButton
                    color="#246EE9"
                    value="first"
                    status={
                      checkedBencana === item.id ? 'checked' : 'unchecked'
                    }
                    onPress={() => setCheckedBencana(item.id)}
                  />
                  <View>
                    <Text style={{fontSize: 12}}>{item.jenisBencana}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    width: '90%',
                  }}
                />
              </>
            );
          })}
        </View>
      </Modalize>
      {/* Modal Lokasi */}
      <Modalize
        ref={modalizeRefLokasi}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <>
            <View style={{alignItems: 'flex-start', margin: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Lokasi </Text>
            </View>
            <View
              style={[
                styles.boxPencarianFilter,
                {flexDirection: 'row', marginHorizontal: 20},
              ]}>
              <TextInput
                style={[styles.textInput, {flex: 5, fontSize: 12, height: 40}]}
                // onChangeText={val => setJudulPengaduan(val)}
                placeholder="Pencarian berdasarkan lokasi"></TextInput>
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
            </View>
          </>
        }
        FooterComponent={
          <>
            <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
              <View style={styles.boxButtonReset}>
                <TouchableOpacity
                  style={styles.buttonReset}
                  onPress={() => {
                    setCheckedLokasi('');
                  }}>
                  <Text style={styles.textButtonReset}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={styles.buttonBencana}
                  onPress={() => {
                    modalizeRef.current?.open();
                    modalizeRefLokasi.current?.close();
                  }}>
                  <Text style={styles.textButton}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }>
        <View style={{marginTop: 20, marginLeft: 20}}>
          {lokasi.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <RadioButton
                    color="#246EE9"
                    value="first"
                    status={checkedLokasi === item.id ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedLokasi(item.id)}
                  />
                  <View>
                    <Text style={{fontSize: 12}}>{item.tempat}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    width: '90%',
                  }}
                />
              </>
            );
          })}
        </View>
      </Modalize>
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
    marginTop: 30,
    marginLeft: 30,
  },
  boxJudul: {
    // borderWidth: 1,
    marginLeft: 30,
    marginTop: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    // marginTop: 5,
    marginBottom: 40,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  map: {
    height: 200,
  },
  content: {
    flex: 1,
    margin: 10,
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
});
export default PeringatanDini;
