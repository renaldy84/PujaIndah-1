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

function PeringatanDini({navigation}) {
  const modalizeRef = useRef(null);
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

      <Modalize
        ref={modalizeRef}
        // snapPoint={150}
        modalHeight={450}
        HeaderComponent={
          <View style={{alignItems: 'flex-start', margin: 20}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Filter </Text>
          </View>
        }>
        <View style={{borderWidth: 1, width: '80%', height: 200}}></View>
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
});
export default PeringatanDini;
