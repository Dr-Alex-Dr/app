import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {LinearGradient} from 'expo-linear-gradient';

import News from '../screens/News';
import Map from '../screens/Map';
import Account from '../screens/Account';

import AddPoint from '../screens/AddPoint';
import Point from '../screens/Point';

import StartCleaning from '../screens/StartCleaning';
import StopCleaning from '../screens/StopCleaning';

import Fonts from '../componets/fonts';

// icons
import CardIcon from './../assets/tabs/card';
import MapIcon from './../assets/tabs/map';
import AccountIcon from '../assets/tabs/account';





const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const StackNavigator = ({username}) => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false, cardStyle: { backgroundColor: '#FFFFFF' }}}>
      <Stack.Screen name="home" component={AppNavigator}/>
      <Stack.Screen name="AddPoint" component={AddPoint} initialParams={{name: username}}/>
      <Stack.Screen name="Point" component={Point} />
      <Stack.Screen name="StartCleaning" component={StartCleaning} initialParams={{name: username}}/>
      <Stack.Screen name="StopCleaning" component={StopCleaning} initialParams={{name: username}}/>
    </Stack.Navigator>
  )
}


const AppNavigator = () => {
    
    return (
      <Tab.Navigator 
      initialRouteName={"Map"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          boder: 'none',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          position: 'absolute',
          bottom: 10,
          marginHorizontal: '3.5%',
          height: 70,
          borderRadius: 35,
          paddingHorizontal: 10,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: 0
          },
          elevation: 3
          

           },
           tabBarBackground: () => (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4EE853', '#0C8146']} style={{
              height: '50%',
              borderRadius: 35,
              flex: 1,
              backgroundColor: 'transparent'
            }}/>
          ),
      }}
      > 
        <Tab.Screen
          name="News"
          component={News}
          options={({ navigation }) => ({
            title: () => (<Fonts  active={navigation.isFocused()} style={{ fontFamily: 'Rbold', fontSize: 12, color: '#fff', marginBottom: 12, marginTop: -12, letterSpacing: 0.3  }} text='достижения'></Fonts>),
            tabBarIcon: () => (
              <CardIcon />
            ),         
          })}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={({ navigation }) => ({
            title: () => (<Fonts  active={navigation.isFocused()} style={{ fontFamily: 'Rbold', fontSize: 12, color: '#fff', marginBottom: 12, marginTop: -12, letterSpacing: 0.3  }} text='карта'></Fonts>),
            tabBarIcon: () => (
              <MapIcon />
            ),         
          })}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={({ navigation }) => ({
            title: () => (<Fonts  active={navigation.isFocused()} style={{ fontFamily: 'Rbold', fontSize: 12, color: '#fff', marginBottom: 12, marginTop: -12, letterSpacing: 0.3  }} text='аккаунт'></Fonts>),
            tabBarIcon: () => (
              <AccountIcon />
            ),         
          })}
          
        />
       
        

      </Tab.Navigator>
    );
  }


export default StackNavigator;