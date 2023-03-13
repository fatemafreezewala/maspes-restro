import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';

//demo Data
import FlatlistComp from '../../components/FlatListComp';
import Product from '../../components/Home/Product';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';
import TextComp from '../../components/TextComp';
import globalStyle from '../../styles/globalStyle';

const Index = ({navigation, route}) => {
  const {category_id, categories} = route.params;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState(2);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const fetchProducts = async () => {
    console.log(category_id);
    try {
      setLoading(true);
      const res = await api.post('/product/' + category_id);
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
      categoryId={category_id}
    />
  );

  return (
    <Container>
      <Header text="Product" color={colors.white} showBack />
      <SubContainer>
        <SearchBar placeholder="Search products" onChangeText={setTerm} />
        <View style={globalStyle.row}>
          <ScrollView horizontal>
            {categories &&
              categories.map(res => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedCat(res.category_id);
                    }}
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 5,
                      backgroundColor:
                        selectedCat == res.category_id
                          ? colors.primary
                          : colors.inactiveColor,
                      margin: 3,
                      borderRadius: 18,
                    }}>
                    <TextComp
                      color={
                        selectedCat == res.category_id
                          ? colors.white
                          : colors.primary
                      }
                      fontSize={12}
                      text={res.category_name_en}></TextComp>
                  </Pressable>
                );
              })}
          </ScrollView>
        </View>

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
