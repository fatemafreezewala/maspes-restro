import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';

//demo Data
// import users from '../../data/users';
import FlatlistComp from '../../components/FlatListComp';
import UserCard from '../../components/User/UserCard';
import Fab from '../../components/Fab';
import {api} from '../../constant/api';
import OrderLoading from '../../components/Placeholders/OrderLoading';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/1');
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setUsers(res.data.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const renderUsers = ({item}) => (
    <UserCard item={item} fetchUsers={fetchUsers} />
  );
  return (
    <Container>
      <Header text="Managers/Rps" color={colors.white} />
      <SubContainer>
        <SearchBar placeholder={'Search Users'} onChangeText={setTerm} />
        {loading && <OrderLoading />}
        <FlatlistComp
          DATA={users.filter(item =>
            item.admin_name.toLowerCase()?.includes(term.toLowerCase()),
          )}
          numberOfColumns={false}
          renderItem={renderUsers}
        />
        <Fab />
      </SubContainer>
    </Container>
  );
};

export default Index;

const styles = StyleSheet.create({});
