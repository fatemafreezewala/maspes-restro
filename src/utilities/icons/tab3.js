import React from 'react'
import {SvgXml} from 'react-native-svg'

const Icon3 = ({color}) => {
    const tab1 = `
   
<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0711 10.1421L11.4142 15.799C10.6332 16.58 9.36683 16.58 8.58578 15.799L2.92893 10.1421C0.976307 8.18951 0.976307 5.02369 2.92893 3.07106C4.88155 1.11844 8.04737 1.11844 10 3.07106C11.9526 1.11844 15.1184 1.11844 17.0711 3.07106C19.0237 5.02369 19.0237 8.18951 17.0711 10.1421Z" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
return (<SvgXml xml={tab1}></SvgXml>)
}

export default Icon3