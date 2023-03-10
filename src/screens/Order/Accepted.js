import React, {useState, useCallback} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';

//demo Data
// import orders from '../../data/orders';
import FlatlistComp from '../../components/FlatListComp';
import OrderCard from '../../components/Orders/OrderCard';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../constant/api';
import OrderLoading from '../../components/Placeholders/OrderLoading';
import {useFocusEffect} from '@react-navigation/native';

const Accepted = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchAcceptedOrders();
    }, []),
  );

  const fetchAcceptedOrders = async () => {
    try {
      setLoading(true);
      const res = await api.post('/orders', {
        status: '1',
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

export default Accepted;
