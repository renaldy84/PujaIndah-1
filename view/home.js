import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

function home({navigation}) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({type: 'LOGOUT'});
  };
  return (
    <>
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
        source={require('../assets/image/menu.png')}>
        <View style={{flex: 1, flexDirection: 'column', margin: 20}}>
          <View style={styles.boxFontHeader}>
            <Text style={styles.fontHeader}>PujaIndah</Text>
          </View>

          <View style={styles.containerBox}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('History')}>
              <Image
                style={styles.icon}
                source={require('../assets/image/history.png')}></Image>
              {/* <Text>Histori</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('Psikiater')}>
              <Image
                style={styles.icon}
                source={require('../assets/image/doctor.png')}></Image>
              {/* <Text>Daftar Psikiater</Text> */}
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <View
              style={{
                backgroundColor: 'red',
                width: 150,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
              }}>
              <TouchableOpacity onPress={() => logout()}>
                <Text
                  style={{
                    fontFamily: 'helvetica-rounded-bold',
                    fontSize: 14,
                    color: '#ffffff',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = {
  boxFontHeader: {
    marginTop: 30,
  },
  fontHeader: {
    fontFamily: 'AmsterdamOne-eZ12l',
    fontSize: 50,
    textAlign: 'center',
    color: '#ffffff',
  },
  containerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
  },
  box: {
    width: 90,
    height: 90,
    margin: 20,
    borderRadius: 90 / 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
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
  icon: {
    width: 50,
    height: 50,
  },
};
export default home;
