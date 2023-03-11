import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCartStore} from '../../constant/store';

const Cart = () => {
  const [cart, removeItem] = useCartStore(s => [s.cart, s.removeItem]);

  const renderItem = ({item}) => {
    return (
      <View style={{margin: 20}}>
        <Text style={{color: '#000'}}>{item.prod_name_en}</Text>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            removeItem(item.prod_id);
          }}>
          <Text style={{color: 'red'}}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList data={cart} renderItem={renderItem} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
