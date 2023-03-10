import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import SearchBar from '../../components/SearchBar';
import FlatlistComp from '../../components/FlatListComp';
import Product from '../../components/Home/Product';
import Fab from '../../components/Fab';
import {api} from '../../constant/api';
import {useFocusEffect} from '@react-navigation/native';
import CategoryLoading from '../../components/Placeholders/CategoryLoading';
import TextComp from '../../components/TextComp';
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from '../../components/Spinner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Notifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.post('/notification', {
        type: 'admin',
      });
      setLoading(false);
      if (res.data.status === 'success') {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotif = async id => {
    try {
      setLoading(true);
      const res = await api.delete('/notification/' + id);
      setLoading(false);
      if (res.data.status === 'success') {
        fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header text="Notifications" color={colors.white} showBack />
      <Spinner visible={loading} />
      <SubContainer>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Icon
                  name="bells"
                  color={colors.primary}
                  size={25}
                  style={{marginTop: 5}}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextComp
                      text={item.notification_title}
                      type="medium"
                      style={{flex: 1}}
                    />
                    <TextComp
                      text={item.notification_createdat}
                      type="medium"
                      color={colors.primary}
                    />
                  </View>
                  <TextComp text={item.notification_desp} />
                  <TouchableOpacity
                    onPress={() => deleteNotif(item.notification_id)}>
                    <TextComp text="Remove" type="medium" color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </SubContainer>
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#dde3ed',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
});
