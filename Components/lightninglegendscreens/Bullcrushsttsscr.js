import { useNavigation } from '@react-navigation/native';
import { Bullcrushtxt } from '../lightninglegendscomponents/Bullcrushtxt';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBullCrushContext } from '../lightninglegendstore/bullcrushcntx';

const Bullcrushsttsscr = () => {
  const bullcrushnavigate = useNavigation();
  const [stats, setStats] = useState([]);
  const { toggleBullCrushSound, bullCrushClick } = useBullCrushContext();

  useEffect(() => {
    AsyncStorage.getItem('bullCrushCatchRedRagScores').then(stored => {
      if (stored) setStats(JSON.parse(stored));
    });
  }, []);

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
          <View style={styles.bullcrushcnt}>
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

            <Image source={require('../../assets/images/bullcrushstats.png')} />

            {stats.length === 0 && (
              <View style={{ marginTop: 230, alignItems: 'center' }}>
                <Image
                  source={require('../../assets/images/bullcrushemptxt.png')}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 20,
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              {stats.map((s, i) => (
                <ImageBackground
                  source={require('../../assets/images/bullcrushstts.png')}
                  style={{
                    width: 161,
                    height: 161,
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={i}
                >
                  <Bullcrushtxt
                    royalCourtPropsTxt={i === 0 ? `Best:` : `#${i + 1}`}
                    style={styles.bullcrushttl}
                    bullcrushPropClrs={['#FFE106', '#E99500']}
                  />
                  <Bullcrushtxt
                    royalCourtPropsTxt={s}
                    style={styles.bullcrushbtntxt}
                    bullcrushPropClrs={['#FFE106', '#E99500']}
                  />
                </ImageBackground>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bullcrushcnt: {
    paddingTop: 60,
    alignItems: 'center',
    padding: 20,
  },
  bullcrushbtn: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  bullcrushbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 42,
    color: '#011D92',
  },
  bullcrushttl: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 32,
  },
});

export default Bullcrushsttsscr;
