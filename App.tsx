import Bullcrushentrscr from './Components/lightninglegendscreens/Bullcrushentrscr';
import Bullcrushwlcldr from './Components/lightninglegendscomponents/Bullcrushwlcldr';
import Bullcrushmnscr from './Components/lightninglegendscreens/Bullcrushmnscr';
import Bullcrushsttsscr from './Components/lightninglegendscreens/Bullcrushsttsscr';
import Bullcrushgmplscr from './Components/lightninglegendscreens/Bullcrushgmplscr';
import { BullCrushAppContextProvider } from './Components/lightninglegendstore/bullcrushcntx';
import Bullcrushsettscr from './Components/lightninglegendscreens/Bullcrushsettscr';
import Bullcrushinfscr from './Components/lightninglegendscreens/Bullcrushinfscr';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const BullCrushNavigation = createStackNavigator();

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
      <BullCrushAppContextProvider>
        {!wlcBullCrushLightningScr ? (
          <Bullcrushwlcldr />
        ) : (
          <BullCrushNavigation.Navigator screenOptions={{ headerShown: false }}>
            <BullCrushNavigation.Screen
              name="Bullcrushentrsc"
              component={Bullcrushentrsc}
            />
            <BullCrushNavigation.Screen
              name="Bullcrushmnscr"
              component={Bullcrushmnscr}
            />
            <BullCrushNavigation.Screen
              name="Bullcrushsttsscr"
              component={Bullcrushsttsscr}
            />
            <BullCrushNavigation.Screen
              name="Bullcrushgmplscr"
              component={Bullcrushgmplscr}
            />
            <BullCrushNavigation.Screen
              name="Bullcrushsettscr"
              component={Bullcrushsettscr}
            />
            <BullCrushNavigation.Screen
              name="Bullcrushinfscr"
              component={Bullcrushinfscr}
            />
          </BullCrushNavigation.Navigator>
        )}
      </BullCrushAppContextProvider>
    </NavigationContainer>
  );
};

export default App;
