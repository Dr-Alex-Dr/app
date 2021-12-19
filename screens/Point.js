import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import Header from '../componets/header';
import { useNavigation } from '@react-navigation/native';
import Slider from '../componets/slider';
import SliderFullScreen from '../componets/sliderFullScreen';
import {LinearGradient} from 'expo-linear-gradient';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


let photos = require('../assets/json/photo.json');

const Point = ({route}) => {
    // let photos = JSON.parse(route.params.photos);

    const navigation = useNavigation();

    const [showSlider, setShowSlider] = React.useState(false);
    const [sliderIndex, setSliderIndex] = React.useState(0);
    const [startscrollSlider, setStartscrolSlider] = React.useState(1);
    const [scroll, setScroll] = React.useState(true);


    
    return (
        <ScrollView contentContainerStyle={styles.infoContainer} scrollEnabled={scroll} contentOffset={{y: startscrollSlider}}>
         
         <View style={styles.headerContainer}>
            <Text style={styles.headerText}>свалка</Text>
            <TouchableOpacity style={styles.header} onPress={() => {navigation.goBack();}}>
                <Text> Назад </Text>
            </TouchableOpacity>
          </View>  
          
          
          <Slider 
            photos={photos} 
            deviceWidth={width} 
            setShowSlider={setShowSlider} 
            setIndexSlide={setSliderIndex} 
            setStartscrolSlider={setStartscrolSlider} 
            setScroll={setScroll}/> 

             
            
            <View style={styles.wrapper}>
              <View style={styles.status}>
                {/* <Text>{route.params.photos}</Text> */}
                <Text style={{marginBottom: 5, fontWeight: '500', fontSize: 15}}>{route.params.clear == 0 ? "Не убрано" : "Убрано"}</Text>
                <Text style={{fontSize: 14, color: '#828282', display: route.params.clear == 0 ? "none" : "block"}}>12.11.2021</Text>
                <Image style={{position: 'absolute', left: -10, bottom: -10, transform: [{ scale: 0.7 }]}} source={route.params.clear == 0 ? require('../assets/map/R_status-2.png') : require('../assets/map/G_status-2.png')}/>
              </View>
              
              <View style={styles.present}>
                <View style={styles.presentName}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -8}}>
                    <Image source={route.params.clear == 0 ? require('../assets/map/R_status-1.png') : require('../assets/map/G_status-1.png')}/>
                    <Text style={{fontSize: 18, marginLeft: 5}}>{route.params.name}</Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 15, color: route.params.clear == 0 ? '#f32020' : '#2FC934'}}>{route.params.clear == 0 ? "сделал снимок" : "убрал"}</Text>
                    <Text style={{fontSize: 11, color: '#828282'}}>{route.params.date}</Text>
                  </View>
                </View>
                <View style={{marginBottom: 35}}>
                  <Text style={{fontSize: 13, marginLeft: 10, marginTop: 12, marginBottom: 10, fontWeight: '600', color: '#828282'}}>награда</Text>
                  <Text style={{fontSize: 16, fontWeight: '700', color: '#F9BF32'}}>
                    +125
                    {/* <Image source={}/> */}
                  </Text>

                </View>
              </View>
              
              <View style={styles.description}>
                <Text style={{fontSize: 15, fontWeight: '600', color: '#1D1D1D', marginTop: 12, marginLeft: 12}}>описание</Text>
                <Text style={{marginTop: 16, marginBottom: 30}}>{route.params.text}</Text>
              </View>

            <View style={{marginTop: 45, marginBottom: 25}}>
            <Text style={{textAlign: 'center', marginBottom: 20}}>размер свалки</Text>
              <View style={styles.sizeContainer}>
                <View style={{
                  width: width * 0.268,
                  height: width * 0.268,
                  backgroundColor: route.params.size == 1 ? "#F2F2F2" : "#fff",
                  borderRadius: 100,
                  shadowColor: '#000',
                  shadowOpacity: 0.25,   
                  shadowOffset: {
                  width: 0,
                  height: 2,
                  
                  }}}>
                </View>
                <View style={{
                  width: width * 0.268,
                  height: width * 0.268,
                  backgroundColor: route.params.size == 2 ? "#F2F2F2" : "#fff",
                  borderRadius: 100,
                  shadowColor: '#000',
                  shadowOpacity: 0.25,   
                  shadowOffset: {
                  width: 0,
                  height: 2
                  }}}>
                </View>
                <View style={{
                  width: width * 0.268,
                  height: width * 0.268,
                  backgroundColor: route.params.size == 3 ? "#F2F2F2" : "#fff",
                  borderRadius: 100,
                  shadowColor: '#000',
                  shadowOpacity: 0.25,   
                  shadowOffset: {
                  width: 0,
                  height: 2
                  }}}>
                </View>
                
              </View>
            </View>

            <View style={[styles.settingItem, {display: route.params.car == 0 ? "none" : "block"}]}>
              <Text style={{color: '#333', fontWeight: '600'}}>доступна на машине</Text>
            </View>
            <View style={[styles.settingItem, {display: route.params.trash == 0 ? "none" : "block"}]}>
              <Text style={{color: '#333', fontWeight: '600'}}>не для общей уборки</Text>
            </View>
            <View style={[styles.settingItem, {display: route.params.anonim == 0 ? "none" : "block"}]}>
              <Text style={{color: '#333', fontWeight: '600'}}>отправить анонимно</Text>
            </View>
              
              
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
                        width: '100%',
                        height: 70,
                        borderRadius: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        marginBottom: 30,
                        display: route.params.clear == 0 ? 'flex' : 'none'

                        
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('StartCleaning', {id: route.params.id})} style={{backgroundColor: '#fff', width: '98%', height: '90%', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 22, color: '#828282', fontWeight: '300'}}>начать уборку</Text>
                        </TouchableOpacity>
                          
                        
              </LinearGradient>
            </View>

            {showSlider ? <SliderFullScreen 
             photos={photos} 
             deviceWidth={width} 
             setShowSlider={setShowSlider} 
             indexSlide={sliderIndex} 
             setStartscrolSlider={setStartscrolSlider} 
             setScroll={setScroll}/> : <></>}
        </ScrollView>
    )
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
      headerContainer: {
        paddingHorizontal: 20,
        width: '100%', 
        height: 60,
        backgroundColor: '#fff',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#1D1D1D',
        fontSize: 19,
        fontWeight: '600'
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
        backgroundColor: '#fff'
    
      },
      Gnext: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 45,
        marginBottom: 15,
        
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
        marginTop: 35,
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
        marginTop: 20,
        
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
        marginTop: 20,
   
      },
      sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },  
      settingItem: {
        height: 61,   
        borderRadius: 17,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        backgroundColor: '#fff',
        marginBottom: 8,
        marginTop: 5

        
    },
})

export default Point
