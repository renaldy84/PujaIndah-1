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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCamera,
  faEye,
  faEyeSlash,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import {Modalize} from 'react-native-modalize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function PeringatanDini({navigation}) {
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

        <ScrollView contentContainerStyle={{flexGrow: 1, margin: 20}}>
          <View style={styles.container}>
            <View style={styles.map}></View>
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
    </>
  );
}

const styles = {
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
    width: '100%',
    height: '40%',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  map: {
    flex: 20,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
  },
};
export default PeringatanDini;
