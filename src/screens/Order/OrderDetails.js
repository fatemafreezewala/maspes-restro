import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import {View, Image, ScrollView} from 'react-native';
//demo Data
import orders from '../../data/orders';
import OrderCard from '../../components/Orders/OrderCard';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import TextComp from '../../components/TextComp';
import {SvgXml} from 'react-native-svg';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
import {api} from '../../constant/api';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import toast from '../../utilities/toast';

const OrderDetails = ({route, navigation}) => {
  const {data} = route.params;

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/' + data.order_id);
      setLoading(false);
      if (res.data.status === 'success') {
        setDetails(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeOrderStatus = async status => {
    try {
      setLoading(true);
      const res = await api.post('/ordersstatus/' + data.order_id, {
        status: status,
      });
      setLoading(false);
      if (res.data.status === 'success') {
        navigation.goBack();
        toast('Order marked as accepted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cash = `
  <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="path-1-inside-1_360_3573" fill="white">
  <rect x="3" width="22" height="13" rx="1"/>
  </mask>
  <rect x="3" width="22" height="13" rx="1" fill="white" stroke=${colors.primary} stroke-width="3" mask="url(#path-1-inside-1_360_3573)"/>
  <mask id="path-2-inside-2_360_3573" fill="white">
  <rect y="3" width="22" height="13" rx="1"/>
  </mask>
  <rect y="3" width="22" height="13" rx="1" fill="white" stroke=${colors.primary} stroke-width="3" mask="url(#path-2-inside-2_360_3573)"/>
  <circle cx="10.5" cy="9.5" r="4.5" fill=${colors.primary}/>
  <path d="M11.835 9.995C11.835 10.1683 11.79 10.3317 11.7 10.485C11.6133 10.635 11.4833 10.76 11.31 10.86C11.14 10.9567 10.9383 11.0133 10.705 11.03V11.435H10.385V11.025C10.0517 10.995 9.78333 10.895 9.58 10.725C9.37667 10.5517 9.27167 10.3183 9.265 10.025H10.015C10.035 10.265 10.1583 10.41 10.385 10.46V9.505C10.145 9.445 9.95167 9.385 9.805 9.325C9.65833 9.265 9.53167 9.16833 9.425 9.035C9.31833 8.90167 9.265 8.72 9.265 8.49C9.265 8.2 9.36833 7.96333 9.575 7.78C9.785 7.59667 10.055 7.49167 10.385 7.465V7.06H10.705V7.465C11.025 7.49167 11.28 7.58833 11.47 7.755C11.6633 7.92167 11.7717 8.15167 11.795 8.445H11.04C11.03 8.34833 10.995 8.265 10.935 8.195C10.8783 8.12167 10.8017 8.07 10.705 8.04V8.985C10.955 9.04833 11.1517 9.11 11.295 9.17C11.4417 9.22667 11.5683 9.32167 11.675 9.455C11.7817 9.585 11.835 9.765 11.835 9.995ZM9.995 8.455C9.995 8.565 10.0283 8.655 10.095 8.725C10.1617 8.79167 10.2583 8.84667 10.385 8.89V8.025C10.265 8.04167 10.17 8.08667 10.1 8.16C10.03 8.23333 9.995 8.33167 9.995 8.455ZM10.705 10.47C10.8317 10.4467 10.93 10.395 11 10.315C11.0733 10.235 11.11 10.1383 11.11 10.025C11.11 9.915 11.075 9.82667 11.005 9.76C10.935 9.69333 10.835 9.63833 10.705 9.595V10.47Z" fill="#FDD161"/>
  </svg>
  `;
  const location = `
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="19.5" cy="19.5" r="19.5" fill="#FDD161"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4778 20.1808L17.0664 26.3965C18.148 28.2699 20.8521 28.2699 21.9337 26.3965L25.5223 20.1808C28.1989 15.5449 24.8532 9.74997 19.5001 9.74997C14.1469 9.74997 10.8012 15.5449 13.4778 20.1808ZM19.5933 18.8533C20.8502 18.8533 21.8691 17.8344 21.8691 16.5775C21.8691 15.3206 20.8502 14.3016 19.5933 14.3016C18.3364 14.3016 17.3174 15.3206 17.3174 16.5775C17.3174 17.8344 18.3364 18.8533 19.5933 18.8533Z" fill="white"/>
  </svg>
  `;
  return (
    <Container>
      <Header text="Order Details" color={colors.white} showBack />
      <Spinner visible={loading} cancelable={false} />
      <SubContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <TextComp
            text="User Info"
            type="medium"
            fontSize={16}
            style={{marginVertical: margins.m5}}
            color={colors.black}
          />
          <View style={globalStyle.row}>
            <Image
              source={require('../../assets/images/demo/user/User-40.jpg')}
            />
            <View style={{marginLeft: margins.m5}}>
              <TextComp
                type="medium"
                color={colors.black}
                text={data.user_name}
              />
              <TextComp color={colors.black} text={data.user_phone} />
            </View>
          </View>
          <View
            style={[
              globalStyle.boxborder,
              globalStyle.row,
              {padding: margins.m5, marginTop: margins.m5},
            ]}>
            <SvgXml xml={location} />
            <View style={{marginLeft: margins.m5}}>
              <TextComp
                type="medium"
                color={colors.black}
                text={data.user_name}
              />
              <TextComp color={colors.black} text={data.user_phone} />
            </View>
          </View>
          {/* Food Items */}
          <TextComp
            text="Food Item"
            type="medium"
            fontSize={16}
            style={{marginTop: margins.m5}}
            color={colors.black}
          />
          <OrderCard showUser={false} item={details} showSubItems={true} />
          {/* Payment */}
          <TextComp
            text="Payment Methods"
            type="medium"
            fontSize={16}
            style={{marginVertical: margins.m5}}
            color={colors.black}
          />
          <View
            style={[
              globalStyle.boxborder,
              globalStyle.rowSpace,
              {padding: margins.m5},
            ]}>
            {data.o_payment_method === '1' && (
              <TextComp
                text="Cash on delivery"
                type="medium"
                fontSize={16}
                color={colors.black}
              />
            )}
            {data.o_payment_method === '2' && (
              <TextComp
                text="Online"
                type="medium"
                fontSize={16}
                color={colors.black}
              />
            )}
             {data.o_payment_method === '3' && (
              <TextComp
                text="Wallet"
                type="medium"
                fontSize={16}
                color={colors.black}
              />
            )}
            <SvgXml xml={cash} />
          </View>

          <View style={{marginTop: 20}}>
            {details?.o_status === '0' && (
              <Button
                text="Mark As Accepted"
                onPress={() => changeOrderStatus('1')}
              />
            )}

            {details?.o_status === '1' && (
              <Button
                text="Mark As Completed"
                onPress={() => changeOrderStatus('2')}
              />
            )}
          </View>
        </ScrollView>
      </SubContainer>
    </Container>
  );
};

export default OrderDetails;
