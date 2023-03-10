import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const wd = Dimensions.get('screen').width - 60;

const CategoryLoading = () => {
  return (
    <View style={{marginTop: 10}}>
      {[1, 2, 3, 4, 5, 6, 7].map((item, i) => {
        return (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SkeletonPlaceholder borderRadius={10}>
              <View style={{height: 150, width: wd / 2, marginBottom: 20}} />
              <View style={{height: 20, width: wd / 2, marginBottom: 20}} />
            </SkeletonPlaceholder>
            <View style={{margin: 10}} />
            <SkeletonPlaceholder borderRadius={10}>
              <View style={{height: 150, width: wd / 2, marginBottom: 20}} />
              <View style={{height: 20, width: wd / 2, marginBottom: 20}} />
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </View>
  );
};

export default CategoryLoading;

const styles = StyleSheet.create({});
