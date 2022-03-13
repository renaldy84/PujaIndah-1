import React, {useState, useRef} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const data = [
  {
    id: 1,
    name: 'React JS',
    url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
  },
  {
    id: 2,
    name: 'JavaScript',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
  },
  {
    id: 3,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image source={{uri: item.url}} style={{width: 100, height: 100}} />
      <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text>
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
      {/* <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      /> */}
      <Carousel
        // layout={'default'}
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        hasParallaxImages={true}
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
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        tappableDots={true}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CarouselHeader;
