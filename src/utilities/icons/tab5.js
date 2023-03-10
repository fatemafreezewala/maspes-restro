import React from 'react'
import {SvgXml} from 'react-native-svg'

const Icon5 = ({color}) => {
    const tab1 = `
  
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8V17C17 18.1046 16.1046 19 15 19H5C3.89543 19 3 18.1046 3 17V8M19 10L10 1L1 10" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

     
`
return (<SvgXml xml={tab1}></SvgXml>)
}

export default Icon5