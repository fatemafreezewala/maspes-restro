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
    <svg width="35" height="35" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.9992 8.57891C25.9666 8.64501 25.9323 8.71072 25.9021 8.77762C25.7038 9.21168 25.2673 9.45818 24.7898 9.40403C24.3168 9.35066 23.9448 9.00779 23.8592 8.5355C23.8369 8.41165 23.8309 8.28383 23.8305 8.15759C23.8285 6.55196 23.8301 4.94632 23.8289 3.34069C23.8281 2.56495 23.4347 2.17111 22.6605 2.17031C21.0211 2.16912 19.3816 2.1735 17.7425 2.16832C16.9942 2.16593 16.4984 1.61201 16.604 0.90755C16.6609 0.527645 16.8795 0.263225 17.222 0.0975644C17.2885 0.0653084 17.3546 0.0326542 17.4211 0C19.3501 0 21.2791 0 23.2077 0C23.2455 0.0151325 23.2826 0.0374333 23.322 0.0446013C24.4533 0.253668 25.2538 0.892018 25.7292 1.92979C25.8535 2.20137 25.9112 2.50363 25.9996 2.79154C25.9992 4.72093 25.9992 6.64992 25.9992 8.57891Z" fill="#D0D5E3"/>
    <path d="M25.9991 23.198C25.8733 23.7157 25.7204 24.2211 25.3931 24.6559C24.7455 25.5153 23.8874 25.978 22.8102 25.9864C21.1181 25.9991 19.4261 25.9912 17.734 25.9892C17.0746 25.9884 16.5971 25.5408 16.5876 24.9235C16.5776 24.2971 17.0555 23.8244 17.7261 23.822C19.3843 23.8165 21.0425 23.8173 22.7007 23.8224C23.0507 23.8236 23.3498 23.7285 23.5831 23.4605C23.7771 23.2375 23.832 22.9726 23.8312 22.6831C23.8272 21.0421 23.8276 19.4006 23.8304 17.7595C23.8312 17.1192 24.1996 16.6632 24.7635 16.5899C25.2756 16.5234 25.7196 16.7803 25.9227 17.2593C25.945 17.3115 25.9737 17.3613 25.9995 17.4119C25.9991 19.3401 25.9991 21.269 25.9991 23.198Z" fill="#D0D5E3"/>
    <path d="M8.58862 0.000518799C8.65512 0.033173 8.72043 0.0670218 8.78773 0.0980832C9.23135 0.301973 9.47227 0.743601 9.40895 1.23819C9.35042 1.69336 9.00317 2.05893 8.53964 2.14136C8.41579 2.16326 8.28756 2.16924 8.16132 2.16924C6.56246 2.17123 4.9636 2.17003 3.36473 2.17083C2.57187 2.17123 2.18082 2.56149 2.18042 3.35236C2.17962 4.98507 2.18321 6.61778 2.17843 8.25049C2.17644 8.99198 1.63923 9.48777 0.948318 9.40215C0.436204 9.33884 0.0184682 8.91314 0.0156807 8.39186C0.00612334 6.58991 -0.0185666 4.78715 0.0248396 2.98639C0.059485 1.5504 1.20836 0.311132 2.63678 0.0514912C2.69293 0.0411374 2.74669 0.0180404 2.80165 0.000916803C4.73064 0.00051858 6.65963 0.000518799 8.58862 0.000518799Z" fill="#D0D5E3"/>
    <path d="M3.80449 7.92979C3.80449 6.94897 3.8029 5.96775 3.80489 4.98693C3.80648 4.21796 4.2282 3.79624 4.99796 3.79545C6.72306 3.79385 8.44856 3.79345 10.1737 3.79545C10.9223 3.79624 11.3548 4.22354 11.3564 4.97618C11.3608 6.95494 11.3612 8.93411 11.356 10.9129C11.354 11.644 10.9084 12.0817 10.184 12.0825C8.45015 12.0841 6.71669 12.0841 4.98283 12.0825C4.23736 12.0817 3.80688 11.6492 3.80489 10.8981C3.8025 9.90896 3.80449 8.91938 3.80449 7.92979ZM9.1789 5.96974C8.10569 5.96974 7.04761 5.96974 5.98277 5.96974C5.98277 7.28985 5.98277 8.59243 5.98277 9.89303C7.06195 9.89303 8.12003 9.89303 9.1789 9.89303C9.1789 8.57372 9.1789 7.27711 9.1789 5.96974Z" fill="#D0D5E3"/>
    <path d="M12.4426 13.1457C12.4426 13.0203 12.4426 12.9211 12.4426 12.8223C12.4426 10.5134 12.4402 8.20455 12.4442 5.89606C12.4454 5.11594 13.1419 4.59148 13.8575 4.83121C14.2669 4.9686 14.5177 5.2601 14.5858 5.69297C14.603 5.80088 14.6061 5.91199 14.6061 6.0215C14.6073 8.70233 14.6053 11.3832 14.6089 14.0644C14.6093 14.4555 14.5416 14.8302 14.2023 15.0504C13.9877 15.1898 13.707 15.2957 13.4549 15.2973C10.6219 15.3144 7.78857 15.3096 4.95561 15.3069C4.33558 15.3061 3.87484 14.921 3.81471 14.373C3.75179 13.7968 4.0855 13.3038 4.63743 13.1748C4.75889 13.1465 4.88871 13.1469 5.01495 13.1469C7.38278 13.1453 9.75101 13.1457 12.1188 13.1457C12.218 13.1457 12.3172 13.1457 12.4426 13.1457Z" fill="#D0D5E3"/>
    <path d="M7.44048 22.1953C6.6285 22.1953 5.81693 22.1969 5.00495 22.1949C4.2324 22.1929 3.8067 21.7736 3.8055 21.0094C3.80311 19.7662 3.80311 18.5233 3.8055 17.2801C3.8071 16.5314 4.23996 16.095 4.98424 16.0938C6.63328 16.0914 8.28232 16.091 9.93096 16.0938C10.6665 16.095 11.1109 16.543 11.1129 17.2849C11.1165 18.5281 11.1165 19.771 11.1129 21.0142C11.1105 21.7573 10.6709 22.1922 9.92618 22.1945C9.09788 22.1973 8.26918 22.1953 7.44048 22.1953ZM5.97701 20.0195C6.98013 20.0195 7.95458 20.0195 8.93023 20.0195C8.93023 19.4301 8.93023 18.8594 8.93023 18.2788C7.94184 18.2788 6.96699 18.2788 5.97701 18.2788C5.97701 18.8618 5.97701 19.4313 5.97701 20.0195Z" fill="#D0D5E3"/>
    <path d="M17.0657 20.0254C18.0724 20.0254 19.0417 20.0254 20.0293 20.0254C20.0293 18.9526 20.0293 17.8925 20.0293 16.7894C19.8047 16.7894 19.5805 16.7934 19.3567 16.7882C19.0867 16.7823 18.8127 16.7958 18.5483 16.7528C18.0195 16.6668 17.6459 16.1666 17.681 15.6366C17.7168 15.0998 18.1413 14.641 18.6745 14.6279C19.5196 14.6068 20.3658 14.6048 21.2104 14.6279C21.7934 14.6438 22.202 15.1288 22.2036 15.7604C22.2076 17.4007 22.2052 19.041 22.2052 20.6809C22.2052 20.7824 22.2056 20.884 22.2052 20.9851C22.202 21.7724 21.7858 22.1933 21.0033 22.1945C19.6167 22.1965 18.2301 22.1949 16.8435 22.1949C16.5644 22.1949 16.2856 22.1989 16.0064 22.1937C15.3753 22.1814 14.9137 21.7664 14.9034 21.1412C14.8835 19.9748 14.8827 18.8076 14.9038 17.6412C14.9153 17.0069 15.4147 16.5732 16.0359 16.5943C16.6157 16.6138 17.0593 17.0841 17.0637 17.6982C17.0701 18.4664 17.0657 19.2349 17.0657 20.0254Z" fill="#D0D5E3"/>
    <path d="M22.2045 7.0808C22.2045 7.79083 22.2069 8.50086 22.2037 9.21089C22.2001 9.95358 21.7648 10.3868 21.0162 10.3884C19.6132 10.3916 18.2099 10.3916 16.807 10.3884C16.0503 10.3868 15.6119 9.94681 15.6103 9.18779C15.6075 7.78486 15.6067 6.38152 15.6103 4.97858C15.6123 4.23072 16.0468 3.79706 16.7918 3.79546C18.2035 3.79307 19.6148 3.79307 21.0265 3.79546C21.7764 3.79666 22.2009 4.22395 22.2041 4.97619C22.2065 5.67786 22.2045 6.37953 22.2045 7.0808ZM20.0338 5.97334C19.2648 5.97334 18.5277 5.97334 17.7969 5.97334C17.7969 6.73275 17.7969 7.47106 17.7969 8.2018C18.5544 8.2018 19.2919 8.2018 20.0338 8.2018C20.0338 7.45035 20.0338 6.71921 20.0338 5.97334Z" fill="#D0D5E3"/>
    <path d="M0.011011 20.3117C0.0106128 19.4233 0.00543562 18.5353 0.0126036 17.6468C0.0169841 17.1148 0.398083 16.6744 0.900241 16.5943C1.44103 16.5079 1.9396 16.7883 2.10566 17.2944C2.15982 17.4593 2.17694 17.6424 2.17734 17.8177C2.18252 19.4249 2.17973 21.0325 2.18093 22.6397C2.18132 23.4294 2.57357 23.8193 3.36723 23.8197C4.99994 23.8205 6.63265 23.8169 8.26577 23.8217C8.96226 23.8237 9.45088 24.3111 9.42021 24.9566C9.39393 25.5169 8.95588 25.9808 8.39399 25.9844C6.6004 25.9952 4.80601 26.0199 3.01361 25.976C1.38647 25.9362 0.0376918 24.5074 0.0134002 22.8755C0.00105534 22.0209 0.0114092 21.1663 0.011011 20.3117Z" fill="#D0D5E3"/>
    <path d="M17.6311 13.5575C17.6128 13.7801 17.6128 13.9752 17.5786 14.1644C17.4806 14.7076 17.0071 15.0616 16.4396 15.0297C15.9144 15.0003 15.4648 14.561 15.4473 14.0234C15.4298 13.483 15.4294 12.941 15.4481 12.4011C15.4656 11.8917 15.8682 11.4282 16.3731 11.421C18.0966 11.3967 19.8206 11.3944 21.5441 11.4214C22.0972 11.4302 22.5121 11.9785 22.4807 12.5237C22.4472 13.0987 22 13.5499 21.4294 13.5543C20.263 13.5627 19.0966 13.5575 17.9302 13.5575C17.8378 13.5575 17.7458 13.5575 17.6311 13.5575Z" fill="#D0D5E3"/>
    <path d="M11.9431 18.4879C11.9431 18.0905 11.9395 17.693 11.9439 17.2956C11.9515 16.6477 12.419 16.1662 13.0331 16.169C13.6376 16.1718 14.1063 16.6445 14.113 17.2797C14.1214 18.0829 14.1222 18.8865 14.1126 19.6897C14.1051 20.3201 13.624 20.7976 13.0243 20.794C12.4222 20.7904 11.9539 20.3113 11.9447 19.6806C11.9383 19.2827 11.9431 18.8853 11.9431 18.4879Z" fill="#D0D5E3"/>
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