import { createContext, useContext, useState } from 'react';
import Sound from 'react-native-sound';

export const StoreContext = createContext();

export const useBullCrushContext = () => {
  return useContext(StoreContext);
};

export const BullCrushAppContextProvider = ({ children }) => {
  const [toggleBullCrushVibration, setToggleBullCrushVibration] =
    useState(false);
  const [toggleBullCrushSound, setToggleBullCrushSound] = useState(false);

  const bullCrushClick = () => {
    const clickSound = new Sound(
      'bull-click-tick-menu-navigation.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        clickSound.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
          clickSound.release();
        });
      },
    );
  };

  const value = {
    toggleBullCrushVibration,
    setToggleBullCrushVibration,
    setToggleBullCrushSound,
    toggleBullCrushSound,
    bullCrushClick,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
