import {StyleSheet} from 'react-native';

import { BLACK } from "../../constants/colors";

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BLACK,
    },
    image: {
      width: 335,
      height: 93,
    },
  });

  return styles;
};
