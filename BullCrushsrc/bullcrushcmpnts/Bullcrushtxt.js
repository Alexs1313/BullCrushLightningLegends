import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Bullcrushtxt = ({
  royalCourtPropsTxt,
  style,
  bullcrushPropClrs,
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {royalCourtPropsTxt}
        </Text>
      }
    >
      <LinearGradient
        colors={bullcrushPropClrs}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
      >
        <Text style={[style, { opacity: 0 }]}>{royalCourtPropsTxt}</Text>
      </LinearGradient>
    </MaskedView>
  );
};
