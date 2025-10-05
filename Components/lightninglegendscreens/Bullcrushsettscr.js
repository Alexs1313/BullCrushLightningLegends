import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBullCrushContext } from '../lightninglegendstore/bullcrushcntx';
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

const Bullcrushsettscr = () => {
  const bullcrushnavigate = useNavigation();

  const {
    toggleBullCrushVibration,
    setToggleBullCrushVibration,
    setToggleBullCrushSound,
    toggleBullCrushSound,
    bullCrushClick,
  } = useBullCrushContext();

  const toggleBullGameVibration = async value => {
    try {
      await AsyncStorage.setItem('bullcrushVibrationOn', JSON.stringify(value));
      setToggleBullCrushVibration(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleBullGameSound = async value => {
    try {
      await AsyncStorage.setItem('bullcrushSoundOn', JSON.stringify(value));
      setToggleBullCrushSound(value);
    } catch (error) {
      console.log('Error', error);
    }
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
            <Image source={require('../../assets/images/bullcrushsettg.png')} />
          </View>
          <View
            style={{
              paddingHorizontal: 40,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                marginBottom: 35,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.bullcrushttl}>Vibration</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  toggleBullGameVibration(!toggleBullCrushVibration);
                  if (toggleBullCrushSound) {
                    bullCrushClick();
                  }
                }}
              >
                {toggleBullCrushVibration ? (
                  <Image
                    source={require('../../assets/images/bullcrushon.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/bullcrushoff.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            {Platform.OS === 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.bullcrushttl}>Sound</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    toggleBullGameSound(!toggleBullCrushSound);
                    if (toggleBullCrushSound) {
                      bullCrushClick();
                    }
                  }}
                >
                  {toggleBullCrushSound ? (
                    <Image
                      source={require('../../assets/images/bullcrushon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/bullcrushoff.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
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
    fontSize: 42,
    color: '#011D92',
    top: -3,
  },
  bullcrushttl: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 32,
    color: '#F9CE04',
  },
});

export default Bullcrushsettscr;
