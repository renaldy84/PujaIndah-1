import React, {useState, useRef} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const data = [
  {
    id: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg',
  },
  {
    id: 2,
    url: 'https://www.adira.co.id/sahabatlokal/img/frontend/news/danautobapng.png',
  },
  {
    id: 3,
    url: 'https://img.beritasatu.com/cache/beritasatu/600x350-2/1518092128.jpg',
  },
  {
    id: 4,
    url: 'https://jid.storage.googleapis.com/wp-content/uploads/2021/12/14134239/danau-toba.jpg',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        // padding: 20,
        marginTop: 20,
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.url}}
        style={{
          width: wp('100%'),
          height: 200,
          // aspectRatio: 2,
          //   resizeMode: 'contain',
        }}
      />
      {/* <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text> */}
    </View>
  );
};

export const SLIDER_WIDTH = wp('100%');
export const ITEM_WIDTH = wp('100%');
const carauselPariwisata = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View>
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

export default carauselPariwisata;
