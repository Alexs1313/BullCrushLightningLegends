import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Bullcrushtxt } from '../bullcrushcmpnts/Bullcrushtxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBullCrushContext } from '../bullcrushstr/bullcrushcntx';
import { useCallback, useEffect, useRef } from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const Bullcrushmnscr = () => {
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
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 213, marginBottom: 40 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              bullcrushnavigate.navigate('Bullcrushgmplscr');

              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <ImageBackground
              style={styles.bullcrushbtn}
              source={require('../../assets/images/bullcrushbtn.png')}
            >
              <Bullcrushtxt
                royalCourtPropsTxt={'PLAY'}
                style={styles.bullcrushbtntxt}
                bullcrushPropClrs={['#0D3DC5', '#011D92']}
              />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              bullcrushnavigate.navigate('Bullcrushsttsscr');
              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <ImageBackground
              style={styles.bullcrushbtn}
              source={require('../../assets/images/bullcrushbtnsec.png')}
            >
              <Bullcrushtxt
                royalCourtPropsTxt={'STATS'}
                style={styles.bullcrushbtntxt}
                bullcrushPropClrs={['#FFE106', '#E99500']}
              />
            </ImageBackground>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                bullcrushnavigate.navigate('Bullcrushsettscr');
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
              onPress={() => {
                bullcrushnavigate.navigate('Bullcrushinfscr');
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

const styles = StyleSheet.create({
  bullcrushbtn: {
    width: 195,
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 17,
  },
  bullcrushbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 48,
    color: '#011D92',
    top: Platform.OS === 'android' ? -3 : 0,
  },
});

export default Bullcrushmnscr;
