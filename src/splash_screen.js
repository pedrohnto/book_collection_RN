import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(
            () => { navigation.replace('BookList') },
            5000
        )
    }, [])


    return (
        <ImageBackground
            source={require('./assets/splash.png')}
            style={styles.imgBackground}
        ></ImageBackground>
    )
}

const styles = StyleSheet.create({
    imgBackground: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default SplashScreen;