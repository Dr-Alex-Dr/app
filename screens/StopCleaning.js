import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Slider from '../componets/slider';
import SliderFullScreen from '../componets/sliderFullScreen';

import CameraPic from '../componets/addpoint/CameraPic';
import PhotoBtn from '../componets/addpoint/PhotoBtn';

let photos = require('../assets/json/photo.json');
let width = Dimensions.get('window').width;

const url = 'http://62.113.97.149:8080';
function StopCleaning({route}) {
    const [showSlider, setShowSlider] = React.useState(false);
    const [sliderIndex, setSliderIndex] = React.useState(0);
    const [startscrollSlider, setStartscrolSlider] = React.useState(1);
    const [scroll, setScroll] = React.useState(true);

    // camera
    const [startCamera, setStartCamera] = React.useState(false);
    const [photoCount, setPhotoCount] = React.useState(0);
    const [deletePhoto, setdeletePhoto] = React.useState([]);
    const [deviceWidth, setdeviceWidth] = React.useState(300);

    const [status, setStatus] = React.useState(false);

    const navigation = useNavigation();
    

    const __openCamera = () => {
        setStartCamera(!startCamera);
        setStartscrolSlider(0);
        setScroll(false);      
    };
    const startSlider = () => {
        setScroll(true);
        setStartscrolSlider(1);
    };
    const stop = () => {
        if (deletePhoto.length == 0) {
            Alert.alert('', 'добавьте несколько фото', [
                {
                  text: 'Cancel',            
                  style: 'cancel',
                  onPress: () => navigation.navigate('Map')
                },
                { text: 'OK', },
              ]);
        } else {
            submit();
        }
    }

    const submit = () => {
        setStatus(true);
     

        let body = new FormData();
            // body.append('photo', photo);
            body.append('id', route.params.id);
            body.append('clear', 1);
            body.append('name', route.params.name);

            deletePhoto.forEach((item) => {
                body.append('photo', {
                    uri: item.photo.uri,
                    type: 'image/jpeg',
                    name: item.photo.uri.split('/').pop().split(',')[0].replace("\"", ""),
                })
            })
        
        
      // fetch code
      
          
          
          fetch(`${url}/removepoint`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            },
            body: body,  
          }).then(res => {
              if (res.status == 200) 
              {
                setStatus(false);
                navigation.goBack();
              }
        })
    }

    
    return (
        <View style={styles.container}> 
        <Text style={styles.headerText}>уборка начата</Text> 
         
        <Slider 
            photos={deletePhoto} 
            deviceWidth={width} 
            setShowSlider={setShowSlider} 
            setIndexSlide={setSliderIndex} 
            setStartscrolSlider={setStartscrolSlider} 
            setScroll={setScroll}/>       
            <View style={styles.wrapper}>       
                <PhotoBtn setStartCamera={__openCamera} PhotoCount={photoCount} setScroll={setScroll}/>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
            width: '100%',
            height: 70,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50%',
            marginBottom: 30,
            
                        
                    }}>
            <TouchableOpacity onPress={stop} style={{backgroundColor: '#fff', width: '98%', height: '90%', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, color: '#828282', fontWeight: '300'}}>остановить</Text>
            </TouchableOpacity>
                          
                        
                    </LinearGradient>
            </View> 

            <CameraPic 
                pressBtnCamera={startCamera} 
                setpressBtnCamera={__openCamera} 
                setPhotoCount={setPhotoCount} 
                setPhotos={setdeletePhoto} 
                setdeviceWidth={setdeviceWidth} 
                setSlider={startSlider}/>

            {showSlider ? <SliderFullScreen  
                photos={deletePhoto} 
                deviceWidth={width} 
                setShowSlider={setShowSlider} 
                indexSlide={sliderIndex} 
                setStartscrolSlider={setStartscrolSlider} 
                setScroll={setScroll}/> : <></>}

        </View>
    )
}

export default StopCleaning;

const styles = StyleSheet.create({
    container: {  
        flex: 1,   
        backgroundColor: '#fff'   
      },
    wrapper: {
        paddingHorizontal: 20,
        
    },
    headerText: {
        color: '#1D1D1D', 
        fontSize: 20, 
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 35,
        marginBottom: 15
    }
   

})