import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Bullcrushtxt } from '../bullcrushcmpnts/Bullcrushtxt';
import { useBullCrushContext } from '../bullcrushstr/bullcrushcntx';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bullcrushentrbg = [
  require('../../assets/images/bullcrushondbg.png'),
  require('../../assets/images/bullcrushondbg2.png'),
  require('../../assets/images/bullcrushondbg3.png'),
];

Sound.setCategory('Playback');

const Bullcrushentrscr = () => {
  const [currBullCrushBrd, setCurrBullCrushBrd] = useState(0);
  const bullcrushnavigate = useNavigation();
  const { toggleBullCrushSound, bullCrushClick, setToggleBullCrushSound } =
    useBullCrushContext();

  useFocusEffect(
    useCallback(() => {
      loadRetroQuestSnd();
    }, []),
  );

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
      source={bullcrushentrbg[currBullCrushBrd]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          style={styles.bullcrushbrd}
          source={require('../../assets/images/bullcrushonbrd.png')}
        >
          {currBullCrushBrd === 0 && (
            <Image source={require('../../assets/images/bullcrushontxt.png')} />
          )}
          {currBullCrushBrd === 1 && (
            <Image
              source={require('../../assets/images/bullcrushontxt2.png')}
            />
          )}
          {currBullCrushBrd === 2 && (
            <Image
              source={require('../../assets/images/bullcrushontxt3.png')}
            />
          )}
        </ImageBackground>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 40, width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (toggleBullCrushSound) {
              bullCrushClick();
            }

            if (currBullCrushBrd < 2) {
              setCurrBullCrushBrd(currBullCrushBrd + 1);
            } else {
              bullcrushnavigate.replace('Bullcrushmnscr');
            }
          }}
        >
          <ImageBackground
            style={styles.bullcrushbtn}
            source={require('../../assets/images/bullcrushbtn.png')}
          >
            <Bullcrushtxt
              royalCourtPropsTxt={'NEXT'}
              style={styles.bullcrushbtntxt}
              bullcrushPropClrs={['#0D3DC5', '#011D92']}
            />
          </ImageBackground>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            gap: 5,
          }}
        >
          {[1, 2, 3].map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.bullcrushdot,
                currBullCrushBrd === idx && {
                  backgroundColor: '#011D92',
                  borderWidth: 1,
                  borderColor: '#FBF000',
                  top: -5,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bullcrushcont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullcrushbrd: {
    width: 377,
    height: 146,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70,
  },
  bullcrushbtn: {
    width: 195,
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 8,
  },
  bullcrushbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 48,
    color: '#011D92',
    top: Platform.OS === 'android' ? -4 : 0,
  },
  bullcrushdot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Bullcrushentrscr;
