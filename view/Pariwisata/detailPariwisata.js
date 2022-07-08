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
  useWindowDimensions,
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
import {WebView} from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

function DetailPariwisata({navigation, route}) {
  const pariwisataId = route.params.idPariwisata;
  const [detail, setDetail] = useState({});
  const [urlVideo, setUrlVideo] = useState('');
  const [rating, setRating] = useState({});
  const [foto, setFoto] = useState(
    'https://www.barantum.com/blog/wp-content/uploads/2019/01/Wisata-Indonesia-Mempunyai-Peluang-Bisnis.jpg',
  );
  const [ulasan, setUlasan] = useState([]);

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
          // console.log(response.data.data);
          setDetail(response.data.data);

          if (response.data.data.foto[0].image !== '') {
            setFoto(response.data.data.foto[0].image);
          }
          if (response.data.data.video.url === null) {
            setUrlVideo('');
          } else {
            setUrlVideo(response.data.data.video.url);
          }
          setRating(response.data.data.rating);
          setUlasan(response.data.data.ulasan);
        } else {
          console.log('Silahkan refresh halaman ini');
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getDetail();
    }, []),
  );
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
            marginBottom: hp('2%'),
            // marginHorizontal: 20,
            height: hp('10%'),
            alignItems: 'center',
            backgroundColor: '#274799',
            // marginTop: hp('5%'),
            // borderWidth: 1,
          }}>
          <View style={styles.arrow}>
            <FontAwesomeIcon
              color="white"
              size={30}
              icon={faArrowLeft}
              onPress={() => {
                navigation.navigate('ListPariwisata');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={[styles.textJudul, {color: 'white'}]}>
              {detail.name}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 20}}>
          {/* <CarouselPariwisata /> */}
          <Image
            style={{width: '100%', height: 200, marginBottom: 20}}
            source={{
              uri: foto,
            }}
          />
          <View>
            {/* <YoutubePlayer
              height={200}
              videoId={urlVideo.split('watch?v=')[1]}
            /> */}
            <WebView
              style={{height: 200, opacity: 0.99}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: `${urlVideo.split('watch?v=').join('embed/')}`}}
            />
          </View>
          <TopTabView item={detail} />

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
                navigation.navigate('UlasanPariwisata', {
                  idPariwisata: pariwisataId,
                });
              }}>
              <Text style={styles.textButton}>Tulis ulasan anda</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View style={{flex: 1}}>
              <View>
                <Text style={{color: '#A9A9A9', fontSize: 14}}>
                  Ulasan ({rating.total_ulasan})
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  {detail.name}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 36, fontWeight: 'bold'}}>
                  {rating.total_rating}
                  <Text style={{fontSize: 14, color: '#B1A0A0'}}>/5</Text>
                </Text>
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Rating
                  type="star"
                  ratingCount={5} //jumlah rating
                  imageSize={17}
                  onFinishRating={getRating} //get value
                  readonly={true}
                  startingValue={rating.total_rating}
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
                      borderWidth: rating.bintangLima === 0 ? 0 : 4,
                      width:
                        rating.bintangLima === 0
                          ? '0%'
                          : `${Math.ceil(
                              (rating.bintangLima / rating.total_ulasan) * 100,
                            )}%`,
                      borderColor: '#274799',
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
                    {rating.bintangLima}
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
                      borderWidth: rating.bintangEmpat === 0 ? 0 : 4,
                      width:
                        rating.bintangEmpat === 0
                          ? '0%'
                          : `${Math.ceil(
                              (rating.bintangEmpat / rating.total_ulasan) * 100,
                            )}%`,
                      borderColor: '#274799',
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
                    {rating.bintangEmpat}
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
                      borderWidth: rating.bintangTiga === 0 ? 0 : 4,
                      width:
                        rating.bintangTiga === 0
                          ? '0%'
                          : `${Math.ceil(
                              (rating.bintangTiga / rating.total_ulasan) * 100,
                            )}%`,
                      borderColor: '#274799',
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
                    {rating.bintangTiga}
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
                      borderWidth: rating.bintangDua === 0 ? 0 : 4,
                      width:
                        rating.bintangDua === 0
                          ? '0%'
                          : `${Math.ceil(
                              (rating.bintangDua / rating.total_ulasan) * 100,
                            )}%`,
                      borderColor: '#274799',
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
                    {rating.bintangDua}
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
                      borderWidth: rating.bintangSatu === 0 ? 0 : 4,
                      width:
                        rating.bintangSatu === 0
                          ? '0%'
                          : `${Math.ceil(
                              (rating.bintangSatu / rating.total_ulasan) * 100,
                            )}%`,
                      borderColor: '#274799',
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
                    {rating.bintangSatu}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {ulasan &&
            ulasan.map((val, index) => {
              return (
                <View key={index}>
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
                          uri: val.profile_pic,
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
                        {val.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          color: 'black',
                        }}>
                        {val.nama_kabkot}, {val.nama_kecamatan}
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
                      startingValue={val.rating}
                      fractions={1} //untuk desimal
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>
                      {val.judul}
                    </Text>
                  </View>
                  <View style={{marginTop: 10, marginBottom: 30}}>
                    <Text style={{fontSize: 12}}>{val.pesan}</Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 30,
    justifyContent: 'center',
    // borderWidth: 1,

    // marginLeft: 30,
  },
  boxJudul: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: 20,
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
    marginBottom: hp('2%'),
  },
  buttonLogin: {
    borderRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#274799',
    marginTop: hp('2%'),
    justifyContent: 'center',
  },
});
export default DetailPariwisata;
