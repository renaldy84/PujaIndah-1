import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Rating} from 'react-native-ratings';

function UlasanPariwisata({navigation}) {
  const [judul, setJudul] = useState('');
  const [detailUlasan, setDetailUlasan] = useState('');

  const kirim = () => {
    // navigation.navigate('MenuTrantibum');
    navigation.navigate('DetailPariwisata');
  };
  function getRating(rating) {
    console.log(rating);
  }
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
                navigation.navigate('DetailPariwisata');
              }}
            />
          </View>
          <View style={styles.boxLogin}>
            <Text style={styles.textLogin}>Tulis ulasan anda</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View>
              <Text style={[styles.text, {fontSize: 11}]}>
                Nilai Pengalaman Anda (harus diisi)
              </Text>
            </View>
            <View style={{marginTop: 12}}>
              <Rating
                type="star"
                ratingCount={5} //jumlah rating
                imageSize={30}
                onFinishRating={getRating} //get value
                // readonly={true}
                startingValue={2.5}
                fractions={1} //untuk desimal
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
    marginTop: 20,
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
    backgroundColor: '#246EE9',
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
    // fontWeight: 'bold',
    // fontSize: 18,
    margin: 5,
    marginTop: 15,
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
    marginTop: 40,
  },

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
};
export default UlasanPariwisata;
