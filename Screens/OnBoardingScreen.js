import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, Animated, Image, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window');

const data = [
    {key: 1, img: require('../assets/images/place.png'), text: "Find Famous Places loaction, images and contents", color: "#75dbff", startBtn: false},
    {key: 2, img: require('../assets/images/searching.png'), text: "Search the places you want to visit", color: "#ffe391", startBtn: false},
    {key: 3, img: require('../assets/images/location.png'), text: "Locate your favorite places", color: "#95e6da", startBtn: true},
];

const Item = ({img, text, index, scrollX, color, startBtn, navigation}) => {
    const inputRange = [(index-1)*width, index*width, (index+1)*width];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1.4, 0]
    })
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [50, 0, 50]
    })
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })
    return(
        <View style={{width: width, height: height, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: color,}}>
            <Animated.Image source={img} style={[styles.image, {transform: [{scale}]}]} resizeMode='contain' />
            <Animated.View style={{width, alignItems: 'center', paddingHorizontal: 10, transform: [{translateY}], opacity}}>
                <Text style={{fontSize: 25, color: '#fff', textAlign: 'center', fontWeight: 'bold', letterSpacing: 2}} >{text}</Text>
            </Animated.View>
            {startBtn && (
                <TouchableOpacity onPress={() => {
                    AsyncStorage.setItem('onBoardingDone', 'True');
                    navigation.replace('Home');
                }} activeOpacity={0.5} style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderRadius: 20, elevation: 2}}>
                    <Text style={{letterSpacing: 1, fontWeight: 'bold', color: '#555'}}>Get Started</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const Pagination = ({scrollX}) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [23, -23, 0]
    })
    return(
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center'}}>
            <Animated.View style={{position: 'absolute', backgroundColor: '#fff', width: 25, height: 25, borderRadius: 25, transform: [{translateX}]}} />
            {data.map((item) => {
                return(
                    <View key={item.key} style={{backgroundColor: item.color, width: 15, height: 15, borderRadius: 15, marginHorizontal: 4}} />
                )
            })}
        </View>
    )
}

const OnBoardingScreen = ({navigation}) => {

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container} >
            <Animated.FlatList
                data={data}
                keyExtractor = {(item) => item.key}
                renderItem = {({item, index}) => <Item {...item} index = {index} scrollX = {scrollX} navigation={navigation} />}
                horizontal
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                showsHorizontalScrollIndicator = {false}
                scrollEventThrottle = {16}
            />
            <Pagination scrollX={scrollX} />
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: 150,
        height: 150,
    }
})
