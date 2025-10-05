import { useNavigation } from '@react-navigation/native';
import { useBullCrushContext } from '../lightninglegendstore/bullcrushcntx';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

const bullcrushfcts = [
  'Bulls are male cattle, known for their muscular build and strength.',
  'They have a natural instinct to protect their territory.',
  'Despite the myth, bulls are not enraged by the color red—they react to movement instead.',
  'Bulls use their horns both for defense and dominance displays.',
  'A bull can weigh anywhere between 500 and 1,500 kilograms.',
  'In many cultures, bulls symbolize power, fertility, and protection.',
  'The famous Wall Street “Charging Bull” statue in New York represents financial optimism and strength.',
  'Bulls have a strong sense of smell and can detect scents miles away.',
  `Ancient civilizations like the Minoans worshipped bulls in their rituals.`,
  `Bulls are featured in many zodiac and astrological traditions, like Taurus.`,
  `A matador is the main performer in a bullfight, facing the bull in the final stage.`,
  `The red cape used is called a muleta.`,
  `The large colorful cape used earlier is called a capote.`,
  `Matadors train for years to master their footwork and precision.`,
  `Bullfighting is considered an art form in Spain, blending sport, tradition, and theater.`,
  `The outfit worn by matadors is called the “traje de luces” (suit of lights).`,
  `The traje de luces can weigh up to 7 kilograms because of the embroidery and ornaments.`,
  `In traditional bullfighting, the matador always salutes the audience before the fight.`,
  `The role of the matador requires courage, precision, and dramatic performance.`,
  `Bullfighting remains controversial worldwide due to animal rights concerns, but it is still seen as cultural heritage in parts of Spain and Latin America.`,
];

const Bullcrushinfscr = () => {
  const bullcrushnavigate = useNavigation();
  const [bullCrushCuttingFact, setBullCrushCuttingFact] = useState(0);
  const { toggleBullCrushSound, bullCrushClick } = useBullCrushContext();

  const nextBullCrushFact = () => {
    if (toggleBullCrushSound) {
      bullCrushClick();
    }
    setBullCrushCuttingFact(prev => (prev + 1) % bullcrushfcts.length);
  };

  const prevBullCrushFact = () => {
    if (toggleBullCrushSound) {
      bullCrushClick();
    }
    setBullCrushCuttingFact(
      prev => (prev - 1 + bullcrushfcts.length) % bullcrushfcts.length,
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bullcrushldrbg.png')}
      style={{ flex: 1 }}
      blurRadius={20}
    >
      <ImageBackground
        source={require('../../assets/images/bullcrushbgblr.png')}
        style={{ flex: 1 }}
        blurRadius={2}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bullcrushbtn}
            onPress={() => {
              bullcrushnavigate.goBack();
              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <Image
              source={require('../../assets/images/bullcrushbckbtn.png')}
            />
          </TouchableOpacity>
          <View style={styles.bullcrushcnt}>
            <Image source={require('../../assets/images/bullcrushfacts.png')} />
          </View>
          <View
            style={{
              marginBottom: 20,
              marginTop: 140,
              alignItems: 'center',
            }}
          >
            <ImageBackground
              style={styles.bullcrushfctcnt}
              source={require('../../assets/images/bullcrushfctbrd.png')}
            >
              <Text style={styles.bullcrushfcttxt}>
                {bullcrushfcts[bullCrushCuttingFact]}
              </Text>
            </ImageBackground>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              flexDirection: 'row',
              gap: 50,
              marginBottom: 40,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => prevBullCrushFact()}
            >
              <Image
                source={require('../../assets/images/bullcrushbckbtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => nextBullCrushFact()}
            >
              <Image
                source={require('../../assets/images/bullcrushnxtbt.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bullcrushcnt: { paddingTop: 60, alignItems: 'center', padding: 20 },
  bullcrushbtn: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  bullcrushbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 48,
    color: '#011D92',
    top: -3,
  },
  bullcrushttl: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 32,
    color: '#F9CE04',
  },
  bullcrushfctcnt: {
    width: 315,
    height: 315,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 18,
  },
  bullcrushfcttxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Bullcrushinfscr;
