import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';
import Fonts from '../fonts';
import * as Location from 'expo-location';

export default function LocationBtn({setlocation}) {

    const [location, setLocation] = React.useState();
    const [errorMsg, setErrorMsg] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setlocation(location);
          })();
        }, []);
  
      let text = 'Waiting..';
      let latitude= 0;
      let longitude=0;
  
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
      }

    return (
        <TouchableOpacity style={styles.BtnContainer} activeOpacity={0.6} >
            <View style={styles.Btn}>
                {/* <Fonts active={true} style={{ fontFamily: 'Rbold', fontSize: 14, color: '#828282'}} text={'фотография'}></Fonts> */}
                <Text style={{fontSize: 14, color: '#828282', fontWeight: '600'}}>{latitude == 0 ? 'место  waiting...' : 'место     ' + latitude.toFixed(5) + '   ' +  longitude.toFixed(5)}</Text>
                <FontAwesome name="map-marker" size={25} color="#828282"/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    BtnContainer: {
        marginTop: 20
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