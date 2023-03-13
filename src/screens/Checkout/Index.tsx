import React from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import {View, ScrollView, TextInput, Pressable} from 'react-native';
//demo Data
import OrderCard from '../../components/Orders/OrderCard';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import TextComp from '../../components/TextComp';
import {SvgXml} from 'react-native-svg';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
import CartTotalComponent from '../../components/Cart/CartTotalComponent';
import Button from '../../components/Button';
import {useCartStore} from '../../constant/store';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import Address from '../../components/Checkout/Address';

const OrderDetails = ({navigation}: any) => {
  const [height, setHeight] = React.useState(undefined);
  const [cart, removeItem] = useCartStore(s => [s.cart, s.removeItem]);
  const [method, setMethod] = React.useState('1');
  const [address, setAddress] = React.useState('1');
  return (
    <Container>
      <Header showBack text="Order Details" color={colors.white}></Header>
      <SubContainer>
        <ScrollView
          style={{flex: 1, flexDirection: 'column'}}
          showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={{flex: 3}}>
            <Address navigation={navigation}></Address>
            {/* Food Items */}
            <TextComp
              text="Order Summary"
              type="medium"
              fontSize={16}
              style={{marginTop: margins.m5}}
              color={colors.black}></TextComp>
            <OrderCard
              showStatus={false}
              onPress={() => {}}
              showUser={false}
              item={{items: cart}}></OrderCard>
            {/* Payment */}
            <PaymentMethod
              method={method}
              setMethod={setMethod}></PaymentMethod>
            <TextComp
              text="Instructions"
              type="medium"
              fontSize={16}
              style={{marginVertical: margins.m5}}
              color={colors.black}></TextComp>
            <TextInput
              multiline
              placeholder="Order Notes ..."
              onContentSizeChange={(event: any) => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              placeholderTextColor={colors.black}
              style={{
                // height, // <- set the max height here
                minHeight: 120,
                backgroundColor: colors.inactiveColor,
                marginBottom: margins.m3,
                borderRadius: 15,
                color: '#000',
              }}
            />
          </View>
          <View style={{flex: 1.3}}>
            <CartTotalComponent></CartTotalComponent>
          </View>
        </ScrollView>
        <Button
          width="60%"
          style={{alignSelf: 'center'}}
          text="Place Order"
          onPress={() => {}}></Button>
      </SubContainer>
    </Container>
  );
};

export default OrderDetails;
