import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../utilities/colors';
import {SvgXml} from 'react-native-svg';
import TextComp from '../TextComp';
import RatingPill from './RatingPill';
import margins from '../../utilities/margins';
import fontSize from '../../utilities/fontSize';
import fontFamily from '../../utilities/fontFamily';
import currency from '../../utilities/currency';

const OrderCard = ({item, onPress, showUser = true, showSubItems = false}) => {
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
  const arrowIco = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17L15 12" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 12L10 7" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  const vegIcon = `
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.35" y="0.35" width="10.3" height="10.3" rx="1.65" stroke="#43ED3F" stroke-width="0.7"/>
<circle cx="5.5" cy="5.5" r="2.5" fill="#43ED3F"/>
</svg>

    `;
  const nonvegIcon = `
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.35" y="0.35" width="10.3" height="10.3" rx="1.65" stroke="#FA2E2E" stroke-width="0.7"/>
<circle cx="5.5" cy="5.5" r="2.5" fill="#FA2E2E"/>
</svg>

    `;
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderColor: colors.borderColor,
        // minHeight: 180,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: margins.m5,
      }}>
      {showUser && (
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.borderColor,
            },
          ]}>
          <View style={styles.row}>
            <SvgXml xml={userIco} />
            <View style={{marginLeft: margins.m5}}>
              <View style={styles.row}>
                <TextComp
                  color={colors.black}
                  type="medium"
                  text={item.user_name}
                />
                {item.o_status === '2' && <RatingPill star={item.o_ratings} />}
              </View>
              <TextComp color={colors.black} text={item.user_phone} />
            </View>
          </View>
          <SvgXml xml={arrowIco} />
        </View>
      )}

      <View
        style={{
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.borderColor,
          marginTop: margins.m5,
        }}>
        {item.items &&
          item.items.map((res, i) => (
            <View key={i}>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  {res.prod_isveg === 1 ? (
                    <SvgXml xml={vegIcon} />
                  ) : (
                    <SvgXml xml={nonvegIcon} />
                  )}
                  <TextComp
                    type="medium"
                    color={colors.primary}
                    style={{marginHorizontal: 4}}
                    text={res.item_qty}
                  />
                  <TextComp
                    fontSize={13}
                    color={colors.black}
                    text={res.prod_name_en}
                  />
                </View>
                <TextComp
                  type="medium"
                  color={colors.primary}
                  text={`${currency}${res.item_price}`}
                />
              </View>
              <View>
                {res?.subitems?.length > 0 && (
                  <>
                    {res?.subitems?.map((subItem, i) => {
                      return (
                        <View
                          key={i}
                          style={{marginLeft: 20, flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              marginRight: 10,
                            }}
                          />
                          <TextComp
                            color={colors.black}
                            text={`${subItem?.ps_name_en} - `}
                          />
                          <TextComp
                            type="medium"
                            color={colors.primary}
                            text={`${currency}${subItem?.ps_price}`}
                          />
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            </View>
          ))}
      </View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', marginTop: margins.m5},
        ]}>
        <Text
          style={{
            fontSize: 10,
            color: colors.black,
            fontFamily: fontFamily.medium,
          }}>
          <Text style={{color: colors.primary}}>Order: </Text>
          <Text>
            {item.o_placed_date} {item.o_placed_time}
          </Text>
        </Text>
        {item.o_status == 2 ? (
          <Text
          style={{
            fontSize: 10,
            color: colors.black,
            fontFamily: fontFamily.medium,
          }}>
          <Text style={{color: colors.primary}}>Deliver :</Text>
          <Text>
            {item.o_delivered_date} {item.o_delivered_time}
          </Text>
        </Text>
        ) : (
          <Text
          style={{
            fontSize: 10,
            color: colors.black,
            fontFamily: fontFamily.medium,
          }}>
          <Text style={{color: 'red'}}>On Hold</Text>
          
        </Text>
        )}
      </View>
    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
