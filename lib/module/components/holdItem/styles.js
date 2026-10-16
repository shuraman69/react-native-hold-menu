import { StyleSheet } from 'react-native';
import { ABSOLUTE_FILL } from '../../constants';
const styles = StyleSheet.create({
  holdItem: {
    zIndex: 10,
    position: 'absolute'
  },
  portalOverlay: { ...ABSOLUTE_FILL,
    zIndex: 15
  }
});
export default styles;
//# sourceMappingURL=styles.js.map