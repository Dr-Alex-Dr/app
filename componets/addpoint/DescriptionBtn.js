import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput  } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';
import Fonts from '../fonts';

export default function DescriptionBtn({onchangetext}) {

    const [text, onChangeText] = React.useState("");

    return (
        <View style={styles.Btn}>
            <TextInput 
                multiline={true}  
                numberOfLines={4}
                style={{ paddingTop: 20}}
                onChangeText={onchangetext}
                placeholder="описание">
                
            </TextInput >
        </View>
    )
}

const styles = StyleSheet.create({
    BtnContainer: {
        marginTop: 20,
        
    },
    Btn: {  
        marginTop: 20,
        height: 210,   
        borderRadius: 24,
        paddingHorizontal: 28,   
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 3,
        backgroundColor: '#fff', 
        fontWeight: '600',
        textAlign: 'left',
        textAlignVertical: 'top'
       
       
       
       

    }
})