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
  const {category} = route.params;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const fetchProducts = async () => {
    console.log('fetchProducts called');
    try {
      setLoading(true);
      const res = await api.post('/product/' + category.category_id);
      // console.log(res.data.data);
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setProducts(res.data.data);
          console.log('fetchProducts', res.data.data.length);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderProduct = ({item}) => (
    <Product
      fetchProducts={fetchProducts}
      onPress={() => {}}
      item={item}
      categoryId={category.category_id}
    />
  );

  return (
    <Container>
      <Header text="Product" color={colors.white} showBack />
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
        <Fab
          onPress={() =>
            navigation.navigate('AddProduct', {
              isEdit: false,
              categoryId: category.category_id,
            })
          }
        />
      </SubContainer>
    </Container>
  );
};

export default Index;
