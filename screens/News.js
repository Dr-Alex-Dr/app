import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../componets/header';

const News = () => {
    return (
        <View style={styles.container}>
            <Header />
            <Text>Новости</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default News
