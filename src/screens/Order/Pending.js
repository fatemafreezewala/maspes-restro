import React, {useState, useEffect, useCallback} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';

//demo Data
import orderss from '../../data/orders';
import FlatlistComp from '../../components/FlatListComp';
import OrderCard from '../../components/Orders/OrderCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {api} from '../../constant/api';
import OrderLoading from '../../components/Placeholders/OrderLoading';

const Index = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchPendingOrders();
    }, []),
  );

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      const res = await api.post('/orders', {
        status: '0',
      });
      setLoading(false);
      if (res.data.status === 'success') {
        setOrders(res.data.data);
      }
    } catch (error) {
      setLoading(false);
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

  return (
    <Container>
      <SubContainer>
        {loading && <OrderLoading />}
        <FlatlistComp
          DATA={orders}
          numberOfColumns={false}
          renderItem={renderTables}
        />
      </SubContainer>
    </Container>
  );
};

export default Index;
