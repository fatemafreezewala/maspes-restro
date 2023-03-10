import React from 'react'
import {SvgXml} from 'react-native-svg'

const Icon1 = ({color}) => {
    const tab1 = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 9H20L19.1654 18.1811C19.0717 19.2112 18.208 20 17.1736 20H6.82643C5.79202 20 4.92829 19.2112 4.83464 18.1811L4 9Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 11V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
    
`
return (<SvgXml xml={tab1}></SvgXml>)
}

export default Icon1