import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);
  const bannerPosition = useSharedValue(-300); // 用于控制横幅滚动的位置

  // 设置挥手动画
  rotationAnimation.value = withRepeat(
    withTiming(25, { duration: 150 }), 
    Infinity // 重复动画序列4次，实现从0到25的连续循环
  ); 

  // 设置横幅滚动动画
  // bannerPosition.value = withRepeat(withTiming(-300, { duration: 5000 }), -1, () => 0);
  bannerPosition.value = withRepeat(withSequence(
    withTiming(200, { duration: 5500 ,easing: t => t }),   ),Infinity);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  const bannerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bannerPosition.value }],
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.Text style={[styles.banner, bannerStyle]}>通知1:大家好</Animated.Text>
      <Animated.View style={animatedStyle}>
        <ThemedText style={styles.text}>👋</ThemedText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
  },
});