import React, {useState, useCallback} from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';
import {ScrollView, View} from 'react-native';
//demo Data
import FlatlistComp from '../../components/FlatListComp';
import MiniCategories from '../../components/Home/MiniCategories';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';
import Header from '../../components/Home/Header';
import Product from '../../components/Home/Product';
import HomeHeader from '../../components/Home/HomeHeader';
import Banner from '../../components/Home/Banner';
import RestroSvg from '../../assets/images/home/restro.svg';
import globalStyle from '../../styles/globalStyle';
import {useUserStore} from '../../constant/store';

const Index = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [user, clear] = useUserStore(s => [s.user, s.clear]);
  const [homedata, setHomeData] = useState({
    banner: [],
    categories: [],
    popular_product: [],
  });

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
      setLoading(false);
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
    <MiniCategories
      onPress={() => {
        navigation.navigate('Products', {
          category: item,
        });
      }}
      item={item}
    />
  );
  return (
    <Container>
      <SubContainer>
        <HomeHeader user={user}></HomeHeader>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RestroSvg width="99%"></RestroSvg>
          <SearchBar placeholder="Search Category" onChangeText={setTerm} />
          <Banner banners={homedata.banner}></Banner>
          {/* {loading && <CategoryLoading />} */}
          <Header
            title={'Categories'}
            onPress={() => navigation.navigate('Category')}></Header>
          <View style={globalStyle.row}>
            {homedata.categories &&
              homedata.categories.slice(0, 4).map(ele => (
                <MiniCategories
                  onPress={() => {
                    navigation.navigate('Products', {
                      category_id: ele.category_id,
                      categories: homedata.categories
                    });
                  }}
                  item={ele}
                />
              ))}
          </View>

          <Header
            onPress={() =>
              navigation.navigate('Products', {
                category_id: '2',
                categories: homedata.categories,
              })
            }
            title={'Famous Products'}></Header>
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
