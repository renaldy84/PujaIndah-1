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
  FlatList,
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
import Axios from 'axios';
import url from '../../config';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

function RiwayatPengaduan({navigation}) {
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRiwayat = async () => {
    setIsLoading(true);
    Axios({
      url:
        url +
        `/api/trantibumlinmas/pengaduan/history-pengaduan?order=created_at+desc `,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data);
        setRiwayat(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    // console.log(item.wilayah[0].nama);
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.judul}>{item.judul_laporan}</Text>
          <Text>Kategori : {item.nama_kategori}</Text>
          <Text>
            Tanggal : {moment(new Date(item.created_at)).format('DD-MM-YYYY')}
          </Text>
          <View style={styles.containerStatus}>
            <Text style={{margin: 10}}>
              Status Laporan : {item.status_text}
            </Text>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    getRiwayat();
  }, []);

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
        <View style={{marginHorizontal: 20, flex: 1}}>
          {isLoading ? (
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <ActivityIndicator size={30} />
            </View>
          ) : (
            <FlatList
              data={riwayat}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // ListFooterComponent={renderFooter}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
            />
          )}
        </View>
        {/* <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}></ScrollView> */}
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
