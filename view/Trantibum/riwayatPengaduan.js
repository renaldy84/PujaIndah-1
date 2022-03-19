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

function RiwayatPengaduan({navigation}) {
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

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
          <View style={styles.boxLogin}>
            <Text style={styles.textLogin}>Riwayat Pengaduan</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 20}}>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.judul}>Orang Gila Ngamuk di Jalan</Text>
            <Text>Kategori : Ketentraman Masyarakat</Text>
            <Text>Tanggal : 30 Februari 2022</Text>
            <View style={styles.containerStatus}>
              <Text style={{margin: 10}}>Status Laporan : Aktif</Text>
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
  boxLogin: {
    // borderWidth: 1,
    marginLeft: 30,
    marginTop: 30,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 20,
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  judul: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerStatus: {
    backgroundColor: '#0CFF6F',
    marginVertical: 10,
    width: '70%',
    borderRadius: 20,
  },
};
export default RiwayatPengaduan;
