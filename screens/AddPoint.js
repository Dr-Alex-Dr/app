import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import CameraPic from '../componets/addpoint/CameraPic';
import { useNavigation } from '@react-navigation/native';

import PhotoBtn from '../componets/addpoint/PhotoBtn';
 
import {LinearGradient} from 'expo-linear-gradient';
import Slider from '../componets/slider';
import SliderFullScreen from '../componets/sliderFullScreen';
import LocationBtn from '../componets/addpoint/locationBtn';
import DescriptionBtn from '../componets/addpoint/DescriptionBtn';


let width = Dimensions.get('window').width;

const url = 'http://62.113.97.149:8080';
const AddPoint = ({route}) => {
    const navigation = useNavigation();
    const [startCamera, setStartCamera] = React.useState(false);
    const [photoCount, setPhotoCount] = React.useState(0);
    const [deletePhoto, setdeletePhoto] = React.useState([]);
    const [deviceWidth, setdeviceWidth] = React.useState(300);
    const [showSlider, setShowSlider] = React.useState(false);
    const [sliderIndex, setSliderIndex] = React.useState(0);
    const [location, setLocation] = React.useState();

    const [status, setStatus] = React.useState(false);

    const [text, onChangeText] = React.useState("");

    const [scroll, setScroll] = React.useState(true);
    const [startscrollSlider, setStartscrolSlider] = React.useState(1);

    const [btn_1, setBtn_1] = React.useState(false);
    const [btn_2, setBtn_2] = React.useState(false);
    const [btn_3, setBtn_3] = React.useState(false);

    const [sbtn_1, setSbtn_1] = React.useState(false);
    const [sbtn_2, setSbtn_2] = React.useState(false);
    const [sbtn_3, setSbtn_3] = React.useState(false);

    const __openCamera = () => {
        setStartCamera(!startCamera);
        setStartscrolSlider(0);
        setScroll(false);
        
    };
    const startSlider = () => {
        setScroll(true);
        setStartscrolSlider(1);
    };

    const descriptionBtn = () => {
        if (btn_1) return 1
        if (btn_2) return 2
        if (btn_3) return 3
    }

    

    const submit = () => {
        setStatus(true)
     

        let body = new FormData();
            // body.append('photo', photo);
            body.append('clear', 0);
            body.append('name', route.params.name);
            body.append('location', JSON.stringify(location));
            body.append('text', text);
            body.append('size', descriptionBtn());
            body.append('car', sbtn_1 ? 1 : 0);
            body.append('trash', sbtn_1 ? 1 : 0);
            body.append('anonim', sbtn_1 ? 1 : 0);
        
            deletePhoto.forEach((item) => {
                body.append('photo', {
                    uri: item.photo.uri,
                    type: 'image/jpeg',
                    name: item.photo.uri.split('/').pop().split(',')[0].replace("\"", ""),
                })
            })
        
        
      // fetch code
      
          
          
          fetch(`${url}/addpoint`, {
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
        <ScrollView scrollEnabled={scroll} contentOffset={{y: startscrollSlider}}>
        <View style={styles.container}>
             <View style={styles.wrapper}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>добавить точку</Text>
                    <TouchableOpacity style={styles.header} onPress={() => {navigation.goBack();}}>
                        <Text> Назад </Text>
                    </TouchableOpacity>
                </View>  
            </View>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={styles.gradient}></LinearGradient> 
            <Slider photos={deletePhoto} deviceWidth={deviceWidth} setShowSlider={setShowSlider} setIndexSlide={setSliderIndex} setStartscrolSlider={setStartscrolSlider} setScroll={setScroll}/> 
            <View style={styles.wrapper}>   
                <PhotoBtn setStartCamera={__openCamera} PhotoCount={photoCount} setScroll={setScroll}/>
                <LocationBtn setlocation={setLocation}/>
                <DescriptionBtn onchangetext={onChangeText} />
                
                <View style={styles.sizeTrashConatiner}>
                    <Text style={{textAlign: 'center', color: '#828282', fontWeight: '600'}}>размер свалки</Text>
                    <View style={styles.trashBtnContainer}>
                        <TouchableOpacity onPress={() => {setBtn_1(!btn_1), setBtn_2(false), setBtn_3(false)}} style={{width: width * 0.268,
                                height: width * 0.268,
                                backgroundColor: btn_1 ? ('#F9F9F9') : ('#fff'),
                                borderRadius: 100,
                                shadowColor: '#000',
                                shadowOpacity: 0.25,   
                                shadowOffset: {
                                width: 0,
                                height: 2
                                },
                                elevation: 3
                                }} activeOpacity={1}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {setBtn_2(!btn_2), setBtn_1(false), setBtn_3(false)}} style={{width: width * 0.268,
                                height: width * 0.268,
                                backgroundColor: btn_2 ? ('#F9F9F9') : ('#fff'),
                                borderRadius: 100,
                                shadowColor: '#000',
                                shadowOpacity: 0.25,   
                                shadowOffset: {
                                width: 0,
                                height: 2,
                                },
                                elevation: 3}} activeOpacity={1}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {setBtn_3(!btn_3), setBtn_1(false), setBtn_2(false)}} style={{width: width * 0.268,
                                height: width * 0.268,
                                backgroundColor: btn_3 ? ('#F9F9F9') : ('#fff'),
                                borderRadius: 100,
                                shadowColor: '#000',
                                shadowOpacity: 0.25,   
                                shadowOffset: {
                                width: 0,
                                height: 2
                                },
                                elevation: 3}} activeOpacity={1}></TouchableOpacity>
                    </View>
                </View>
              
                <View style={styles.settingContainer}>
                    <Text style={{textAlign: 'center', color: '#828282', fontWeight: '600'}}>настройки</Text> 
                    <View style={styles.settingWrapper}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {setSbtn_1(!sbtn_1)}} style={styles.settingItem}>
                            <Text style={{color: '#333', fontWeight: '600'}}>доступна на машине</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[sbtn_1 ? '#4EE853' : '#D2D2D2', sbtn_1 ? '#20A824' : '#F2F2F2']} style={{
                                width: 50,
                                height: 28,
                                borderRadius: 14,  
                                justifyContent: 'center',
                                alignItems: sbtn_1 ? ('flex-end') : ('flex-start'),
                                paddingRight: 2,
                                paddingLeft: 2                         
                            }}>
                                <View style={{width: 23, height: 23, borderRadius: 100, backgroundColor: '#fff'}}></View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {setSbtn_2(!sbtn_2)}} style={styles.settingItem}>
                            <Text style={{color: '#333', fontWeight: '600'}}>не для общей уборки</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[sbtn_2 ? '#4EE853' : '#D2D2D2', sbtn_2 ? '#20A824' : '#F2F2F2']} style={{
                                width: 50,
                                height: 28,
                                borderRadius: 14,  
                                justifyContent: 'center',
                                alignItems: sbtn_2 ? ('flex-end') : ('flex-start'),
                                paddingRight: 2,
                                paddingLeft: 2                         
                            }}>
                                <View style={{width: 23, height: 23, borderRadius: 100, backgroundColor: '#fff'}}></View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {setSbtn_3(!sbtn_3)}} style={styles.settingItem}>
                            <Text style={{color: '#333', fontWeight: '600'}}>отправить анонимно</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[sbtn_3 ? '#4EE853' : '#D2D2D2', sbtn_3 ? '#20A824' : '#F2F2F2']} style={{
                                width: 50,
                                height: 28,
                                borderRadius: 14,  
                                justifyContent: 'center',
                                alignItems: sbtn_3 ? ('flex-end') : ('flex-start'),
                                paddingRight: 2,
                                paddingLeft: 2                         
                            }}>
                                <View style={{width: 23, height: 23, borderRadius: 100, backgroundColor: '#fff'}}></View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={status == false ? submit : () => {}} style={styles.addBtn} activeOpacity={0.8}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 26,
                        alignItems: 'center',
                        justifyContent: 'center'
                        
                    }}>
                        <Text style={{fontWeight: '600', color: '#fff', fontSize: 20}}>добавить</Text>
                    </LinearGradient>
                    
                </TouchableOpacity>
               
            </View>
            <CameraPic pressBtnCamera={startCamera} setpressBtnCamera={__openCamera} setPhotoCount={setPhotoCount} setPhotos={setdeletePhoto} setdeviceWidth={setdeviceWidth} setSlider={startSlider}/>
            {showSlider ? <SliderFullScreen photos={deletePhoto} deviceWidth={deviceWidth} setShowSlider={setShowSlider} indexSlide={sliderIndex} setStartscrolSlider={setStartscrolSlider} setScroll={setScroll}/> : <></>}
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff' ,       
    },
    wrapper: {
        paddingHorizontal: 10
    },  
    headerContainer: {
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
    header: {
         
    },
    gradient: {
        width: '100%',
        height: 3,
        flex: 1,
        position: 'absolute',
        top: 75,
        left: 0
    },
    sizeTrashConatiner: {
        justifyContent: 'center',
        marginTop: 50
    },
    ButtonContainer: {
        justifyContent: 'space-between',
        marginTop: 20
    },
    TrashButton: {
        width: width * 0.268,
        height: width * 0.268,
        backgroundColor: '#fff',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
    },
    trashBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
        marginBottom: 90
    },
    settingContainer: {
        flexDirection: 'column'
    },
    settingWrapper: {
        flexDirection: 'column',
        marginTop: 22,
        marginBottom: 45
    },
    settingItem: {
        height: 61,   
        borderRadius: 17,
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
        marginBottom: 8

        
    },
    addBtn: {
        width: '100%',
        height: 68,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
    }

})

export default AddPoint
