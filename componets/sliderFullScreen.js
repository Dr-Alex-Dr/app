import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground, Text, TouchableOpacity, Dimensions} from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';


let height = Dimensions.get('window').height;
export default function SliderFullScreen({photos, deviceWidth, setShowSlider, indexSlide, setStartscrolSlider, setScroll}) {
    const showslider = () => {
        setStartscrolSlider(1);
        setScroll(true);
        setShowSlider(false);
    }
    const __deletePhoto = () => {
        
    }
   
    return (
        <View style={styles.container}>      
            <ScrollView 
                horizontal={true}   // горизонтальное направление
                showsHorizontalScrollIndicator={false}  // скрываем индикатор уровня
                showsVerticalScrollIndicator={false}    // скрываем вертикальный индикатор
                pagingEnabled={true}    // Включаем функцию подкачки
                contentOffset={{x: deviceWidth*indexSlide}}
            >  
                {photos.map(dphoto => {
                    return (
                        <View key={dphoto.id + Date.now()} style={{height: '100%', width: deviceWidth,  }}>                 
                            <ImageBackground source={{ uri: dphoto.photo && dphoto.photo.uri }} style={styles.showPhoto}></ImageBackground> 
                        </View> 
                    )
                })}
            </ScrollView>

            <TouchableOpacity onPress={showslider} style={{ position: 'absolute', bottom: 35, left: 30}}>
                <Text style={{color: '#fff', fontSize: 15}}>назад</Text>

            </TouchableOpacity>
            
            
              
        </View>
    )
}

const styles = StyleSheet.create({    
    showPhoto: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: height
    },
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000', 
        paddingBottom: 90,
        paddingTop: 70,
        maxHeight: height
    },
})