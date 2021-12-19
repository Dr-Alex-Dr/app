import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import Header from '../componets/header';
import SvgUri from "expo-svg-uri";

const Account = () => {
    const isFocused = useIsFocused();
    return (
        <View style={styles.container}>
            <Header />
            <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
})

export default Account
