import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';

//demo Data
// import tables from '../../data/tables';
import FlatlistComp from '../../components/FlatListComp';
import Fab from '../../components/Fab';
import TableCard from '../../components/Table/TableCard';
import {api} from '../../constant/api';
import OrderLoading from '../../components/Placeholders/OrderLoading';
import dayjs from 'dayjs';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchPendingTables();
  }, []);

  const fetchPendingTables = async () => {
    try {
      setLoading(true);
      const res = await api.post('/tables', {
        table_restro_id: '1',
        table_status: '0',
        table_date: dayjs().format('DD-MM-YYYY'),
        today: true,
      });
      setLoading(false);
      if (res.data.status === 'success') {
        setTables(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTables = ({item}) => <TableCard item={item} />;

  return (
    <Container>
      <SubContainer>
        <SearchBar placeholder="Search.." />
        {loading && <OrderLoading />}
        <FlatlistComp
          DATA={tables}
          numberOfColumns={false}
          renderItem={renderTables}
        />
        <Fab icon="qrcode" />
      </SubContainer>
    </Container>
  );
};

export default Index;
