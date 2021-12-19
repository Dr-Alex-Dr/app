import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';
import Fonts from '../fonts';

export default function PhotoBtn({setStartCamera, PhotoCount}) {
    return (
        <TouchableOpacity onPress={setStartCamera} style={styles.BtnContainer} activeOpacity={0.6} >
            <View style={styles.Btn}>
                {/* <Fonts active={true} style={{ fontFamily: 'Rbold', fontSize: 14, color: '#828282'}} text={'фотография'}></Fonts> */}
                <Text style={{fontSize: 14, color: '#828282', fontWeight: '600'}}>{'фотография   №' + PhotoCount }</Text>
                <FontAwesome name="folder" size={25} color="#828282"/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    BtnContainer: {
        marginTop: 50
    },
    Btn: {  
        height: 65,   
        borderRadius: 43,
        paddingHorizontal: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 3,
        backgroundColor: '#fff',
        marginTop: 0

        
        

    }
})