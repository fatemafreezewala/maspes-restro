import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import TextComp from '../../components/TextComp';
import Button from '../../components/Button';
import TextInputComp from '../../components/TextInputComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../navigation/Auth';
import toast from '../../utilities/toast';
import {api} from '../../constant/api';
import {stringMd5} from 'react-native-quick-md5';
import {useUserStore} from '../../constant/store';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';

const Index = ({navigation}) => {
  const [setUser] = useUserStore(state => [state.setUser]);
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (email === '' || password === '') {
      toast('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/admin', {
        admin_email: email,
        admin_password: stringMd5(password),
      });
      setLoading(false);
      console.log(res.data);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          await AsyncStorage.setItem('USER_TOKEN', '123');
          setUser(res.data.data);
          signIn('123');
        } else {
          toast(res.data?.message);
        }
      } else {
        toast(res.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      <View
        style={{
          width: '100%',
          flex: 1,
          padding: 15,
        }}>
        <View style={{marginVertical: '5%', alignSelf: 'center'}}>
        <TextComp
            style={{textAlign: 'center'}}
            fontSize={12}
            color={colors.black}
            text="Join to our family"
          />
          <TextComp
            style={{textAlign: 'center'}}
            fontSize={20}
            type="medium"
            color={colors.primary}
            text="Sign up"
          />
          
        </View>
        <TextInputComp
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          keyboardType="default"
          type="email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInputComp
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
          type="email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInputComp
          type="password"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
         <TextInputComp
          type="password"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
        <Button onPress={onLogin} loading={loading} text="Login" />
      </View>
      <View style={[globalStyle.row,{justifyContent:'center',marginBottom:margins.m5}]}>
        <TextComp color={colors.black} text='Already a member '></TextComp>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <TextComp type='medium' color={colors.primary} text=' Sign in'></TextComp>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Index;

const styles = StyleSheet.create({});
