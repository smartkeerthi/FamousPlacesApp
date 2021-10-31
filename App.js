import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import HomeScreen from "./Screens/HomeScreen";
import OnBoardingScreen from "./Screens/OnBoardingScreen";
import SplashScreen from "./Screens/SplashScreen";
import { enableScreens } from "react-native-screens";
import PlaceDetailsScreen from "./Screens/PlaceDetailsScreen";

enableScreens();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isOnBoarded, setIsOnBoarded] = useState(true);

  const Stack = createSharedElementStackNavigator();

  const getValue = async () => {
    const isOnBoard = await AsyncStorage.getItem("onBoardingDone");
    if (isOnBoard == "True") {
      setIsOnBoarded(false);
    } else {
      setIsOnBoarded(true);
    }
  };

  useEffect(() => {
    getValue();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  if (loading) {
    return <SplashScreen />;
  }

  // if(isOnBoarded){
  //   return(
  //     <OnBoardingScreen/>
  //   )
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnBoarded && (
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        )}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Place Details" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
