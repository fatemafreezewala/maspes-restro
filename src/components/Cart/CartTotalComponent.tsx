import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import currency from '../../utilities/currency';
import colors from '../../utilities/colors';
import margins from '../../utilities/margins';
import Button from '../Button';

const CartTotalComponent = () => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: colors.primary,
       
        paddingTop:10
      }}>
      <TextComp color="#000" type="semibold" text="Charges"></TextComp>
      <View style={styles.row}>
        <TextComp
          fontSize={12}
          color="#000"
          type="normal"
          text="Sub Total Charges"></TextComp>
        <TextComp
          fontSize={13}
          color="#000"
          type="semibold"
          text={`${currency} 10`}></TextComp>
      </View>
      <View style={styles.row}>
        <TextComp
          fontSize={12}
          color="#000"
          type="normal"
          text="Delivery Charges"></TextComp>
        <TextComp
          fontSize={13}
          color="#000"
          type="semibold"
          text={`${currency} 10`}></TextComp>
      </View>
      <View style={styles.row}>
        <TextComp
          fontSize={12}
          color="#000"
          type="normal"
          text="Total Charges"></TextComp>
        <TextComp
          fontSize={13}
          color={colors.primary}
          type="semibold"
          text={`${currency} 10`}></TextComp>
      </View>
      <Button style={{width:'60%',alignSelf:'center'}} text='Checkout'></Button>
    </View>
  );
};

export default CartTotalComponent;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
});
