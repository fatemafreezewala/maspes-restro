import React from 'react'
import {SvgXml} from 'react-native-svg'

const Icon4 = ({color}) => {
    const tab1 = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" stroke=${color} stroke-width="2"/>
    <path d="M5.39856 5.87918C4.46882 6.88128 3.79371 8.07049 3.40061 9.34457L4.99992 10.2679C6.33325 11.0377 6.33325 12.9622 4.99992 13.732L3.3989 14.6564C3.59411 15.2864 3.86207 15.9047 4.20577 16.5C4.54946 17.0953 4.95089 17.6364 5.39889 18.1205L6.99994 17.1961C8.33328 16.4263 9.99994 17.3886 9.99994 18.9282L9.99994 20.775C11.2999 21.0716 12.6673 21.0815 14 20.7774L14 18.9283C14 17.3887 15.6667 16.4264 17 17.1962L18.6014 18.1208C19.5312 17.1187 20.2063 15.9295 20.5994 14.6554L19 13.732C17.6667 12.9622 17.6667 11.0377 19 10.2679L20.6011 9.34351C20.4059 8.7135 20.1379 8.09527 19.7942 7.49998C19.4505 6.90467 19.0491 6.36349 18.6011 5.87941L17 6.80377C15.6667 7.57357 14 6.61132 14 5.07172L14 3.22498C12.7001 2.92838 11.3327 2.91844 9.99994 3.22257L9.99995 5.07169C9.99995 6.61129 8.33328 7.57354 6.99994 6.80374L5.39856 5.87918Z" stroke=${color} stroke-width="2" stroke-linejoin="round"/>
    </svg>
    
    
`
return (<SvgXml xml={tab1}></SvgXml>)
}

export default Icon4