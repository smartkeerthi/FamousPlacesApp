import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Image source={require('../assets/images/logo.png')} style={{width: 160, height: 160, resizeMode: 'contain'}} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
