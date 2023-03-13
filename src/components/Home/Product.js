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
import defaultProductIcon from '../../utilities/icons/defaultProductIcon';

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
  const heartchecked = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.071 13.1421L13.4141 18.799C12.6331 19.58 11.3667 19.58 10.5857 18.799L4.92882 13.1421C2.9762 11.1895 2.9762 8.02369 4.92882 6.07106C6.88144 4.11844 10.0473 4.11844 11.9999 6.07106C13.9525 4.11844 17.1183 4.11844 19.071 6.07106C21.0236 8.02369 21.0236 11.1895 19.071 13.1421Z" fill=${colors.primary}/>
</svg>`;
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
            flex: 1,
            flexDirection: 'column',
          },
        ]}>
        <View style={{flex: 3}}>
          {!item.prod_name_image ? (
          //  <View style={{backgroundColor:'#E6E6E6'}}>
          //    <SvgXml height={120}  width={'100%'} xml={defaultProductIcon}></SvgXml>
          //  </View>
          <FastImage resizeMode='cover' style={{
            width: '100%',
            height: 120,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
            
          }} source={require('../../assets/images/home/defaultpro.png')}></FastImage>
          ) : (
            <FastImage
              style={[
                globalStyle.w100,
                {
                  height: 120,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}
              source={{uri: `${imageUrl}/${item.prod_name_image}`}}
            />
          )}
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
            <SvgXml xml={heartchecked} />
          </View>
        </View>
        <View style={{flex: 1.5}}>
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
                style={[styles.addButton, {backgroundColor: colors.primary}]}
                onPress={() => {
                  removeItem(item.prod_id);
                  checkIsInCart();
                }}>
                <TextComp fontSize={10} color={colors.white} text="Remove -" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  addToCart(item);
                  checkIsInCart();
                }}>
                <TextComp fontSize={10} color={colors.primary} text="Add" />
                <SvgXml width={15} height={10} xml={addIcon} />
              </TouchableOpacity>
            )}
          </View>
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
    paddingHorizontal: 10,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
