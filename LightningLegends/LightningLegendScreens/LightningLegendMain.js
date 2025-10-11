import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBullCrushContext } from '../LightningLegendStore/bullcrushcntx';
import { useCallback } from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const LightningLegendMain = () => {
  const bullcrushnavigate = useNavigation();
  const {
    setToggleBullCrushVibration,
    setToggleBullCrushSound,
    toggleBullCrushSound,
    bullCrushClick,
  } = useBullCrushContext();

  useFocusEffect(
    useCallback(() => {
      loadRetroQuestSnd();
      loadRetroQuestVibr();
    }, []),
  );

  const loadRetroQuestVibr = async () => {
    try {
      const retroQuestVibrValue = await AsyncStorage.getItem(
        'bullcrushVibrationOn',
      );

      const isRetrVibrOn = JSON.parse(retroQuestVibrValue);
      setToggleBullCrushVibration(isRetrVibrOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadRetroQuestSnd = async () => {
    try {
      const retroQuestVibrValue = await AsyncStorage.getItem(
        'bullcrushSoundOn',
      );

      const isRetrVibrOn = JSON.parse(retroQuestVibrValue);
      setToggleBullCrushSound(isRetrVibrOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bullcrushhmbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ marginTop: 213, marginBottom: 40, alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{ zIndex: 10, marginBottom: 10 }}
            activeOpacity={0.7}
            onPress={() => {
              bullcrushnavigate.navigate('LightningLegendGameplay');

              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <Image source={require('../../assets/images/bullcrushpl.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ zIndex: 10, marginBottom: 10 }}
            onPress={() => {
              bullcrushnavigate.navigate('LightningLegendStats');
              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <Image source={require('../../assets/images/bullcrushst.png')} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ zIndex: 10 }}
              onPress={() => {
                bullcrushnavigate.navigate('LightningLegendSettings');
                if (toggleBullCrushSound) {
                  bullCrushClick();
                }
              }}
            >
              <Image
                source={require('../../assets/images/bullcrushsett.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ zIndex: 10 }}
              onPress={() => {
                bullcrushnavigate.navigate('LightningLegendInfo');
                if (toggleBullCrushSound) {
                  bullCrushClick();
                }
              }}
            >
              <Image source={require('../../assets/images/bullcrushinf.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={require('../../assets/images/bullcrushhmbull.png')}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default LightningLegendMain;
