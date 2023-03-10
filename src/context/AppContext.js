import React, {useState} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
const [userId, setUserId] = useState(true)
const [puser, setUser] = useState(null) 
const [clientId, setClientId] = useState('')
const [location, setLocation] = useState({})
const [lang, setLang] = useState('en')
  return (
    <AppContext.Provider
      value={{lang,setLang,userId,setUserId,puser,setUser,location,
       setLocation,setClientId,clientId}}>
      {children}
    </AppContext.Provider>
  ); 
}; 

export {AppProvider, AppContext as default};
