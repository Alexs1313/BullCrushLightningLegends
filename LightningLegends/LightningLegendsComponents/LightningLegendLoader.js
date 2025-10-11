import { Image, ImageBackground } from 'react-native';

const LightningLegendLoader = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bullcrushldrbg.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Image source={require('../../assets/images/bullcrushldr.png')} />
    </ImageBackground>
  );
};

export default LightningLegendLoader;
