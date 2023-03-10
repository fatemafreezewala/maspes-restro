import React, {useState} from 'react';
import {Image, Pressable, TouchableOpacity, View, Alert} from 'react-native';
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
          width: '48%',
          height: 180,
          marginLeft: '2%',
          borderWidth: 1,
          borderColor: colors.borderColor,
          marginTop: margins.m5,
          borderRadius: 10,
        },
      ]}>
      <Image
        style={[
          globalStyle.w100,
          {height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10},
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
        fontSize={12}
        color={colors.black}
      />
     
    </Pressable>
  );
};

export default Categories;
