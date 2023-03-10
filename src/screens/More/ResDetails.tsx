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
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {api, imageUrl} from '../../constant/api';
import toast from '../../utilities/toast';
import week from '../../utilities/week';
import WeekItem from '../../components/WeekItem';
import {useUserStore} from '../../constant/store';
import Spinner from '../../components/Spinner';

const initialWeek = [
  {day: 'Sunday', from: '', to: ''},
  {day: 'Monday', from: '', to: ''},
  {day: 'Tuesday', from: '', to: ''},
  {day: 'Wednesday', from: '', to: ''},
  {day: 'Thursday', from: '', to: ''},
  {day: 'Friday', from: '', to: ''},
  {day: 'Saturday', from: '', to: ''},
];

const ResDetails = ({route, navigation}: any) => {
  const [user] = useUserStore(s => [s.user]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<any>({});

  const [weekTimes, setWeekTimes] = useState(initialWeek);

  useEffect(() => {
    fetchRestroInfo();
  }, []);

  const fetchRestroInfo = async () => {
    try {
      setLoading(true);
      const res: any = await api.get('/restro/' + user.admin_restro_id);
      setLoading(false);
      if (res.data.status === 'success') {
        const temp = res.data?.data || {};
        setInfo(res.data.data);
        setName(temp.restro_name);
        setPhone(temp?.restro_phone?.toString());
        setAddress(temp?.restro_address);
        setDesc(temp?.restro_desp);
        setWeekTimes(
          temp?.restro_time !== ''
            ? JSON.parse(temp?.restro_time)
            : initialWeek,
        );
        setImage({
          path: `${imageUrl}/${temp?.restro_banner}`,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
    if (name === '') {
      toast('Please enter name');
      return;
    }
    if (phone === '') {
      toast('Please enter phone number');
      return;
    }
    if (address === '') {
      toast('Please enter address');
      return;
    }
    if (desc === '') {
      toast('Please enter description');
      return;
    }
    updateRestroDetails();
  };

  const updateRestroDetails = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('restro_name', name);
      fd.append('restro_phone', phone);
      fd.append('restro_address', address);
      fd.append('restro_desp', desc);
      fd.append('restro_time', JSON.stringify(weekTimes));
      fd.append('restro_about', info?.restro_about);
      fd.append('restro_privacy', info?.restro_privacy);
      fd.append('restro_terms', info?.restro_terms);
      if (image?.mime) {
        fd.append('restro_banner', {
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      } else {
        fd.append('restro_banner', info?.restro_banner);
      }
      const res = await api.put('/restro/' + user.admin_restro_id, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (res.data.status === 'success') {
        navigation.goBack();
        toast('Details Updated Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDatePress = (index: number, type: 'From' | 'To', value: string) => {
    let temp = [...weekTimes];
    if (type === 'From') {
      temp[index].from = value;
    } else {
      temp[index].to = value;
    }
    setWeekTimes(temp);
  };

  return (
    <Container>
      <Header text="RESTAURANT DETAILS" color={colors.white} showBack={true} />
      <Spinner visible={loading} />
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
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
            <TextInputComp
              placeholder="Phone No."
              onChangeText={setPhone}
              value={phone}
              keyboardType="phone-pad"
            />
            <TextInputComp
              placeholder="Address"
              onChangeText={setAddress}
              value={address}
            />
            <TextInputComp
              placeholder="Description"
              onChangeText={setDesc}
              multiline={true}
              style={{height: 100}}
              value={desc}
            />

            <View>
              <TextComp
                text="Add Week Timings"
                type="medium"
                style={{marginBottom: 20}}
              />

              <View style={styles.weekContainer}>
                {week.map(item => {
                  return (
                    <WeekItem
                      key={item.index}
                      day={item.day}
                      index={item.index}
                      onDatePress={onDatePress}
                      weekTimes={weekTimes}
                    />
                  );
                })}
              </View>
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

export default ResDetails;

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
  weekContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
});
