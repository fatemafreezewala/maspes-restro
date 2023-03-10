import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../../utilities/colors';
import TextComp from '../TextComp';
import OutlineButton from '../OutlineButton';
import {SvgXml} from 'react-native-svg';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
import {api, imageUrl} from '../../constant/api';
import toast from '../../utilities/toast';

const UserCard = ({item, fetchUsers}) => {
  const [loading, setLoading] = useState(false);
  const userIco = `
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_344_3008)">
    <rect width="40" height="40" rx="20" fill="white"/>
    <rect x="12" y="6" width="16" height="16" rx="8" fill=${colors.primary}/>
    <rect x="-10" y="27" width="60" height="60" rx="30" fill=${colors.primary}/>
    </g>
    <rect x="0.3" y="0.3" width="39.4" height="39.4" rx="19.7" stroke="#D0E3DC" stroke-width="0.6"/>
    <defs>
    <clipPath id="clip0_344_3008">
    <rect width="40" height="40" rx="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
  `;
  const deleteIcon = `<svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 10V16" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 10V16" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 6V18C5 19.1046 5.89543 20 7 20H15C16.1046 20 17 19.1046 17 18V6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 6H19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 6L8 2H14L16 6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  const phone = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.49371 4.95952C2.93339 10.6147 7.38532 15.0666 13.0405 16.5063C15.1813 17.0513 17 15.2091 17 13V12C17 11.4477 16.5512 11.0053 16.0016 10.9508C15.073 10.8587 14.1818 10.6397 13.3456 10.3112L11.8263 11.8305C9.3553 10.648 7.35202 8.64471 6.16949 6.17367L7.68877 4.65438C7.36032 3.81816 7.14126 2.92696 7.04922 1.99842C6.99474 1.44883 6.55229 1 6 1H5C2.79086 1 0.948692 2.81867 1.49371 4.95952Z" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  const email = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 5L12 14L21 5" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

  const deleteUser = async () => {
    try {
      setLoading(true);
      const res = await api.delete('/admin/' + item.admin_id);
      setLoading(false);
      if (res.data.status === 'success') {
        toast('Deleted Successfully');
        fetchUsers();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteAlert = () => {
    Alert.alert('Confirmation', 'Do you want to delete this user?', [
      {
        text: 'Yes',
        onPress: deleteUser,
      },
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.borderColor,
          padding: 10,
          borderRadius: 10,
          marginTop: margins.m5,
        },
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', width: '90%'}}>
          {item.admin_image !== null ? (
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
                resizeMode: 'contain',
              }}
              source={{uri: `${imageUrl}/${item.admin_image}`}}
            />
          ) : (
            <SvgXml xml={userIco} />
          )}
          <View style={{marginLeft: margins.m5}}>
            <TextComp
              type="medium"
              color={colors.black}
              fontSize={14}
              text={item.admin_name}
            />
            <OutlineButton width={'80%'} height={30} text="Booking History" />
          </View>
        </View>
        <TouchableOpacity onPress={deleteAlert}>
          <SvgXml xml={deleteIcon} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', marginTop: margins.m5},
        ]}>
        <View style={styles.row}>
          <SvgXml xml={phone} />
          <TextComp
            fontSize={13}
            color={colors.black}
            type="normal"
            text={item.admin_phone}
          />
        </View>
        <View style={styles.row}>
          <SvgXml xml={email} />
          <TextComp
            fontSize={13}
            color={colors.black}
            type="normal"
            text={item.admin_email}
          />
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
