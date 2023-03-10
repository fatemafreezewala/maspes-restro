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

  const deleteAlert = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Yes',
          onPress: deleteProduct,
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      const res = await api.delete('/category/' + item.category_id);
      setLoading(false);
      if (res.data.status === 'success') {
        toast('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TextComp></TextComp>
    // <Pressable
    //   onPress={onPress}
    //   style={[
    //     {
    //       width: '48%',
    //       height: 180,
    //       marginLeft: '2%',
    //       borderWidth: 1,
    //       borderColor: colors.borderColor,
    //       marginTop: margins.m5,
    //       borderRadius: 10,
    //     },
    //   ]}>
    //   <Image
    //     style={[
    //       globalStyle.w100,
    //       {height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10},
    //     ]}
    //     source={{uri: `${imageUrl}/${item.category_image}`}}
    //   />
    //   <TextComp
    //     style={[
    //       {
    //         textAlign: 'center',
    //         marginTop: margins.m5,
    //       },
    //     ]}
    //     type="medium"
    //     text={item.category_name_en}
    //     fontSize={12}
    //     color={colors.black}
    //   />
    //   <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.navigate('AddCategory', {
    //           isEdit: true,
    //           data: item,
    //         });
    //       }}
    //       style={{
    //         padding: 5,
    //         paddingHorizontal: 15,
    //       }}>
    //       <TextComp fontSize={12} color={colors.primary} text="Edit" />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{padding: 5, paddingHorizontal: 15}}
    //       onPress={deleteAlert}>
    //       <TextComp fontSize={12} color={colors.primary} text="Delete" />
    //     </TouchableOpacity>
    //   </View>
    // </Pressable>
  );
};

export default Categories;
