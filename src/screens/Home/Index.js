import React, {useState, useCallback} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';
import {Image, ScrollView} from 'react-native';
//demo Data
// import categories from '../../data/categories';
import FlatlistComp from '../../components/FlatListComp';
import MiniCategories from '../../components/Home/MiniCategories';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';
import Header from '../../components/Home/Header';
import Product from '../../components/Home/Product';
import HomeHeader from '../../components/Home/HomeHeader';
const Index = ({navigation, onChangeText}) => {
  const [loading, setLoading] = useState(false);
  const [homedata, setHomeData] = useState({
    banner: [],
    categories: [],
    popular_product: [],
  });
  const [term, setTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, []),
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.post('/home', {user_id: '1'});
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setHomeData(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderProducts = ({item}) => (
    <Product
      onPress={() => {
        console.log('category', item);
        navigation.navigate('Products', {
          category: item,
        });
      }}
      item={item}
      fetchCategories={fetchCategories}
    />
  );
  const renderCategories = ({item}) => (
    <Product
      onPress={() => {
        console.log('category', item);
        navigation.navigate('Products', {
          category: item,
        });
      }}
      item={item}
      fetchCategories={fetchCategories}
    />
  );
  return (
    <Container>
      <SubContainer>
        <HomeHeader></HomeHeader>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/home/home.jpg')}></Image>
          <SearchBar placeholder="Search Category" onChangeText={setTerm} />
          {loading && <CategoryLoading />}
          <Header navigation={navigation} title={'Categories'} page={'Category'}></Header>

          <Header navigation={navigation} title={'Famous Products'}></Header>
          <FlatlistComp
            DATA={
              homedata.popular_product &&
              homedata.popular_product.filter(item =>
                item.prod_name_sp.toLowerCase()?.includes(term.toLowerCase()),
              )
            }
            numColumns={2}
            renderItem={renderProducts}
          />
        </ScrollView>
      </SubContainer>
    </Container>
  );
};

export default Index;
