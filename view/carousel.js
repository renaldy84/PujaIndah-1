import React, {useState, useRef} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const data = [
  {
    id: 1,
    url: 'https://www.payfazz.com/wp-content/uploads/2019/09/BLOG_PAYFAZZ_agenpayfazz.jpg',
  },
  {
    id: 2,
    url: 'https://www.payfazz.com/wp-content/uploads/2016/01/BLOG_PAYFAZZ_promopayfazz.jpg',
  },
  {
    id: 3,
    url: 'https://www.payfazz.com/wp-content/uploads/2021/06/BLOG_2021_PAYFAZZ_press.jpg',
  },
  {
    id: 4,
    url: 'https://www.payfazz.com/wp-content/uploads/2020/06/BLOG-Akun-Resmi-Revisi.jpg',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        // padding: 20,

        alignItems: 'center',
        // backgroundColor: 'white',
      }}>
      <Image
        source={{uri: item.url}}
        style={{
          width: '100%',
          height: 175,
          aspectRatio: 2,
          resizeMode: 'contain',
          borderRadius: 20,
        }}
      />
      {/* <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text> */}
    </View>
  );
};

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const CarouselHeader = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
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
