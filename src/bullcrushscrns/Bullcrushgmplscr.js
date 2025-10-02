import React, { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bullcrushtxt } from '../bullcrushcmpnts/Bullcrushtxt';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useBullCrushContext } from '../bullcrushstr/bullcrushcntx';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Vibration,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const { width: bullCrushWidth, height: bullCrushHeight } =
  Dimensions.get('window');
const bullCrushItemSize = 68;
const bullCrushHeartsTotal = 3;
const bullCrushFallSpeed = 4;
const bullCrushMinRags = 1;
const bullCrushMaxRags = 4;

const bullCrushRagImages = {
  bullCrushRed: require('../../assets/images/bullcrushflg4.png'),
  bullCrushBlue: require('../../assets/images/bullcrushflg1.png'),
  bullCrushGreen: require('../../assets/images/bullcrushflg2.png'),
  bullCrushYellow: require('../../assets/images/bullcrushflg3.png'),
};
const bullCrushHeartImg = require('../../assets/images/bullcrushhrt.png');
const bullCrushBrokenHeartImg = require('../../assets/images/bullcrushhrtbr.png');

function bullCrushIsOverlapping(bullCrushNewX, bullCrushRags) {
  return bullCrushRags.some(
    bullCrushRag =>
      Math.abs(bullCrushRag.x - bullCrushNewX) < bullCrushItemSize,
  );
}

function bullCrushGetSafeRandomX(bullCrushRags, bullCrushMaxAttempts = 20) {
  let bullCrushAttempt = 0;
  while (bullCrushAttempt < bullCrushMaxAttempts) {
    const bullCrushX = Math.random() * (bullCrushWidth - bullCrushItemSize);
    if (!bullCrushIsOverlapping(bullCrushX, bullCrushRags)) return bullCrushX;
    bullCrushAttempt++;
  }
  return Math.random() * (bullCrushWidth - bullCrushItemSize);
}

function bullCrushRandomColor() {
  const bullCrushColors = Object.keys(bullCrushRagImages);
  return bullCrushColors[Math.floor(Math.random() * bullCrushColors.length)];
}

function bullCrushGetRandomCount() {
  return (
    Math.floor(Math.random() * (bullCrushMaxRags - bullCrushMinRags + 1)) +
    bullCrushMinRags
  );
}

function bullCrushCreateRag(bullCrushRags) {
  return {
    bullCrushId: 'bullCrushRag_' + Math.random(),
    bullCrushColor: bullCrushRandomColor(),
    x: bullCrushGetSafeRandomX(bullCrushRags),
    y: -bullCrushItemSize,
    bullCrushCreated: Date.now(),
  };
}

