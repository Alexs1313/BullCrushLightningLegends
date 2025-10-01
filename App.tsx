import { NavigationContainer } from '@react-navigation/native';
import { useEffect as partoUseEffect, useState as partoUseState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Bullcrushentrscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushentrscr';
import Bullcrushwlcldr from './BullCrushLightningLegends/bullcrushcmpnts/Bullcrushwlcldr';
import Bullcrushmnscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushmnscr';
import Bullcrushsttsscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushsttsscr';
import Bullcrushgmplscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushgmplscr';
import { BullCrushAppContextProvider } from './BullCrushLightningLegends/bullcrushstr/bullcrushcntx';
import Bullcrushsettscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushsettscr';
import Bullcrushinfscr from './BullCrushLightningLegends/bullcrushscrns/Bullcrushinfscr';

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
              name="Bulcrushentrscr"
              component={Bulcrushentrscr}
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
