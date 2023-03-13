import React from 'react';
import {FlatList, View} from 'react-native';
import {useCartStore} from '../../constant/store';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import Header from '../../components/Header';
import CartTotalComponent from '../../components/Cart/CartTotalComponent';
import ProductCard from '../../components/Cart/ProductCard';

const Cart = ({navigation}) => {
  const [cart, removeItem] = useCartStore(s => [s.cart, s.removeItem]);

  const renderItem = ({item}) => {
    return <ProductCard item={item}></ProductCard>;
  };
  return (
    <Container>
      <Header color="#fff" text={'My Cart'}></Header>
      <SubContainer>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
            },
          ]}>
          <View style={{flex: 3}}>
            <FlatList data={cart} renderItem={renderItem} />
          </View>
          <View style={{flex: 1.3}}>
            <CartTotalComponent
            showButton
              onPress={() =>
                navigation.navigate('Checkout')
              }></CartTotalComponent>
          </View>
        </View>
      </SubContainer>
    </Container>
  );
};

export default Cart;
