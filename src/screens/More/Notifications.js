import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import {api} from '../../constant/api';
import TextComp from '../../components/TextComp';
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from '../../components/Spinner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import notificationIcons from '../../utilities/icons/notificationIcons';
import {SvgXml} from 'react-native-svg';

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
                <SvgXml xml={notificationIcons.order}></SvgXml>
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
                      fontSize={12}
                      color={colors.black}
                      style={{flex: 1}}
                    />
                    <TextComp
                      text={item.notification_createdat}
                      type="medium"
                      fontSize={8}
                      color={colors.primary}
                    />
                  </View>
                  <TextComp
                    color={colors.black}
                    fontSize={12}
                    text={item.notification_desp && item.notification_desp.substring(0,100)}
                  />
                
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
