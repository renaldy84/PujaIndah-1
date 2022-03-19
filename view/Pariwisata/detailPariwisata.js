import React, {useState, useRef} from 'react';
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
import {faArrowLeft, faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import CarouselPariwisata from './carouselPariwisata';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import TopTabView from './topTabView';

function DetailPariwisata({navigation}) {
  return (
    <>
      <View
        style={{
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
                navigation.navigate('ListPariwisata');
              }}
            />
          </View>
          <View style={styles.boxJudul}>
            <Text style={styles.textJudul}>Danau Toba</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 20}}>
          <CarouselPariwisata />
          <View>
            <YouTube
              apiKey="AIzaSyCUg9RmmGIwEMMA9b1yKeyKNDk8yib62ys"
              videoId="Za2zEoGcfmU" // The YouTube video ID
              play={false} // control playback of video with true/false
              fullscreen={false} // control whether the video should play in fullscreen or inline
              loop // control whether the video should loop when ended
              // onReady={e => this.setState({ isReady: true })}
              // onChangeState={e => this.setState({ status: e.state })}
              // onChangeQuality={e => this.setState({ quality: e.quality })}
              // onError={e => this.setState({ error: e.error })}
              style={{alignSelf: 'stretch', height: 200}}
            />
          </View>

          {/* <Video
            control={true}
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            style={{
              width: '90%',
              height: 200,
              marginLeft: 20,
              marginRight: 40,
            }}
          /> */}
          <TopTabView />
          <View
            style={{
              marginTop: 15,
              borderBottomColor: '#e0e0e0',
              borderBottomWidth: 2,
            }}
          />
          <View style={styles.boxButton}>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => {}}>
              <Text style={styles.textButton}>Tulis ulasan anda</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    // borderWidth: 1,
    marginTop: 30,
    marginLeft: 30,
  },
  boxJudul: {
    // borderWidth: 1,
    marginLeft: 30,
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
