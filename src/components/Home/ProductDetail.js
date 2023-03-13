import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import TextComp from '../TextComp';
import currency from '../../utilities/currency';
import colors from '../../utilities/colors';
import globalStyle from '../../styles/globalStyle';
import FastImage from 'react-native-fast-image';
import {api, imageUrl} from '../../constant/api';
import margins from '../../utilities/margins';
import Button from '../Button';
import Ant from 'react-native-vector-icons/AntDesign';
import ION from 'react-native-vector-icons/Ionicons';
import FlatlistComp from '../FlatListComp';
import { Checkbox } from 'react-native-paper';
import {  SvgXml } from 'react-native-svg';
import DefaultProductIcon from '../../assets/images/home/defaultpro.svg';

const ProductDetail = ({id, setModalVisible, modalVisible}) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    fetchProductById();
  }, [id]);

  const fetchProductById = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/product/${id}`);
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setItem(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
         <View style={{flex:2.5}}>
         <Ant
            onPress={() => {
              setModalVisible(false);
            }}
            style={{position: 'absolute', right: 20, top: 20, zIndex: 20}}
            color={colors.white}
            size={25}
            name="close"></Ant> 
          {item &&  !item.prod_name_image  ? (
            // <SvgXml height={180}  width={'100%'} xml={defaultProductIcon}></SvgXml>
            // <DefaultProductIcon width="100%" height={180}></DefaultProductIcon>
            <FastImage resizeMode='cover' style={{
              width: '100%',
              height: 180,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              
            }} source={require('../../assets/images/home/defaultpro.png')}></FastImage>
          ) : (
            <FastImage
              style={{
                width: '100%',
                height: 180,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}
              resizeMode="cover"
              source={{uri: `${imageUrl}/${item?.prod_name_image}`}}
            />
          )}

          <View
            style={{marginHorizontal: margins.m3, marginVertical: margins.m5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextComp
                type="medium"
                color={colors.black}
                text={item?.prod_name_en}></TextComp>
              <View style={globalStyle.row}>
                <TextComp text={currency} color={colors.primary}></TextComp>
                <TextComp
                  text={item?.prod_normal_price}
                  color={colors.primary}></TextComp>
              </View>
            </View>

            {item && item.subitem.length > 0 && (
              <TextComp
                style={{marginVertical: margins.m5}}
                type="semibold"
                color={colors.black}
                text="Additional Options"></TextComp>
            )}
            <FlatlistComp DATA={item && item.subitem} renderItem={({item})=>(
              <View style={[globalStyle.row,{justifyContent:'space-between'}]}>
                <TextComp
                    color={colors.primary}
                    text={`${item.ps_name_en} - ${currency}${item.ps_price}`}></TextComp>
                    <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
              </View>
            )}></FlatlistComp>
            <TextComp
              style={{marginVertical: margins.m5}}
              fontSize={12}
              text={item && item?.prod_desp_en}
              color={colors.black}></TextComp>

            
          </View>
         </View>
          <View style={{flexDirection: 'row',flex:0.4,padding:10}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '35%',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: colors.primary,
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <TouchableOpacity>
                  <ION color={colors.primary} size={20} name="add"></ION>
                </TouchableOpacity>
                <View>
                  <TextComp color={colors.black} text="5"></TextComp>
                </View>
                <TouchableOpacity>
                  <Ant color={colors.primary} size={20} name="minus"></Ant>
                </TouchableOpacity>
              </View>
              <View style={{width: '60%', marginLeft: '5%'}}>
                <Button text="Add to Cart"></Button>
              </View>
            </View>
        </View>
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    marginTop: 22,
    alignItems: 'center',
    backgroundColor: '#20232a7a',
    flexDirection:'column'
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 15,
    flexDirection:'column',
    flex:0.7
  },
});

export default ProductDetail;
