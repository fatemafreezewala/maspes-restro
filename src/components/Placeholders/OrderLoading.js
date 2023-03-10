import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderLoading = () => {
  return (
    <View>
      {[1, 2, 3, 4, 5, 6, 7].map(item => {
        return (
          <View
            key={item}
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'lightgray',
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
            }}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item width={120} height={20} />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </View>
  );
};

export default OrderLoading;

const styles = StyleSheet.create({});
