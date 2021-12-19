import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import StackNavigator from './navigation/AppNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPoint from './screens/AddPoint';
import Registration from './screens/registration';


export default function App() {

  const [showRegistr, setShowRegistr] = React.useState(false);
  const [username, setuserName] = React.useState('');
  
  return (  
    <> 
    {showRegistr ? <Registration setShowRegistr={setShowRegistr} setuserName={setuserName}/> : 
    (
      <NavigationContainer >
        <StackNavigator username={username}/>
      </NavigationContainer>
    )}
    
      
      
    </>
  );
}

