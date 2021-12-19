import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const url = 'http://62.113.97.149:8080';

const Registration = ({setShowRegistr, setuserName}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    

   

    

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

   

    const onLoggedIn = token => {
        fetch(`${url}/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
              
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                    setuserName(jsonRes.user.name);
                    setMessage("here is your rescurce");
                    setShowRegistr(false);
                }
               
                if (res.status === 500) {
                    isError(true);
                    setMessage("incorrect login or password");
                }
                
                
               
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
            
        });
    }

    const onSubmitHandler = () => {
        const body = {
            email,
            name,
            password,
        };
        fetch(`${url}/${isLogin ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                setMessage(res.status);
                if (res.status == 422) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                    
                }
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                if (res.status == 202) {
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
                    
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                    
                }
                
                
            } catch (err) {
                console.log(err);
                
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    
    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Image/>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                    

                    {isLogin ? (
                        <View style={styles.inputBtnContainer}>
                            <TouchableOpacity onPress={onSubmitHandler} style={styles.button} >
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 26,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                    
                                }}>
                                    <Text style={{fontWeight: '600', color: '#fff', fontSize: 20}}>Войти</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.inputBottomText}>У вас еще нет аккаунт?</Text>
                                <TouchableOpacity onPress={onChangeHandler}>
                                    <Text style={styles.inputData}>Зарегестрируйтесь</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        
                    ) : (
                        <View style={styles.inputBtnContainer}>
                            <TouchableOpacity onPress={onSubmitHandler} style={styles.button} >
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2FC934', '#2FC733', '#18651A']} style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 26,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                    
                                }}>
                                    <Text style={{fontWeight: '600', color: '#fff', fontSize: 20}}>Зарегестрироваться</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.inputBottomText}>У вас уже есть аккаунт?</Text>
                                <TouchableOpacity onPress={onChangeHandler}>
                                    <Text style={styles.inputData}>Войти</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    )}      
                </View>
            </View>
        </View>
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
        
    },
    card: {
        flex: 1,
        width: '90%',
        marginTop: '50%',
        maxHeight: 350,
        paddingBottom: '20%',
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputs: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        height: 65,   
        borderRadius: 50,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingLeft: 20
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    inputBtnContainer: {
        flexDirection: 'column'
    },
    button: {
        width: '100%',
        height: 68,
        shadowColor: '#000',
        shadowOpacity: 0.25,   
        shadowOffset: {
          width: 0,
          height: 2
        },
        marginTop: 20,
        marginBottom: 20
    },
    inputBottomText: {
        fontSize: 14,
        fontWeight: "500",
        color: '#A5A5A5',
        
        
    },
    inputData: {
        fontSize: 14,
        fontWeight: "600",
        color: '#202020',
        marginLeft: 10,
        
    }






})

export default Registration;