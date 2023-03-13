import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Table from '../screens/Table/Index';
import AuthContext, {defaultState, reducer, restoreToken} from './Auth';
import Tab from './Tab';
import Editor from '../screens/Editor';
import AddProduct from '../screens/AddProduct';
import AddCategory from '../screens/AddCategory';
import Notifications from '../screens/More/Notifications';
import ResDetails from '../screens/More/ResDetails';
import Info from '../screens/More/Info';
import Tables from '../screens/Table/Index';
import Checkout from '../screens/Checkout/Index';
import Address from '../screens/Address/Index';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    restoreToken(dispatch);
  }, []);

  useEffect(() => {
    console.log('userToken', state.userToken);
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      signIn: data => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: data => {
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  options={screenOptions}
                  name="Login"
                  component={Login}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="SignUp"
                  component={SignUp}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  options={screenOptions}
                  name="Tabnavigation"
                  component={Tab}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Editor"
                  component={Editor}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="AddProduct"
                  component={AddProduct}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="AddCategory"
                  component={AddCategory}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Notifications"
                  component={Notifications}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="ResDetails"
                  component={ResDetails}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Table"
                  component={Table}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Info"
                  component={Info}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Tables"
                  component={Tables}
                />
                <Stack.Screen
                  options={screenOptions}
                  name="Checkout"
                  component={Checkout}
                />

                <Stack.Screen
                  options={screenOptions}
                  name="Address"
                  component={Address}
                />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
