import {FlatList} from 'react-native';
import React from 'react';

const HorizontalFlatlist = ({
  DATA,
  renderItem,
  style,
}) => {
  return  (
    <View style={{marginVertical:30}}>
    <FlatList
      data={DATA}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  </View>
  ) 
};

export default HorizontalFlatlist;
