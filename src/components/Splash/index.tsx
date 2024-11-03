import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { Animated } from 'react-native';
import { getStyle } from './style';

const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => getStyle(), []);

  useEffect(() => {

      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -20, // подпрыгивание вверх
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 1, // вращение на 360 градусов
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0, // опускание обратно
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 0, // возвращение к начальному углу
              duration: 0, // сразу сбрасываем
              useNativeDriver: true,
            }),
          ]),
        ]),
        { iterations: -1 } // бесконечная анимация
      ).start();

  }, [isAppReady]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });



  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <Animated.Image
        source={require('../../assets/splashIcon.png')}
        style={[
          styles.image,
          { opacity: imageOpacity, transform: [{ translateY }, { rotateY: rotateInterpolate }] },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const WithSplashScreen = ({
                            children,
                            isAppReady,
                          }: {
  children: any;
  isAppReady: boolean;
}) => {
  return (
    <>
      {isAppReady && children}
      <Splash isAppReady={isAppReady} />
    </>
  );
};

export default memo(WithSplashScreen);
