import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



let height = Dimensions.get('window').height;
const StartCleaning = ({route}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
    <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.wrapper}>
            <View style={styles.header}> 
            <Text style={{color: '#1D1D1D', fontSize: 20, fontWeight: '600'}}>участники группы:</Text>
                <TouchableOpacity onPress={() => {navigation.goBack();}}>
                    <Text style={{fontSize: 15}}>Назад</Text>
                </TouchableOpacity>
                
            </View>
            <Text style={styles.status}>руководитель</Text>
            <View style={styles.adminItem}>
                <Text style={{fontSize: 25, }}>{route.params.name == '' ? 'Alex' : route.params.name}</Text>
                <Text style={{color: '#2FC934', marginTop: 15}}>+25 баллов за уборку</Text>
            </View>
            <Text style={styles.status}>участники</Text>
            <View style={styles.userItem}></View>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
            width: '100%',
            height: 70,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
            
                        
                    }}>
            <TouchableOpacity onPress={() => navigation.navigate('StopCleaning', {id: route.params.id})} style={{backgroundColor: '#fff', width: '98%', height: '90%', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, color: '#828282', fontWeight: '300'}}>старт</Text>
            </TouchableOpacity>
                          
                        
                    </LinearGradient>
        </View>
        
        
    </ScrollView>
    </View>
    )
}

export default StartCleaning;

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        
      },
    wrapper: {
        paddingHorizontal: 20,
        marginTop: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 35
        
    },
    adminItem: {
        height: 90,   
        borderRadius: 17,
        paddingHorizontal: 18,
        paddingVertical: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        backgroundColor: '#fff',
        marginBottom: 8,
        marginBottom: 25
    },
    status: {
        fontSize: 13,
        color: '#828282',
        marginLeft: 14,
        marginBottom: 10
    },
    userItem: {
        minHeight: height / 2.17
    }

})