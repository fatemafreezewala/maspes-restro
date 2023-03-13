import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';

//demo Data
import product from '../../data/product';
import FlatlistComp from '../../components/FlatListComp';
import Product from '../../components/Home/Product';
import Fab from '../../components/Fab';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';

const Index = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.post('/product/' + '2');

      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setProducts(res.data.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const renderProduct = ({item}) => (
    <Product
      fetchProducts={fetchProducts}
      onPress={() => {}}
      item={item}
      categoryId={'1'}
    />
  );

  return (
    <Container>
      <Header text="Favourites" color={colors.white} showBack />
      <SubContainer>
        <SearchBar placeholder="Search products" onChangeText={setTerm} />
        {loading && <CategoryLoading />}
        <FlatlistComp
          DATA={products.filter(item =>
            item.prod_name_en.toLowerCase()?.includes(term.toLowerCase()),
          )}
          numColumns={2}
          renderItem={renderProduct}
        />
      </SubContainer>
    </Container>
  );
};

export default Index;
