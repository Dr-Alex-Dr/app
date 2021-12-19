import React from "react";
import { View, Image, Text, StyleSheet, Button, TouchableNativeFeedback } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from "./fonts";
import { useNavigation } from '@react-navigation/native';
import SvgUri from "expo-svg-uri";


export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            paddingTop: 10,
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',

            
        }}>
            <Image 
                style={{width: 110, height: 27, marginLeft: 20}}
                source={require('./../assets/header/logo_color.png')}/>
           
            <View style={{
                    paddingHorizontal: 22,
                    paddingVertical: 14,
            }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('AddPoint')} >          
                <View style={{
                    height: 33, 
                    width: 172,
                   
                }}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 14,
                        flex: 1,
                    }}>
                        <Image 
                            style={{width: 21, height: 21, position: 'absolute', bottom: 7, left: 7}}
                            source={require('./../assets/header/plus.png')}
                        />
                        <Fonts active={true} style={{ fontFamily: 'Sui', fontSize: 14, color: '#fff', marginLeft: 35, marginTop: 2 }} text='добавить точку'></Fonts>
                        </LinearGradient>
                    
                </View>
            </TouchableNativeFeedback>
            </View> 
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
            width: '100%',
            height: 3,
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0
        }}></LinearGradient> 
        </View>
    )
}