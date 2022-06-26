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
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DashboardSosial = ({navigation}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#2F80ED',
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
              <Text style={{color: 'white', fontSize: 18, fontWeight:'bold'}}>
                Sosial
              </Text>
            </View>

          </View>
          <View style={styles.boxIsi}>
            <Text style={{color: 'white', textAlign: 'justify'}}>
            Layanan Sosial adalah layanan masyarakat Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. giving information on its origins, as well as a random Lipsum generator. giving information on its origins, as well as a random Lipsum generator.
            </Text>
          </View>
          
          <ScrollView style={styles.footer}>
            <View style={{margin: 20}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DataLKS');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/image/iconSosial/lks.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 16}}>Data LKS</Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="caret-right" size={35} color="#0323C4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DataBansos');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/image/iconSosial/bansos.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 16}}>Bansosmas </Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="caret-right" size={35} color="#0323C4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AksiSosial');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/image/iconSosial/aksisosial.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 16}}>Aksi Sosial</Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="caret-right" size={35} color="#0323C4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DataPMKS');
                }}
                style={styles.boxKonten}>
                <View style={styles.boxIconRight}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/image/iconSosial/pmks.png')}
                  />
                </View>
                <View style={styles.boxText}>
                  <Text style={{fontSize: 16}}>PMKS</Text>
                </View>
                <View style={styles.boxIconLeft}>
                  <FontAwesome name="caret-right" size={35} color="#0323C4" />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F2F2F2',
  },
  boxKonten: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    // borderWidth: 1,
    marginRight: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  boxIconRight: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    // borderWidth: 1,
    justifyContent: 'center',
    height: '100%',
    width: '60%',
  },
  boxIconLeft: {
    // borderWidth: 1,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DashboardSosial;
