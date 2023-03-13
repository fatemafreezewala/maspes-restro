import Carousel,{ Pagination } from 'react-native-snap-carousel';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import FastImage from 'react-native-fast-image';
import {imageUrl} from '../../constant/api';
import colors from '../../utilities/colors';

const Banner = ({banners}) => {
const [activeSlide, setactiveSlide] = React.useState(0)
  const _carousel = useRef(null);
  const horizontalMargin = 20;
  const slideWidth = 280;

  const sliderWidth = Dimensions.get('window').width ;
  const itemWidth = slideWidth + horizontalMargin * 2;
  const itemHeight = Dimensions.get('window').height;

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <FastImage
        style={{width:'100%',height:150,borderRadius:15}}
        resizeMode='cover'
          source={{uri: `${imageUrl}/${item.banner_image}`}}></FastImage>
      </View>
    );
  };
  const pagination =()=> {
  
    return (
        <View style={{position: 'absolute',bottom:'-15%',alignSelf:'center'}}>
            <Pagination
          dotsLength={banners.length}
          activeDotIndex={activeSlide}
          dotStyle={{
              width: 20,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.primary
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.primary

          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          
        />
        </View>
    );
}
  return (
    <View style={{height:180}}> 
        <Carousel
      ref={_carousel}
      data={banners}
      renderItem={_renderItem}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={sliderWidth}
      itemHeight={itemHeight}
      onSnapToItem={(index) => {
        setactiveSlide(index)
      }}
    />
    {pagination()}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    marginRight:20
  },
});
