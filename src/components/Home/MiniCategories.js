import React, {useState} from 'react';
import {Image, Pressable, TouchableOpacity, View, Alert, Dimensions} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import margins from '../../utilities/margins';
import {api, imageUrl} from '../../constant/api';
import toast from '../../utilities/toast';
import {useNavigation} from '@react-navigation/native';

const Categories = ({item, onPress, fetchCategories}) => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  return (
   
    <Pressable
      onPress={onPress}
      style={[
        {
          marginTop: margins.m5,
          borderRadius: 10,
          height:100,
          width: '23%',
          marginRight:'2%'
        },
      ]}>
      <Image
        style={[
          
          {height: 60,width:'100%',borderRadius:10}
        ]}
         source={{uri: `${imageUrl}/${item.category_image}`}}
        
      />
      <TextComp
        style={[
          {
            textAlign: 'center',
            marginTop: margins.m5,
          },
        ]}
        type="medium"
        text={item.category_name_en}
        fontSize={10}
        color={colors.black}
      />
      
    </Pressable>
  );
};

export default Categories;
