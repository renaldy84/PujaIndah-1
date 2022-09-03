import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import url from '../config';

export const SLIDER_WIDTH = wp('100%');
export const ITEM_WIDTH = wp('85%');

const CarouselHeader = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const isCarousel = useRef(null);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await Linking.openURL(item.link_url);
        }}
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.image_url}}
          style={{
            resizeMode: 'stretch',
            width: '100%',
            height: 150,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
    );
  };

  const getBanner = () => {
    Axios({
      url: url + `/banners`,
      method: 'get',
    })
      .then(response => {
        console.log('data>>>', response.data.data);
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <View style={{marginVertical: 10}}>
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        // hasParallaxImages={true}
        autoplay={true}
        loop={true}
      />
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#F4BB41',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'black',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
      <Pagination
        carouselRef={isCarousel}
        dotsLength={data.length}
        activeDotIndex={index}
        // containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          marginHorizontal: 0,
          backgroundColor: '#063A69',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          // Define styles for inactive dots
          backgroundColor: 'grey',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CarouselHeader;
