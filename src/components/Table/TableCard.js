import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../utilities/colors';
import {SvgXml} from 'react-native-svg';
import TextComp from '../TextComp';
import margins from '../../utilities/margins';
import PdfMakeComp from './PdfMakeComp';

const TableCard = ({item}) => {
  const calander = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 8H20" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 12H12" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 3V5" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 3V5" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  const clock = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 8V13H16" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;
  const qr = `
    
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="16" width="13" height="10" rx="2" fill=${colors.primary}/>
<rect x="28" width="13" height="10" rx="2" transform="rotate(90 28 0)" fill=${colors.primary}/>
<rect x="31" y="16" width="13" height="10" rx="2" fill=${colors.primary}/>
<rect x="28" y="31" width="13" height="10" rx="2" transform="rotate(90 28 31)" fill=${colors.primary}/>
<g filter="url(#filter0_d_300_2359)">
<ellipse cx="22.5" cy="21" rx="16.5" ry="16" fill="#60A48B"/>
</g>
<defs>
<filter id="filter0_d_300_2359" x="1" y="1" width="43" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="2.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_300_2359"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_300_2359" result="shape"/>
</filter>
</defs>
</svg>

    `;
  return (
    <View
      style={{
        marginTop: margins.m5,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
      
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextComp
            fontSize={20}
            color={colors.black}
            type="bold"
            text={item.table_no_of_guest}
          />
          <TextComp
            fontSize={14}
            color={colors.black}
            style={{marginLeft: margins.m5}}
            type="normal"
            text={'No. of Guest'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextComp
            fontSize={14}
            color={colors.black}
            type="medium"
            text={item.table_name}
          />
          
        </View>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginTop: margins.m5},
          ]}>
          <View style={styles.row}>
            <SvgXml xml={calander} />
            <TextComp
              fontSize={13}
              color={colors.black}
              type="normal"
              text={item.table_date}
            />
          </View>
          <View style={[styles.row, {marginLeft: margins.m10}]}>
            <SvgXml xml={clock} />
            <TextComp
              fontSize={13}
              color={colors.black}
              type="normal"
              text={item.table_time}
            />
          </View>
        </View>
      </View>
      <View>
        <SvgXml xml={qr} />
        <View style={{marginTop: margins.m5}}>
          <PdfMakeComp item={item} />
        </View>
      </View>
    </View>
  );
};

export default TableCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
