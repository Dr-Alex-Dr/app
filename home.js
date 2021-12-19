import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

export default function Home() {
    return (
        <View style={{
            height: '100%',
            width: '100%'
        }} classNane="home">
            <View>
            <Text style={{
                fontSize: 20,
                position: 'absolute',
                top: 50
            }}> save-world</Text>
            <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ 
              width: 200, 
              height: 200,
              marginTop: 100
             }}
        />
            </View>
        </View>
    )
}