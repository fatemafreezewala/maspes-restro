import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import Share from 'react-native-share';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import FA from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
const PdfMakeComp = ({item}) => {
  const generatePDF = () => {
    var dd = {
      pageMargins: [0, 0, 0, 0],
      footer: {
        columns: ['Left part', {text: 'Right part', alignment: 'right'}],
      },
      content: [
        `Table Name: ${item.table_name}`,
        `Table Number of Guest: ${item.table_no_of_guest}`,
        `Date Time: ${item.table_date} ${item.table_time}`,
        {
	        image:item.table_qr,
           width: 200
		},
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(dd);
    pdfDocGenerator.getBase64(async data => {
      let base64Data = `data:application/pdf;base64,` + data;
      await Share.open({url: base64Data});
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        generatePDF();
      }}
      style={[
        {backgroundColor: colors.primary, padding: 3, borderRadius: 5},
        globalStyle.rowCenter,
      ]}>
      <FA name="file-pdf-o" size={15} color={colors.white} />
      <TextComp
        fontSize={10}
        type="normal"
        style={{marginLeft: margins.m5}}
        color={colors.white}
        text="Share"
      />
    </TouchableOpacity>
  );
};

export default PdfMakeComp;

const styles = StyleSheet.create({});
