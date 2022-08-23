import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Keyboard,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
import Axios from 'axios';
import url from '../../config';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ListPariwisata = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [filterPariwisata, setFilterePariwisata] = useState([]);
  const [filter, setFilter] = useState('');

  const getListPariwisata = async () => {
    setIsLoading(true);
    Axios({
      url: url + `/api/pariwisata/pariwisata/getall?order=name+asc`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(response => {
        console.log(response.data.data[0], 'pariwisata>>>>>>>>>');
        setData(response.data.data);
        setFilterePariwisata(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    // console.log(item.wilayah[0].nama);
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item.id);
          navigation.navigate('DetailPariwisata', {idPariwisata: item.id});
        }}
        style={styles.boxKonten}>
        <View style={styles.boxIconRight}>
          {item.image ? (
            <Image
              style={{width: 130, height: 110, borderRadius: 10}}
              source={{
                uri: item.image,
              }}
            />
          ) : (
            <Image
              style={{width: 130, height: 110, borderRadius: 10}}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg',
              }}
            />
          )}
        </View>
        <View style={styles.boxText}>
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.name}</Text>
          </View>

          <View
            style={{
              alignItems: 'flex-start',
              marginVertical: 5,
              flexDirection: 'row',
            }}>
            <Rating
              type="star"
              ratingCount={5} //jumlah rating
              imageSize={15}
              // onFinishRating={getRating} //get value
              readonly={true}
              startingValue={item.total_rating}
              fractions={1} //untuk desimal
            />
            <Text style={{fontSize: 10, color: 'grey', marginLeft: 5}}>
              {item.total_ulasan} Reviews
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>Daerah {item.wilayah[0].nama}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  function getRating(rating) {
    console.log(rating);
  }

  useEffect(() => {
    getListPariwisata();
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setFilterePariwisata(
        data.filter(x =>
          x.wilayah[0].nama.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }
  }, [filter]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#274799',
          }}>
          <View style={styles.header}>
            <View style={styles.arrow}>
              <FontAwesomeIcon
                size={30}
                icon={faArrowLeft}
                color="#fff"
                onPress={() => {
                  navigation.navigate('NavigationBottom');
                }}
              />
            </View>
            <View style={styles.boxJudul}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Pariwisata
              </Text>
            </View>
          </View>
          <View style={styles.boxIsi}>
            <Text style={{color: 'white', textAlign: 'justify'}}>
              Layanan Pekerjaan Umum adalah layanan masyarakat Reference site
              about Lorem Ipsum, giving information on its origins, as well as a
              random Lipsum generator. giving information on its origins, as
              well as a random Lipsum generator. giving information on its
              origins, as well as a random Lipsum generator.
            </Text>
          </View>
          <View style={styles.footer}>
            <View style={[styles.boxInput, {flexDirection: 'row'}]}>
              <TextInput
                style={[styles.textInput, {fontSize: 12, height: 40, flex: 5}]}
                onChangeText={val => {
                  setFilter(val);
                }}
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
            {isLoading ? (
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <ActivityIndicator size={'small'} />
              </View>
            ) : filterPariwisata.length !== 0 ? (
              <FlatList
                data={filterPariwisata}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                // ListFooterComponent={renderFooter}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0}
              />
            ) : (
              <>
                <View style={{alignItems: 'center', marginTop: 30}}>
                  <Text>Data tidak ditemukan</Text>
                </View>
              </>
            )}

            {/* <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 20,
                marginRight: 10,
                paddingBottom: 30,
              }}> */}
            {/* <TouchableOpacity
                onPress={() => {
                  console.log('test');
                  navigation.navigate('DetailPariwisata');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 120, height: 100, borderRadius: 10}}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg',
                    }}
                  />
                </View>
                <View style={styles.boxText}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Danau Toba
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'flex-start',
                      marginVertical: 5,
                      flexDirection: 'row',
                    }}>
                    <Rating
                      type="star"
                      ratingCount={5} //jumlah rating
                      imageSize={15}
                      onFinishRating={getRating} //get value
                      readonly={true}
                      startingValue={2.5}
                      fractions={1} //untuk desimal
                    />
                    <Text style={{fontSize: 10, color: 'grey', marginLeft: 5}}>
                      255 Reviews
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12}}>
                      Daerah Provinsi Sumatra Utara
                    </Text>
                  </View>
                </View>
              </TouchableOpacity> */}
            {/* </ScrollView> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const primaryColor = 'rgb(242, 69, 53)';
const disabledPrimaryColor = 'rgb(204, 88, 78)';
const styles = {
  header: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: hp('5%'),
  },
  arrow: {
    // borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 30,
  },
  boxJudul: {
    width: '80%',
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: 20,
    paddingRight: 10,
  },
  boxIsi: {
    // borderWidth: 1,
    marginTop: hp('3%'),
    marginLeft: 30,
    margin: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: hp('5%'),
    backgroundColor: '#F2F2F2',
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    // borderWidth: 1,
    // marginRight: 40,
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  boxIconRight: {
    // borderWidth: 1,
    width: 150,
    // margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    height: '100%',
    width: '60%',
  },
  boxInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
};

export default ListPariwisata;
