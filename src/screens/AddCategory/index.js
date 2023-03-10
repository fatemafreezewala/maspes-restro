import React, {useEffect, useState} from 'react';
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

const AddCategory = ({route, navigation}) => {
  const {isEdit, data} = route.params;
  const [nameEn, setNameEn] = useState('');
  const [nameSp, setNameSp] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfUpdate();
  }, []);

  const checkIfUpdate = () => {
    console.log(data)
    if (isEdit) {
      setNameEn(data.category_name_en);
      setNameSp(data.category_name_sp);
      setDesc(data?.category_desc || '');
      setImage({
        path: `${imageUrl}/${data?.category_image}`,
      });
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
      toast('Please enter category name');
      return;
    }
    if (nameSp === '') {
      toast('Please enter category name');
      return;
    }
    if (image === null) {
      toast('Please select category image');
      return;
    }
    // if (desc === '') {
    //   toast('Please enter description');
    //   return;
    // }
    handleAddCategory();
  };

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('category_name_en', nameEn);
      fd.append('category_name_sp', nameSp);
      fd.append('category_active', '1');
      fd.append('type', isEdit ? 'updateCategory' : 'addCategory');
      fd.append('category_id', isEdit ? data?.category_id : '');
      if (isEdit) {
        if (image?.mime) {
          fd.append('category_image', {
            uri: image.path,
            type: image.mime,
            name: image.filename,
          });
        } else {
          fd.append('category_image', data?.category_image);
        }
      } else {
        fd.append('category_image', {
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      }
      const res = await api.put('/category', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (res.data.status === 'success') {
        toast(
          isEdit
            ? 'Category updated successfully'
            : 'Category added successfully',
        );
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header
        text={isEdit ? 'UPDATE CATEGORY' : 'ADD CATEGORY'}
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
            {/* <TextInputComp
              placeholder="Description"
              onChangeText={setDesc}
              multiline={true}
              style={{height: 100}}
              value={desc}
            /> */}
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

export default AddCategory;

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
});
