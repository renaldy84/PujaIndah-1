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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ListPariwisata = ({navigation}) => {
  function getRating(rating) {
    console.log(rating);
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0323C4',
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
            <Text style={{color: 'white', textAlign: 'left'}}>
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
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 20,
                marginRight: 10,
                paddingBottom: 30,
              }}>
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
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
              </TouchableOpacity>
            </ScrollView>
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
    // flex: 1,
    flexDirection: 'row',
    width: screenWidth,
  },
  arrow: {
    // borderWidth: 1,
    marginTop: 50,
    marginLeft: 30,
  },
  boxJudul: {
    // borderWidth: 1,
    marginTop: 50,
    paddingLeft: 30,
  },
  boxIsi: {
    // borderWidth: 1,
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
    paddingTop: 30,
    backgroundColor: '#F2F2F2',
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    // borderWidth: 1,
    marginRight: 40,
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
    margin: 10,
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
