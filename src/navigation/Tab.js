/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderList from '../screens/Order/Index';
import Tables from '../screens/Table/Index';
import Users from '../screens/Users/Index';
import More from '../screens/More/Index';
import colors from '../utilities/colors';
import Icon2 from '../utilities/icons/tab2';
import Icon1 from '../utilities/icons/tab1';
import Icon4 from '../utilities/icons/tab4';
import Icon3 from '../utilities/icons/tab3';
import Index from '../screens/Home/Index';
import Products from '../screens/Home/Products';
import Icon5 from '../utilities/icons/tab5';
import OrderDetails from '../screens/Order/OrderDetails';
import Categories from '../screens/Home/Categories';
import Favourite from '../screens/Favourite/Index';

const screenOptions = {
  headerShown: false,
};
const Tab = createBottomTabNavigator();
const Home = createNativeStackNavigator();
function HomeStack() {
  return (
    <Home.Navigator>
       <Home.Screen options={screenOptions} name="Index" component={Index} />
      <Home.Screen options={screenOptions} name="Category" component={Categories} />
      <Home.Screen
        options={screenOptions}
        name="Products"
        component={Products}
      />
    </Home.Navigator>
  );
}
const Order = createNativeStackNavigator();
function OrderStack() {
  return (
    <Home.Navigator>
      <Home.Screen
        options={screenOptions}
        name="OrderList"
        component={OrderList}
      />
      <Home.Screen
        options={screenOptions}
        name="OrderDetails"
        component={OrderDetails}
      />
    </Home.Navigator>
  );
}
const App = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon5 color={focused ? colors.primary : colors.iconinactive} />
          ),
        }}
      />
       <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon3 color={focused ? colors.primary : colors.iconinactive} />
          ),
        }}
      />
        <Tab.Screen
        name="Cart"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon2 color={focused ? colors.primary : colors.iconinactive} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon1 color={focused ? colors.primary : colors.iconinactive} />
          ),
        }}
      />
      
      {/*  */}

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon4 color={focused ? colors.primary : colors.iconinactive} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
