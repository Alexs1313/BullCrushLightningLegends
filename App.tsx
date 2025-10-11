import LightningLegendOnboarding from './LightningLegends/LightningLegendScreens/LightningLegendOnboarding';
import LightningLegendMain from './LightningLegends/LightningLegendScreens/LightningLegendMain';
import LightningLegendStats from './LightningLegends/LightningLegendScreens/LightningLegendStats';
import LightningLegendGameplay from './LightningLegends/LightningLegendScreens/LightningLegendGameplay';
import { ContextProvider } from './LightningLegends/LightningLegendStore/bullcrushcntx';
import LightningLegendSettings from './LightningLegends/LightningLegendScreens/LightningLegendSettings';
import LightningLegendInfo from './LightningLegends/LightningLegendScreens/LightningLegendInfo';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LightningLegendLoader from './LightningLegends/LightningLegendsComponents/LightningLegendLoader';

const Stack = createStackNavigator();

const App = () => {
  const [wlcBullCrushLightningScr, setWlcBullCrushLightningScr] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWlcBullCrushLightningScr(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {!wlcBullCrushLightningScr ? (
          <LightningLegendLoade />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="LightningLegendOnboarding"
              component={LightningLegendOnboarding}
            />
            <Stack.Screen
              name="LightningLegendMain"
              component={LightningLegendMain}
            />
            <Stack.Screen
              name="LightningLegendStats"
              component={LightningLegendStats}
            />
            <Stack.Screen
              name="LightningLegendGameplay"
              component={LightningLegendGameplay}
            />
            <Stack.Screen
              name="LightningLegendSettings"
              component={LightningLegendSettings}
            />
            <Stack.Screen
              name="LightningLegendInfo"
              component={LightningLegendInfo}
            />
          </Stack.Navigator>
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