export default function Bullcrushgmplscr() {
  const [bullCrushRags, setBullCrushRags] = useState([]);
  const [bullCrushScore, setBullCrushScore] = useState(0);
  const [bullCrushHearts, setBullCrushHearts] = useState(bullCrushHeartsTotal);
  const [bullCrushModal, setBullCrushModal] = useState({
    bullCrushVisible: false,
    bullCrushWin: false,
  });
  const [bullCrushStats, setBullCrushStats] = useState([0]);

  const bullCrushFrameRef = useRef();
  const [bullCrushBrokenHeartIndex, setBullCrushBrokenHeartIndex] =
    useState(null);
  const bullCrushNavigate = useNavigation();
  const [bullCrushShowRecordModal, setBullCrushShowRecordModal] =
    useState(false);
  const { toggleBullCrushVibration, bullCrushClick, toggleBullCrushSound } =
    useBullCrushContext();
  const bullCrushLightningAnim = useRef(new Animated.Value(1)).current;
  const [bullCrushShowLightning, setBullCrushShowLightning] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useEffect(() => {
    let bullCrushTimeout;
    if (bullCrushShowLightning) {
      const bullCrushAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(bullCrushLightningAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(bullCrushLightningAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 20 },
      );
      bullCrushAnim.start();
      bullCrushTimeout = setTimeout(() => {
        bullCrushAnim.stop();
        setBullCrushShowLightning(false);
      }, 4000);
    }
    return () => {
      bullCrushTimeout && clearTimeout(bullCrushTimeout);
      bullCrushLightningAnim.setValue(1);
    };
  }, [bullCrushShowLightning]);

  useEffect(() => {
    AsyncStorage.getItem('bullCrushCatchRedRagScores').then(bullCrushStored => {
      if (bullCrushStored) setBullCrushStats(JSON.parse(bullCrushStored));
    });
  }, []);

  useEffect(() => {
    if (bullCrushModal.bullCrushVisible || bullCrushShowRecordModal) return;
    bullCrushFrameRef.current = requestAnimationFrame(bullCrushGameStep);
    return () => cancelAnimationFrame(bullCrushFrameRef.current);
  });

  const bullCrushGameStep = () => {
    setBullCrushRags(prevBullCrushRags => {
      let bullCrushMoved = prevBullCrushRags.map(bullCrushRag => ({
        ...bullCrushRag,
        y: bullCrushRag.y + bullCrushFallSpeed,
      }));
      let bullCrushFiltered = bullCrushMoved.filter(
        bullCrushRag => bullCrushRag.y < bullCrushHeight,
      );
      let bullCrushTargetCount = Math.max(
        bullCrushGetRandomCount(),
        bullCrushMinRags,
      );
      while (
        bullCrushFiltered.length < bullCrushTargetCount &&
        bullCrushFiltered.length < bullCrushMaxRags
      ) {
        const bullCrushNewRag = bullCrushCreateRag(bullCrushFiltered);
        bullCrushFiltered.push(bullCrushNewRag);
      }
      if (bullCrushFiltered.length > bullCrushMaxRags) {
        bullCrushFiltered = bullCrushFiltered.slice(0, bullCrushMaxRags);
      }
      return bullCrushFiltered;
    });

    if (!bullCrushModal.bullCrushVisible)
      bullCrushFrameRef.current = requestAnimationFrame(bullCrushGameStep);
  };

  const bullCrushHandleCatch = bullCrushRag => {
    if (toggleBullCrushSound) {
      bullCrushClick();
    }

    setBullCrushRags(bullCrushRags =>
      bullCrushRags.filter(
        bullCrushR => bullCrushR.bullCrushId !== bullCrushRag.bullCrushId,
      ),
    );
    if (bullCrushRag.bullCrushColor === 'bullCrushRed') {
      const bullCrushNewScore = bullCrushScore + 1;
      setBullCrushScore(bullCrushNewScore);
      if (
        bullCrushNewScore % 10 === 0 &&
        bullCrushNewScore > (bullCrushStats[0] ?? 0)
      ) {
        setBullCrushShowRecordModal(true);
        bullCrushFinishGame(false, bullCrushNewScore);
      }
      if (bullCrushNewScore % 10 === 0) setBullCrushShowLightning(true);
      if (bullCrushNewScore === 50)
        bullCrushFinishGame(true, bullCrushNewScore);
    } else {
      if (toggleBullCrushVibration) {
        Vibration.vibrate(100);
      }

      if (bullCrushHearts > 1) {
        setBullCrushBrokenHeartIndex(bullCrushHeartsTotal - bullCrushHearts);
        setTimeout(() => setBullCrushBrokenHeartIndex(null), 500);
        setBullCrushHearts(h => h - 1);
      } else {
        setBullCrushBrokenHeartIndex(bullCrushHeartsTotal - 1);
        setTimeout(() => setBullCrushBrokenHeartIndex(null), 500);
        bullCrushFinishGame(false, bullCrushScore);
      }
    }
  };

  const bullCrushFinishGame = async (bullCrushWin, bullCrushFinalScore) => {
    setBullCrushModal({ bullCrushVisible: true, bullCrushWin });
    const bullCrushNewStats = [...bullCrushStats, bullCrushFinalScore]
      .sort((a, b) => b - a)
      .slice(0, 4);
    setBullCrushStats(bullCrushNewStats);
    await AsyncStorage.setItem(
      'bullCrushCatchRedRagScores',
      JSON.stringify(bullCrushNewStats),
    );
  };

  const bullCrushRestart = () => {
    setBullCrushScore(0);
    setBullCrushHearts(bullCrushHeartsTotal);
    setBullCrushRags([]);
    setBullCrushModal({ bullCrushVisible: false, bullCrushWin: false });
    setBullCrushShowLightning(false);
    setBullCrushBrokenHeartIndex(null);
    setBullCrushShowRecordModal(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bullcrushldrbg.png')}
      style={{ flex: 1 }}
    >
      <View style={bullCrushStyles.bullCrushContainer}>
        <View style={bullCrushStyles.bullCrushRagsArea}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={bullCrushStyles.bullCrushBtn}
            onPress={() => {
              bullCrushNavigate.goBack();
              if (toggleBullCrushSound) {
                bullCrushClick();
              }
            }}
          >
            <Image
              source={require('../../assets/images/bullcrushbckbtn.png')}
            />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginTop: 70, zIndex: 100 }}>
            <View style={bullCrushStyles.bullCrushHeartsRow}>
              {Array.from({ length: bullCrushHeartsTotal }).map(
                (_, bullCrushI) => {
                  const brokenCount = bullCrushHeartsTotal - bullCrushHearts;
                  const isBroken = bullCrushI < brokenCount;
                  const isBlinking = bullCrushBrokenHeartIndex === bullCrushI;
                  return (
                    <Image
                      key={bullCrushI}
                      source={
                        isBlinking
                          ? bullCrushBrokenHeartImg
                          : isBroken
                          ? bullCrushBrokenHeartImg
                          : bullCrushHeartImg
                      }
                      style={bullCrushStyles.bullCrushHeart}
                    />
                  );
                },
              )}
            </View>

            <View style={bullCrushStyles.bullCrushScoreRow}>
              <Bullcrushtxt
                royalCourtPropsTxt={bullCrushScore}
                style={bullCrushStyles.bullCrushBtnTxt}
                bullcrushPropClrs={['#FFE106', '#E99500']}
              />
              {bullCrushShowLightning && (
                <Animated.View
                  style={{
                    opacity: bullCrushLightningAnim,
                  }}
                >
                  <Image
                    source={require('../../assets/images/bullcrushlight1.png')}
                    style={{ position: 'absolute', top: -80, left: 20 }}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../../assets/images/bullcrushlight2.png')}
                    style={{ position: 'absolute', top: -70, left: -80 }}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../../assets/images/bullcrushlight3.png')}
                    style={{ position: 'absolute', top: -50, left: -25 }}
                    resizeMode="contain"
                  />
                </Animated.View>
              )}
            </View>
          </View>

          {bullCrushRags.map(bullCrushRag => (
            <TouchableOpacity
              key={bullCrushRag.bullCrushId}
              style={{
                position: 'absolute',
                left: bullCrushRag.x,
                top: bullCrushRag.y,
                width: bullCrushItemSize,
                height: bullCrushItemSize,
              }}
              onPress={() => bullCrushHandleCatch(bullCrushRag)}
            >
              <Image
                source={bullCrushRagImages[bullCrushRag.bullCrushColor]}
                style={{ width: bullCrushItemSize, height: 110 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          visible={bullCrushModal.bullCrushVisible}
          transparent
          animationType="slide"
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <TouchableWithoutFeedback onPress={() => bullCrushRestart()}>
            <View style={bullCrushStyles.bullCrushModal}>
              <Image
                source={require('../../assets/images/bullcrushdft.png')}
                style={{ zIndex: 1 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt3.png')}
                style={{ position: 'absolute', top: 20, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt2.png')}
                style={{ position: 'absolute', top: 220, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt4.png')}
                style={{ position: 'absolute', top: 120, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt1.png')}
                style={{ position: 'absolute', bottom: 0, left: 10 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          visible={bullCrushShowRecordModal}
          transparent
          animationType="fade"
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <TouchableWithoutFeedback
            onPress={() => setBullCrushShowRecordModal(false)}
          >
            <View style={bullCrushStyles.bullCrushModal}>
              <Image
                source={require('../../assets/images/bullcrushnwscr.png')}
                style={{ zIndex: 1 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt3.png')}
                style={{ position: 'absolute', top: 20, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt2.png')}
                style={{ position: 'absolute', top: 220, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt4.png')}
                style={{ position: 'absolute', top: 120, right: 10 }}
              />
              <Image
                source={require('../../assets/images/bullcrushlt1.png')}
                style={{ position: 'absolute', bottom: 0, left: 10 }}
              />

              <Bullcrushtxt
                royalCourtPropsTxt={bullCrushScore}
                style={bullCrushStyles.bullCrushModalText}
                bullcrushPropClrs={['#FFE106', '#E99500']}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const bullCrushStyles = StyleSheet.create({
  bullCrushContainer: { flex: 1, alignItems: 'center' },
  bullCrushHeartsRow: { flexDirection: 'row', marginVertical: 10 },
  bullCrushHeart: { marginHorizontal: 5 },
  bullCrushScoreRow: { marginVertical: 10, position: 'relative' },
  bullCrushRagsArea: {
    flex: 1,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  bullCrushModal: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0008',
  },
  bullCrushModalText: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 140,
    color: '#011D92',
  },
  bullCrushBtnTxt: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 48,
    color: '#011D92',
    top: Platform.OS === 'android' ? -3 : 0,
  },
  bullCrushBtn: {
    position: 'absolute',
    left: 20,
    top: 78,
    zIndex: 110,
  },
});
