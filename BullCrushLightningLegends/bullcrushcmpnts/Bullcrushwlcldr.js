import { Image, ImageBackground, View } from 'react-native';

const Bullcrushwlcldr = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bullcrushldrbg.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Image source={require('../../assets/images/bullcrushldr.png')} />
    </ImageBackground>
  );
};

export default Bullcrushwlcldr;
