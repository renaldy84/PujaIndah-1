import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Rating} from 'react-native-ratings';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {BallIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function UlasanPariwisata({navigation, route}) {
  const pariwisataId = route.params.idPariwisata;
  const [judul, setJudul] = useState('');
  const [detailUlasan, setDetailUlasan] = useState('');
  const [rating, setRating] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSukses, setModalVisibleSukses] = useState(false);
  const [message, setMessage] = useState('');

  const kirim = async () => {
    setModalLoading(true);
    Axios({
      url: url + `/api/pariwisata/pariwisata-comment/create`,
      method: 'post',
      data: {
        pesan: detailUlasan,
        pariwisata_id: pariwisataId,
        rating: rating,
        judul: judul,
      },
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(respon => {
        setModalLoading(false);
        setModalVisibleSukses(true);
        console.log(respon.data);
        setMessage(respon.data.message);
      })
      .catch(err => {
        setModalVisible(true);
        setModalLoading(false);
        setMessage(err.response.data.message);
      });
    // navigation.navigate('DetailPariwisata');
  };
  function getRating(rating) {
    setRating(rating);
    console.log(rating);
  }
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSukses}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/success.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: hp('5%'),
                  justifyContent: 'center',
                }}>
                {message}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisibleSukses(!modalVisibleSukses);
                setDetailUlasan('');
                setJudul('');
                setRating(0);
                navigation.navigate('DetailPariwisata', {
                  idPariwisata: pariwisataId,
                });
                // setMessage('');
              }}
              style={{
                backgroundColor: '#246EE9',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Ok
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../assets/image/warning.png')}></Image>

            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: hp('5%'),
                  justifyContent: 'center',
                }}>
                {message}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                setMessage('');
              }}
              style={{
                backgroundColor: '#ff0000',
                marginTop: 20,
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 14,
                  margin: 10,
                }}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modalLoading}>
        <View style={styles.centeredViewModal}>
          <View>
            <View style={{alignItems: 'center'}}>
              <BallIndicator color="white" />
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          // margin: 20,
          flex: 1,
          resizeMode: 'cover',
          // justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: hp('2%'),
            backgroundColor: '#274799',
            height: hp('10%'),
            alignItems: 'center',
            // marginTop: hp('5%'),
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('DetailPariwisata');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={[styles.textLogin, {color: 'white'}]}>
              Tulis ulasan anda
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={[styles.text, {fontSize: 11}]}>
                Nilai Pengalaman Anda (harus diisi)
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                // borderWidth: 1,
                width: '80%',
                alignItems: 'flex-start',
              }}>
              <Rating
                type="star"
                ratingCount={5} //jumlah rating
                imageSize={30}
                onFinishRating={getRating} //get value
                // readonly={true}
                // jumpValue={1}
                startingValue={0}
                fractions={0} //untuk desimal
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={[styles.text, {fontSize: 14}]}>
                Judul Ulasan (harus diisi)
              </Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={val => setJudul(val)}
                placeholder="Judul"></TextInput>
            </View>

            <View>
              <Text style={[styles.text, {fontSize: 14}]}>
                Berikan Ulasan (harus diisi)
              </Text>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                multiline={true}
                numberOfLines={6}
                style={[styles.textInput, {textAlignVertical: 'top'}]}
                onChangeText={val => setDetailUlasan(val)}
                placeholder="Tulis ulasan sesuai pengalaman anda"></TextInput>
            </View>

            <View style={styles.boxButton}>
              <TouchableOpacity style={styles.buttonLogin} onPress={kirim}>
                <Text style={styles.textButton}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = {
  background: {
    backgroundColor: '#C67FEF',
    height: '100%',
  },

  container: {
    marginTop: hp('2%'),
    margin: 30,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
  },

  buttonLogin: {
    borderRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  text: {
    margin: 5,
    marginTop: hp('2%'),
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
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
    marginTop: hp('2%'),
  },

  arrow: {
    marginLeft: 30,
  },
  boxLogin: {
    // borderWidth: 1,
    marginLeft: 30,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080a1a99',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
};
export default UlasanPariwisata;
