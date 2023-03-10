import React from 'react'
import {SvgXml} from 'react-native-svg'

const Icon1 = ({color}) => {
    const tab1 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_414_2843)">
    <path d="M5 3H19V21L17.9682 20.1156C17.2193 19.4737 16.1141 19.4737 15.3651 20.1156L14.3333 21L13.3016 20.1156C12.5526 19.4737 11.4474 19.4737 10.6984 20.1156L9.66667 21L8.63492 20.1156C7.88594 19.4737 6.78073 19.4737 6.03175 20.1156L5 21V3Z" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 7L9 7" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 11L9 11" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 15L11 15" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_414_2843">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
`
return (<SvgXml xml={tab1}></SvgXml>)
}
export default Icon1