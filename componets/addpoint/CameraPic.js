import React, {useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, ScrollView, Dimensions, TextInput} from 'react-native';
import {Camera} from 'expo-camera';
import { FontAwesome  } from '@expo/vector-icons';



let camera;

let height = Dimensions.get('window').height;
export default function CameraPic({pressBtnCamera, setpressBtnCamera, setPhotoCount, setPhotos, setdeviceWidth, setSlider}) {

const [startCamera, setStartCamera] = React.useState(false);
const [previewVisible, setPreviewVisible] = React.useState(false);
const [capturedImage, setCapturedImage] = React.useState(null);
const [showPhoto, setShowPhoto] = React.useState('none');
const [deletePhoto, setdeletePhoto] = React.useState([]);

  useEffect(() => {
    setPhotos(deletePhoto);
  })

  let photo;
 

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  }

  const __stopCamera = () => {
    setStartCamera(false);
    setCapturedImage(null);
    setPreviewVisible(false);
    setpressBtnCamera(false);
    setSlider();
  }
  
  const __takePicture = async () => {
    photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  }
  const __savePhoto = (photo)  => {  
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();   
    

     setdeletePhoto(prev => {
       return [...prev, {
         id: Date.now().toString(),
         photo: photo,
       }];
       
     });
     
     __photoCount(1);
    
    setdeviceWidth(Dimensions.get('window').width);
  }
  
  const __showPhoto = () => {  
    showPhoto == 'none' ? setShowPhoto('block') : setShowPhoto('none');
  }
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  }
  const __deletePhoto = id => {
    setdeletePhoto(prev => prev.filter(photo => photo.id !== id));
    __photoCount(-1);
  }
  const __photoCount = (index) => {
    setPhotoCount(deletePhoto.length + index);
    
  }

 

if (pressBtnCamera) {
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.CameraSize}>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <>
            
            <View style={styles.BottomTools}>          
                <View style={styles.BottomToolsFocusContainer}>
                  <TouchableOpacity onPress={__takePicture} style={styles.BotomToolsFocus} />
                  <TouchableOpacity onPress={__stopCamera} style={styles.BottomToolsStop}> 
                    <Text style={styles.BottomToolsStopText}>отмена</Text>               
                  </TouchableOpacity>
                </View>
              </View>
              <Camera style={styles.CameraScreen} ref={(r) => { camera = r; } }>
                
              
              </Camera>
              {showPhoto == 'block' ? (
                <View style={styles.BottomShowPhotoConBlock}>
                  <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false} 
                    style={{ transform: [{ scaleX: -1 }], paddingRight: 20 }}>
                   
                    {deletePhoto.map(dphoto => {
                      return (
                        <View key={dphoto.id} style={styles.PrevShowPhotoContainer}>      
                          <ImageBackground source={{ uri: dphoto.photo && dphoto.photo.uri }} style={styles.PrevShowPhoto}>    
                          <View style={{position: 'absolute', width: 30, height: 25, right: 0, top: 5}}>
                          <FontAwesome.Button name="trash" onPress={() => {__deletePhoto(dphoto.id)}} backgroundColor="none" height={25} size={25} iconStyle={{position: 'absolute', left: 5}}/>
                            </View>     
                            
                          </ImageBackground> 
                        </View> 
                      )
                    })}
                  
                      </ScrollView >
                  </View>
                  ) : (<></>)}
                  {deletePhoto.length ? (
                  <TouchableOpacity
                  onPress={__showPhoto}
                  style={styles.BotomToolsPlus}>
                    <Text style={{color: '#fff', position: 'absolute', right: 10.5, bottom: 4, fontSize: 15}}>{deletePhoto.length}</Text>           
                  </TouchableOpacity>) : (<></>)}
                  
                  </>

          )}
        </View>
      ) : (
// btn
          setStartCamera(true)

      )}

    </View>
  )
  } else {
    return null;
  }
}

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  const pressHandler = () => {
    savePhoto(photo);
    
  }

  return (
    <>
      <View style={styles.ImgBackContainer}>
        <ImageBackground source={{ uri: photo && photo.uri }} style={styles.ImgBack}></ImageBackground>
      </View>
      <View style={styles.PrevToolsContainer}>

        <TouchableOpacity onPress={retakePicture} style={styles.PrevbBtn}>
          <Text style={styles.PrevBtnText}>Re-take</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pressHandler} style={styles.PrevbBtn}>
          <Text style={styles.PrevBtnText}>save</Text>
        </TouchableOpacity>
        
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center', 
    maxHeight: height
  },
  CameraSize: {
    flex: 1,
    width: '100%',
    paddingBottom: 90,
    paddingTop: 70,
    backgroundColor: '#000'  
  },
  CameraScreen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  BottomTools: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 0,
    justifyContent: 'space-between'
  },
  BottomToolsFocusContainer: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  BotomToolsFocus: {
    width: 65,
    height: 65,
    bottom: 10,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  BotomToolsPlus: {
    width: 35,
    height: 35,
    bottom: 25,
    right: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  BottomToolsStop: {
    position: 'absolute',
    left: 25,
    bottom: 35
  },
  BottomToolsStopText: {
    color: '#fff', 
    fontSize: 15
  },
  BottomShowPhotoConBlock: {
    
    position: 'absolute', 
    right: 0,
    paddingRight: 4,
    bottom: 105,
    flexDirection: 'row',
    justifyContent: 'flex-start',
   
    
  },
  BottomShowPhotoConNone: {
    display: 'none'
  },
  BottomShowPhoto: {
    width: 120, 
    height: 120, 
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#000',
    marginLeft: 9,
  },
  ImgBackContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  ImgBack: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  PrevToolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    position: 'absolute',     
    left: 0,
    right: 0,
    bottom: 20
  },
  PrevbBtn: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  PrevBtnText: {
    color: '#fff',
    fontSize: 17
  },
  PrevShowPhotoContainer: {
    width: 120, 
    height: 120, 
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#000',
    marginRight: 10,
    transform: [{ scaleX: -1 }]
    
  },
  PrevShowPhoto: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

})

 





