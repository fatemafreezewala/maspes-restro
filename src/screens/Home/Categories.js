import React, {useState, useEffect, useCallback} from 'react';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';

//demo Data
// import categories from '../../data/categories';
import FlatlistComp from '../../components/FlatListComp';
import Categories from '../../components/Home/Categories';
import Fab from '../../components/Fab';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';

const Index = ({navigation, onChangeText}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [term, setTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, []),
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/category');
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setCategories(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategories = ({item}) => (
    <Categories
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
      <Header text="Category" color={colors.white} />
      <SubContainer>
        <SearchBar placeholder="Search Category" onChangeText={setTerm} />
        {loading && <CategoryLoading />}

        <FlatlistComp
          DATA={categories.filter(item =>
            item.category_name_en.toLowerCase()?.includes(term.toLowerCase()),
          )}
          numColumns={2}
          renderItem={renderCategories}
        />
        <Fab
          onPress={() =>
            navigation.navigate('AddCategory', {
              isEdit: false,
            })
          }
        />
      </SubContainer>
    </Container>
  );
};

export default Index;
