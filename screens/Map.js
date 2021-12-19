import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import Header from '../componets/header';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


function Map() {
  const navigation = useNavigation();

  const [location, setLocation] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState(0);
  const [jsonRes, setjsonRes] = React.useState([]);
  const [statusServer, setStatusServer] = React.useState(false);
  const [renderStart, setRenderStart] = React.useState(true);

  React.useEffect(() => {
    getPoint();
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  function getPoint() {
    let body = {
      get: 'true'
    };

    fetch('http://62.113.97.149:8080/addpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(res => { 
      setjsonRes(res.json()); 
      setStatusServer(true); 
      setRenderStart(true); 
    });
  }


  function renderMap() {
   
    return (
      <>
        {statusServer, jsonRes._W != null ? jsonRes._W.map((item) => {
          
          return (
            <Marker 
              key={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              image={item.clear == 0 ? require('../assets/map/R_marker-3.png') : require('../assets/map/G_marker-3.png')}
              onPress={() => navigation.navigate('Point',
                {
                  name: item.name,
                  clear: item.clear,
                  size: item.size,
                  car: item.car,
                  trash: item.trash,
                  anonim: item.anonim,
                  text: item.text,
                  date: item.date,
                  id: item.id,
                  
                })} />
          );
        }) : <View></View>}
      </>
    );
  }


  let latitude = 57;
  let longitude = 61;

  if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  return (
    <ScrollView scrollEnabled={false} >
      <View style={styles.container}>
        <Header />
      </View>
      
      <MapView style={styles.map} region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
        {renderStart == true ? renderMap() : () => {}}
        {/* <TouchableOpacity onPress={() => {renderMap(); getPoint()}} style={styles.update}></TouchableOpacity> */}
      </MapView>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {  
      width: '100%',
      height: 71,
      alignItems: 'center',
      justifyContent: 'center'
    },
    wrapper: {
      paddingHorizontal: 20
    },  
    map: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: width,
      height: height
    },
    infoContainer: {
      marginBottom: 100,
  
    },
    Gnext: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 45,
      marginBottom: 15
    },
    status: {
      height: 75,   
      borderRadius: 17,
      paddingHorizontal: 28,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 80,
      shadowColor: '#000',
      shadowOpacity: 0.25,   
      shadowOffset: {
        width: 0,
        height: 2
      },
      backgroundColor: '#fff',
      marginTop: 25,
    },
    present: {
       
      borderRadius: 17,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOpacity: 0.25,   
      shadowOffset: {
        width: 0,
        height: 2
      },
      backgroundColor: '#fff',
      marginTop: 25,
      
    },
    presentName: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: '#1C1C1C',
      height: 65
    },
    description: {
      borderRadius: 17,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOpacity: 0.25,   
      shadowOffset: {
        width: 0,
        height: 2
      },
      backgroundColor: '#fff',
      marginTop: 25,
 
    },
    sizeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },  
    size: {
      width: width * 0.268,
      height: width * 0.268,
      backgroundColor: '#fff',
      borderRadius: 100,
      shadowColor: '#000',
      shadowOpacity: 0.25,   
      shadowOffset: {
      width: 0,
      height: 2
      }
    },
    update: {
      width: 35,
      height: 35,
      backgroundColor: 'red',
      position: 'absolute',
      top: 80,
      left: 10
    }


})

export default Map


