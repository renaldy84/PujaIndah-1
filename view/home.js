import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

function home({navigation}) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({type: 'LOGOUT'});
  };

  const Data = [
    {
      id: 1,
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: 2,
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: 3,
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      id: 4,
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      id: 5,
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
      id: 6,
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/lceHsT6l.jpg',
    },
  ];

  const DATA = [{text: '#1'}, {text: '#2'}, {text: '#3'}];

  return (
    <>
      <View style={styles.containerHeader}>
        <SafeAreaView style={styles.child1}>
          <View
            style={{
              borderWidth: 1,
              width: '50%',
              flexDirection: 'row',
              height: '100%',
            }}>
            <Text>
              asbdhjasbdhasbdhasdbjsahdjashgdjsahdgajshdgashgdhjasgdjahsgd
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: '50%',
              flexDirection: 'row',
              height: '100%',
            }}>
            <Text>
              asjdhgjasbdkjashdkjasdjkasndkjas xjansbcjkasjdbasj
              cjkabsdjasndkjas kajs
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* <View style={styles.container}>
        <Carousel
          pagination={Pagination}
          renderItem={DATA.map(item => console.log(item))}
          data={DATA}
        />
      </View> */}
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
            borderRadius: 10,
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
                color: 'white',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View>
      </ImageBackground> */}
    </>
  );
}

const styles = {
  containerHeader: {
    backgroundColor: '#0323C4',
    height: '20%',
  },
  child1: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    // height: 50,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbf3fa',
  },
};
export default home;
