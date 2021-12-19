import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function Fonts(props) {
  const [loaded] = useFonts({
    Rbold: require('./../assets/fonts/Raleway-Bold.ttf'),
    Sui: require('./../assets/fonts/SegoeUI.ttf')
  });
  
  if (!loaded) {
    return null;
  }

  if (props.active) {
    return ( 
      <Text style={props.style}>{props.text}</Text>  
  );
  } else {
    return null
  }

  
}


