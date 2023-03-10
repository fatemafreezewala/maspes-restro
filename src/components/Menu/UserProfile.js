import {View} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import margins from '../../utilities/margins';
import {SvgXml} from 'react-native-svg';

const UserProfile = ({data}) => {
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
  return (
    <View style={{alignItems: 'center', marginTop: margins.m5}}>
      {/* <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: colors.grey,
          borderWidth: 5,
          borderColor: '#E7E9EE',
        }}
      /> */}

<SvgXml xml={userIco} width={80} height={80} />
      <TextComp
        style={{marginTop: margins.m5}}
        type="medium"
        color={colors.black}
        text={data?.admin_name}
      />
      <TextComp type="normal" color={colors.black} text={data?.admin_email} />
    </View>
  );
};

export default UserProfile;
