import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import colors from '../utilities/colors'


const globalStyle = StyleSheet.create({
    rowCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        backgroundColor:colors.white,
        flex:1
    },
    w100:{
        width:'100%'
    },
    boxborder:{
        borderWidth:1,
        borderColor:colors.borderColor,
        borderRadius:15
    },
    rowSpace:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    }
})
export default globalStyle