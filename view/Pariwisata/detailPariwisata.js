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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faStar} from '@fortawesome/free-solid-svg-icons';
import CarouselPariwisata from './carouselPariwisata';
// import Video from 'react-native-video';
// import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import TopTabView from './topTabView';
import {Rating} from 'react-native-ratings';
import Axios from 'axios';
import url from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView as ScrollGesture} from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

function DetailPariwisata({navigation, route}) {
  const pariwisataId = route.params.idPariwisata;
  const [detail, setDetail] = useState({});
  const [transportasi, setTransportasi] = useState([]);

  const getDetail = async () => {
    Axios({
      url: url + `/api/pariwisata/pariwisata/getid/${pariwisataId}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        if (response.data.status === 1) {
          setDetail(response.data.data);
          setTransportasi(response.data.data.transportasi);
        } else {
          console.log('Silahkan refresh halaman ini');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  function Deskripsi() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={{margin: 10}}>
          <Text>{detail.narasi}</Text>
        </View>
      </ScrollView>
    );
  }

  function Transportasi() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        {transportasi.map((val, index) => {
          return (
            <View style={{margin: 10}} key={index}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text>{index + 1}. </Text>
                </View>
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                      <Text>Nama</Text>
                    </View>
                    <View style={{width: '2%'}}>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '78%'}}>
                      <Text>{val.nama}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                      <Text>Jenis</Text>
                    </View>
                    <View style={{width: '2%'}}>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '78%'}}>
                      <Text>{val.jenis}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                      <Text>Waktu</Text>
                    </View>
                    <View style={{width: '2%'}}>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '78%'}}>
                      <Text>{val.waktu}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                      <Text>Biaya</Text>
                    </View>
                    <View style={{width: '2%'}}>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '78%'}}>
                      <Text>{val.biaya}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        {/* <View style={{margin: 10}}>
          <Text></Text>
        </View> */}
      </ScrollView>
    );
  }

  function Kuliner() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={{margin: 10}}>
          <Text>Kuliner!</Text>
        </View>
      </ScrollView>
    );
  }

  function Penginapan() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={{margin: 10}}>
          <Text>Penginapan!</Text>
        </View>
      </ScrollView>
    );
  }

  function TravelAgen() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={{margin: 10}}>
          <Text>Travel Agen!</Text>
        </View>
      </ScrollView>
    );
  }
  function getRating(rating) {
    console.log(rating);
  }
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
            marginBottom: 20,
            marginHorizontal: 20,
            // borderWidth: 1,
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('ListPariwisata');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>{detail.name}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 20}}>
          <CarouselPariwisata />
          <View>
            <YoutubePlayer height={200} videoId={'Za2zEoGcfmU'} />
          </View>
          {/* <TopTabView item={detail} /> */}
          <View
            horizontal={true}
            style={{
              flex: 1,
              marginVertical: 20,
              height: 300,
            }}>
            <Tab.Navigator
              screenOptions={{
                tabBarScrollEnabled: true,
              }}>
              <Tab.Screen name="Deskripsi" component={Deskripsi} />
              <Tab.Screen name="Transportasi" component={Transportasi} />
              <Tab.Screen name="Kuliner" component={Kuliner} />
              <Tab.Screen name="Penginapan" component={Penginapan} />
              <Tab.Screen name="Travel Agen" component={TravelAgen} />
            </Tab.Navigator>
          </View>
          <View
            style={{
              marginTop: 15,
              borderBottomColor: '#e0e0e0',
              borderBottomWidth: 2,
            }}
          />
          <View style={styles.boxButton}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => {
                navigation.navigate('UlasanPariwisata');
              }}>
              <Text style={styles.textButton}>Tulis ulasan anda</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View style={{flex: 1}}>
              <View>
                <Text style={{color: '#A9A9A9', fontSize: 14}}>
                  Ulasan (238)
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  Wisata Danau Toba
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 36, fontWeight: 'bold'}}>
                  4.9<Text style={{fontSize: 14, color: '#B1A0A0'}}>/5</Text>
                </Text>
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Rating
                  type="star"
                  ratingCount={5} //jumlah rating
                  imageSize={17}
                  onFinishRating={getRating} //get value
                  readonly={true}
                  startingValue={2.5}
                  fractions={1} //untuk desimal
                />
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              {/* STAR 5 */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View style={{marginHorizontal: 2}}>
                  <FontAwesomeIcon size={17} icon={faStar} color="#EBC351" />
                </View>
                <View style={{marginHorizontal: 2}}>
                  <Text style={{fontSize: 11, color: '#B1A0A0'}}>5</Text>
                </View>
                <View style={{flex: 1, marginHorizontal: 2}}>
                  <View
                    style={{
                      borderWidth: 4,
                      width: '100%',
                      borderColor: '#2F80ED',
                      borderRadius: 4,
                      marginHorizontal: 2,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#B1A0A0',
                      fontSize: 12,
                      marginHorizontal: 5,
                    }}>
                    259
                  </Text>
                </View>
              </View>
              {/* STAR 4 */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View style={{marginHorizontal: 2}}>
                  <FontAwesomeIcon size={17} icon={faStar} color="#EBC351" />
                </View>
                <View style={{marginHorizontal: 2}}>
                  <Text style={{fontSize: 11, color: '#B1A0A0'}}>4</Text>
                </View>
                <View style={{flex: 1, marginHorizontal: 2}}>
                  <View
                    style={{
                      borderWidth: 4,
                      width: '80%',
                      borderColor: '#2F80ED',
                      borderRadius: 4,
                      marginHorizontal: 2,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#B1A0A0',
                      fontSize: 12,
                      marginHorizontal: 5,
                    }}>
                    259
                  </Text>
                </View>
              </View>
              {/* STAR 3*/}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View style={{marginHorizontal: 2}}>
                  <FontAwesomeIcon size={17} icon={faStar} color="#EBC351" />
                </View>
                <View style={{marginHorizontal: 2}}>
                  <Text style={{fontSize: 11, color: '#B1A0A0'}}>3</Text>
                </View>
                <View style={{flex: 1, marginHorizontal: 2}}>
                  <View
                    style={{
                      borderWidth: 4,
                      width: '50%',
                      borderColor: '#2F80ED',
                      borderRadius: 4,
                      marginHorizontal: 2,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#B1A0A0',
                      fontSize: 12,
                      marginHorizontal: 5,
                    }}>
                    259
                  </Text>
                </View>
              </View>
              {/* STAR 2 */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View style={{marginHorizontal: 2}}>
                  <FontAwesomeIcon size={17} icon={faStar} color="#EBC351" />
                </View>
                <View style={{marginHorizontal: 2}}>
                  <Text style={{fontSize: 11, color: '#B1A0A0'}}>2</Text>
                </View>
                <View style={{flex: 1, marginHorizontal: 2}}>
                  <View
                    style={{
                      borderWidth: 4,
                      width: '75%',
                      borderColor: '#2F80ED',
                      borderRadius: 4,
                      marginHorizontal: 2,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#B1A0A0',
                      fontSize: 12,
                      marginHorizontal: 5,
                    }}>
                    259
                  </Text>
                </View>
              </View>
              {/* STAR 1*/}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginHorizontal: 2}}>
                  <FontAwesomeIcon size={17} icon={faStar} color="#EBC351" />
                </View>
                <View style={{marginHorizontal: 2}}>
                  <Text style={{fontSize: 11, color: '#B1A0A0'}}>1</Text>
                </View>
                <View style={{flex: 1, marginHorizontal: 2}}>
                  <View
                    style={{
                      borderWidth: 4,
                      width: '20%',
                      borderColor: '#2F80ED',
                      borderRadius: 4,
                      marginHorizontal: 2,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#B1A0A0',
                      fontSize: 12,
                      marginHorizontal: 5,
                    }}>
                    259
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderBottomColor: '#E4E4E4',
                borderBottomWidth: 1,
              }}
            />
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View>
                <Image
                  source={{
                    uri: 'https://blogger.googleusercontent.com/img/a/AVvXsEisUBhb8W_4oOgwJmAGcw_131KKxTtzyX28LkAhuG7-nDSGb3XGeLxrLXEombzEpKKN2GDsPvBPFQmQBUGiO_W0-KQSF-Uz686SJQiCTwiH3zHdv8Dc4WmNzq8prp8c6EGV_QRZBc6hCV-e7mEwzQYx0FdttYEWYboMnwJEmJiDz3nP-V6nTQ9tORHdyA=s16000',
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    marginLeft: 0,
                    // aspectRatio: 2,
                    // resizeMode: 'contain',
                    borderRadius: 26,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'black',
                  }}>
                  Dave
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 10,
                    color: 'black',
                  }}>
                  Pamulang, Kota Tanggerang Selatan
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', marginTop: 10}}>
              <Rating
                type="star"
                ratingCount={5} //jumlah rating
                imageSize={17}
                onFinishRating={getRating} //get value
                readonly={true}
                startingValue={2.5}
                fractions={1} //untuk desimal
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                Liburan ke Danau Toba
              </Text>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <Text style={{fontSize: 12}}>
                Tempatnya benar-benar indah dan lingkungan asri serta fasilitas
                yang menunjang. Biayanya juga tidak terlalu mahal
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderBottomColor: '#E4E4E4',
                borderBottomWidth: 1,
              }}
            />
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View>
                <Image
                  source={{
                    uri: 'https://blogger.googleusercontent.com/img/a/AVvXsEisUBhb8W_4oOgwJmAGcw_131KKxTtzyX28LkAhuG7-nDSGb3XGeLxrLXEombzEpKKN2GDsPvBPFQmQBUGiO_W0-KQSF-Uz686SJQiCTwiH3zHdv8Dc4WmNzq8prp8c6EGV_QRZBc6hCV-e7mEwzQYx0FdttYEWYboMnwJEmJiDz3nP-V6nTQ9tORHdyA=s16000',
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    marginLeft: 0,
                    // aspectRatio: 2,
                    // resizeMode: 'contain',
                    borderRadius: 26,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'black',
                  }}>
                  Ratna
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 10,
                    color: 'black',
                  }}>
                  Pasar Minggu, Kota Jakarta Selatan
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', marginTop: 10}}>
              <Rating
                type="star"
                ratingCount={5} //jumlah rating
                imageSize={17}
                onFinishRating={getRating} //get value
                readonly={true}
                startingValue={2.5}
                fractions={1} //untuk desimal
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Main Saja</Text>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <Text style={{fontSize: 12}}>
                Tempatnya benar-benar indah dan lingkungan asri serta fasilitas
                yang menunjang. Biayanya juga tidak terlalu mahal
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    justifyContent: 'center',
    // borderWidth: 1,
    marginTop: 30,
    // marginLeft: 30,
  },
  boxJudul: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: 20,
    marginTop: 30,
  },
  textJudul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textButton: {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
  },
  boxButton: {
    width: 151,
    marginBottom: 20,
  },
  buttonLogin: {
    borderRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#246EE9',
    marginTop: 20,
    justifyContent: 'center',
  },
});
export default DetailPariwisata;
