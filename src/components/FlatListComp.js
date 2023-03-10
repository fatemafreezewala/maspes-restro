import {FlatList} from 'react-native';
import React from 'react';

const FlatlistComp = ({
  DATA,
  renderItem,
  style,
  numberOfColumns = false,
  numColumns,
}) => {
  return numberOfColumns ? (
    <FlatList
      style={style}
      showsVerticalScrollIndicator={false}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, i) => i.toString()}
      contentContainerStyle={{paddingBottom: 30}}
    />
  ) : (
    <FlatList
      numColumns={numColumns}
      style={style}
      showsVerticalScrollIndicator={false}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, i) => i.toString()}
      contentContainerStyle={{paddingBottom: 30}}
    />
  );
};

export default FlatlistComp;
