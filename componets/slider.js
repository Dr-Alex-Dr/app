import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text} from 'react-native';





export default function Slider({photos, deviceWidth, setShowSlider, setIndexSlide, setStartscrolSlider, setScroll}) {

   

    const [currentPage, setCurrentPage] = React.useState(0);
    

    

    const onAnimationEnd = (e) => {
        let offSetX = e.nativeEvent.contentOffset.x;
        // Рассчитываем номер текущей страницы
        let currentPage = offSetX / deviceWidth;
        // Перерисовываем UI
        setCurrentPage(currentPage);
        setIndexSlide(currentPage);
        
    }
    const showslider = () => {
        setStartscrolSlider(0);
        setScroll(false);
        setShowSlider(true);

    }
    
   
    const renderIndicator = () => {
        let itemAry = [];
        for(let i = 0; i < photos.length; i++) {
            itemAry.push(
                (<View key={i} style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#fff',
                    borderColor: '#66D133',
                    borderWidth: 1,
                    borderRadius: 50,
                    marginHorizontal: 2,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <View style={{width: 6, height: 6, backgroundColor: '#66D133', borderRadius: 50, display: (currentPage == i ? 'flex' : 'none')}}></View>
                </View>
                )
            )
        }
        return itemAry
    }

    return(
        <>
        <View style={styles.container}>      
            <ScrollView 
                horizontal={true}   // горизонтальное направление
                showsHorizontalScrollIndicator={false}  // скрываем индикатор уровня
                showsVerticalScrollIndicator={false}    // скрываем вертикальный индикатор
                pagingEnabled={true}    // Включаем функцию подкачки
                onMomentumScrollEnd={onAnimationEnd}   // Вызывается при прокрутке кадра
            >  
                {photos.map((dphoto, i) => {
                    return (
                        <TouchableOpacity onPress={showslider} activeOpacity={0.9} >
                            <View key={i + + Date.now()} style={{height: 240, width: deviceWidth }}>                 
                                <ImageBackground source={{ uri: dphoto.photo && dphoto.photo.uri }} style={styles.showPhoto}></ImageBackground> 
                            </View> 
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
        <View style={styles.indicator}>
            {renderIndicator()}
        </View>
        
       
        </>
    )
    
}

const styles = StyleSheet.create({    
    showPhoto: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    container: {
        width: '100%', 
        height: 240, 
        backgroundColor: '#000', 
        marginTop: 3,
        
    },
    indicator: {
        height: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
   
})