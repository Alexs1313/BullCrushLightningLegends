import { NavigationContainer } from '@react-navigation/native';

import { useEffect as partoUseEffect, useState as partoUseState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Bullcrushentrscr from './BullCrushsrc/bullcrushscrns/Bullcrushentrscr';
import Bullcrushwlcldr from './BullCrushsrc/bullcrushcmpnts/Bullcrushwlcldr';
import Bullcrushmnscr from './BullCrushsrc/bullcrushscrns/Bullcrushmnscr';
import Bullcrushsttsscr from './BullCrushsrc/bullcrushscrns/Bullcrushsttsscr';
import Bullcrushgmplscr from './BullCrushsrc/bullcrushscrns/Bullcrushgmplscr';
import { BullCrushAppContextProvider } from './BullCrushsrc/bullcrushstr/bullcrushcntx';
import Bullcrushsettscr from './BullCrushsrc/bullcrushscrns/Bullcrushsettscr';
import Bullcrushinfscr from './BullCrushsrc/bullcrushscrns/Bullcrushinfscr';

const BullCrushNavigation = createStackNavigator();

const App = () => {
  const [wlcBullCrushLightningScr, setWlcBullCrushLightningScr] =
    partoUseState(false);

  partoUseEffect(() => {
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
              name="Bullcrushentrscr"
              component={Bullcrushentrscr}
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
