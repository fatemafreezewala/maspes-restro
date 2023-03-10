import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import Card from '../../components/Menu/Card';
import margins from '../../utilities/margins';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {api, imageUrl} from '../../constant/api';
import toast from '../../utilities/toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddProduct = ({route, navigation}) => {
  const {isEdit, data, categoryId} = route.params;

  const [nameEn, setNameEn] = useState('');
  const [nameSp, setNameSp] = useState('');
  const [priceRegular, setPriceRegular] = useState('');
  const [priceOffer, setPriceOffer] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVeg, setIsVeg] = useState('1');
  const [isPopular, setisPopular] = useState('0');

  useEffect(() => {
    checkIfUpdate();
  }, []);

  const checkIfUpdate = () => {
    if (isEdit) {
      setNameEn(data.prod_name_en);
      setNameSp(data.prod_name_sp);
      setDesc(data?.prod_desp_en || '');
      setImage({
        path: `${imageUrl}/${data?.prod_name_image}`,
      });
      setIsVeg(data?.prod_isveg.toString());
      setisPopular(data?.prod_is_popular.toString())
      setPriceOffer(data?.prod_offer_price.toString());
      setPriceRegular(data?.prod_normal_price.toString());
    }
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    })
      .then(img => {
        console.log(img);
        setImage(img);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validateData = () => {
    if (nameEn === '') {
      toast('Please enter Product Name');
      return;
    }
    if (nameSp === '') {
      toast('Please enter Product Name');
      return;
    }
    if (image === null) {
      toast('Please select Product Image');
      return;
    }
    if (desc === '') {
      toast('Please enter Description');
      return;
    }
    if (priceOffer === '') {
      toast('Please enter Offer Price');
      return;
    }
    if (priceRegular === '') {
      toast('Please enter Regular Price');
      return;
    }
    handleAddProduct();
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('prod_cat_id', categoryId);
      fd.append('prod_name_en', nameEn);
      fd.append('prod_name_sp', nameSp);
      fd.append('prod_normal_price', priceRegular);
      fd.append('prod_offer_price', priceOffer);
      fd.append('prod_is_popular', isPopular);
      fd.append('prod_desp_en', desc);
      fd.append('prod_desp_sp', desc);
      fd.append('prod_isactive', '1');
      fd.append('prod_isveg', isVeg);
      fd.append('prod_ingredients_en', '');
      fd.append('prod_ingredients_sp', '');
      fd.append('prod_created_by', '1');
      fd.append('type', isEdit ? 'updateProduct' : 'addProduct');
      fd.append('prod_id', isEdit ? data?.prod_id : '');
      if (isEdit) {
        if (image?.mime) {
          fd.append('prod_name_image', {
            uri: image.path,
            type: image.mime,
            name: image.filename,
          });
        } else {
          fd.append('prod_name_image', data?.prod_name_image);
        }
      } else {
        fd.append('prod_name_image', {
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      }
      const res = await api.put('/product', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (res.data.status === 'success') {
        toast(
          isEdit
            ? 'Product updated successfully'
            : 'Product added successfully',
        );
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      <Header
        text={isEdit ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
        color={colors.white}
        showBack={true}
      />
      <SubContainer>
        <KeyboardAvoidingView
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={100}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={pickImage} style={styles.imageWrap}>
              {image !== null ? (
                <Image
                  source={{uri: image.path}}
                  style={{height: 100, width: 100}}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{height: 100, width: 100}}
                  resizeMode="contain"
                  source={require('../../assets/images/demo/upload-image.png')}
                />
              )}
              <TextComp
                text={image === null ? 'Add Image' : 'Change Image'}
                type="medium"
              />
            </TouchableOpacity>

            <TextInputComp
              placeholder="Name in English"
              onChangeText={setNameEn}
              value={nameEn}
            />

            <TextInputComp
              placeholder="Name in Spanish"
              onChangeText={setNameSp}
              value={nameSp}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInputComp
                placeholder="Regular Price"
                onChangeText={setPriceRegular}
                style={{flex: 1}}
                keyboardType="number-pad"
                value={priceRegular}
              />
              <View style={{marginHorizontal: 10}} />
              <TextInputComp
                placeholder="Offer Price"
                onChangeText={setPriceOffer}
                style={{flex: 1}}
                keyboardType="number-pad"
                value={priceOffer}
              />
            </View>
            <TextInputComp
              placeholder="Description"
              onChangeText={setDesc}
              multiline={true}
              style={{height: 100}}
              value={desc}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setIsVeg('1')}
                style={styles.checkWrap}>
                <Icon
                  name={
                    isVeg === '1' ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  color={colors.primary}
                  size={25}
                  style={{marginRight: 10}}
                />
                <TextComp text="Veg" type="medium" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsVeg('0')}
                style={styles.checkWrap}>
                <Icon
                  name={
                    isVeg === '0' ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  color={colors.primary}
                  size={25}
                  style={{marginRight: 10}}
                />
                <TextComp text="Non Veg" type="medium" />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setisPopular(isPopular == '1' ? '0' : '1')}
                style={styles.checkWrap}>
                <Icon
                  name={
                    isPopular === '1' ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  color={colors.primary}
                  size={25}
                  style={{marginRight: 10}}
                />
                <TextComp text="Is Popular" type="medium" />
              </TouchableOpacity>
             
            </View>
            <Button
              text="SUBMIT"
              onPress={() => validateData()}
              loading={loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SubContainer>
    </Container>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  imageWrap: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#D0D5E3',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkWrap: {flexDirection: 'row', alignItems: 'center', marginRight: 30},
});
