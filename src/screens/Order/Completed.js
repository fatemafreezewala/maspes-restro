import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import OrderLoading from '../../components/Placeholders/OrderLoading';

//demo Data
// import orders from '../../data/orders';
import FlatlistComp from '../../components/FlatListComp';
import OrderCard from '../../components/Orders/OrderCard';
import SortingPill from '../../components/Orders/SortingPill';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {api} from '../../constant/api';

const Completed = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchCompletedOrders();
    }, []),
  );

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const res = await api.post('/orders', {
        status: '2',
      });
      setLoading(false);
      if (res.data.status === 'success') {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTables = ({item}) => (
    <OrderCard
      onPress={() =>
        navigation.navigate('OrderDetails', {
          data: item,
        })
      }
      item={item}
    />
  );
  const unique = [...new Set(orders.map(item => item.o_ratings))]; // [ 'A', 'B']
  console.log(unique);
  return (
    <Container>
      <SubContainer>
        {loading && <OrderLoading />}
        <View style={{flexDirection: 'row', overflow: 'scroll'}}>
          {unique.map((res, i) => (
            <SortingPill
              key={i}
              style={{padding: 4, minWidth: 100}}
              star={res}
            />
          ))}
        </View>
        <FlatlistComp
          DATA={orders}
          numberOfColumns={false}
          renderItem={renderTables}
        />
      </SubContainer>
    </Container>
  );
};

export default Completed;
