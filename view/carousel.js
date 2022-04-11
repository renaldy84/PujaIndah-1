import React, {useState, useRef} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const data = [
  {
    id: 1,
    url: 'https://previews.123rf.com/images/ammit/ammit2005/ammit200500200/147598154-tungurahua-volcano-view-from-the-same-level-as-the-erupting-point-small-amount-of-noise-may-be-visib.jpg',
  },
  {
    id: 2,
    url: 'https://previews.123rf.com/images/tamara1k/tamara1k1904/tamara1k190400158/120290893-gran-canaria-marzo-paisajes-de-reserva-natural-estricta-inagua-%C3%A1reas-reforestadas.jpg',
  },
  {
    id: 3,
    url: 'https://previews.123rf.com/images/tamara1k/tamara1k1904/tamara1k190400049/120290494-gran-canaria-march-landscapes-of-strict-nature-reserve-inagua-canarian-pine-trees.jpg',
  },
  {
    id: 4,
    url: 'https://previews.123rf.com/images/tamara1k/tamara1k1905/tamara1k190500559/122983009-gran-canaria-pilancones-natural-park-reforested-slopes-canary-pine.jpg',
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
          // aspectRatio: 2,
          // resizeMode: 'contain',
          borderRadius: 15,
        }}
      />
      {/* <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text> */}
    </View>
  );
};

export const SLIDER_WIDTH = wp('100%');
export const ITEM_WIDTH = wp('85%');
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
