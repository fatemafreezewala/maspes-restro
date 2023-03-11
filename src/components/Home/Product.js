import {
  Image,
  Pressable,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import globalStyle from '../../styles/globalStyle';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import margins from '../../utilities/margins';
import currency from '../../utilities/currency';
import {api, imageUrl} from '../../constant/api';
import toast from '../../utilities/toast';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import ProductDetail from './ProductDetail';
import FastImage from 'react-native-fast-image';
import {useCartStore} from '../../constant/store';

const Product = ({item, onPress, fetchProducts, categoryId}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [addToCart, isInCart, removeItem, cart] = useCartStore(state => [
    state.addToCart,
    state.isInCart,
    state.removeItem,
    state.cart,
  ]);
  const [added, setAdded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkIsInCart();
    }, [cart]),
  );

  const checkIsInCart = () => {
    const res = isInCart(item.prod_id);
    setAdded(res);
  };

  const addIcon = `
  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.776 2.384H3.072V4.112H2.392V2.384H0.696V1.768H2.392V0.0319996H3.072V1.768H4.776V2.384Z" fill=${colors.primary}/>
  </svg>
  `;
  const heart = `
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.0711 9.14213L11.4142 14.799C10.6332 15.58 9.36685 15.58 8.5858 14.799L2.92894 9.14213C0.976322 7.18951 0.976322 4.02369 2.92894 2.07106C4.88157 0.118443 8.04739 0.118443 10 2.07106C11.9526 0.118443 15.1185 0.118443 17.0711 2.07106C19.0237 4.02369 19.0237 7.18951 17.0711 9.14213Z" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[
          {
            width: '48%',
            minHeight: 180,
            marginLeft: '2%',
            borderWidth: 1,
            borderColor: colors.borderColor,
            marginTop: margins.m5,
            borderRadius: 10,
          },
        ]}>
        <FastImage
          style={[
            globalStyle.w100,
            {height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10},
          ]}
          source={{uri: `${imageUrl}/${item.prod_name_image}`}}
        />
        <View
          style={[
            globalStyle.row,
            {justifyContent: 'space-between', alignItems: 'center'},
          ]}>
          <TextComp
            style={[{marginTop: margins.m10, marginHorizontal: '5%'}]}
            type="medium"
            text={item.prod_name_en}
            fontSize={11}
            color={colors.black}
          />
          <SvgXml xml={heart} />
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginVertical: '5%',
            },
          ]}>
          <View style={styles.row}>
            <TextComp fontSize={12} color={colors.primary} text={currency} />
            <TextComp
              type="medium"
              fontSize={12}
              color={colors.black}
              text={item.prod_offer_price}
            />
          </View>

          {added ? (
            <TouchableOpacity
              onPress={() => {
                removeItem(item.prod_id);
                checkIsInCart();
              }}>
              <TextComp text="remove" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addToCart(item);
                checkIsInCart();
              }}>
              <TextComp
                // style={{marginTop: 5}}
                fontSize={10}
                color={colors.primary}
                text="Add"
              />
              <SvgXml
                // style={{position: 'absolute', right: 0, top: 5}}
                width={15}
                height={10}
                xml={addIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
      <ProductDetail
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        id={item.prod_id}
      />
    </>
  );
};

export default Product;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  addButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
