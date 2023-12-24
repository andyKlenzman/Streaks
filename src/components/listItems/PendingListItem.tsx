import { Text, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { useEffect, useState } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import { parseTime, getTimeUntilStreakBroken } from '../../utils/timeUtils';
import { Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const PendingListItem = ({ title, count, time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);
  const [subtitle, setSubtitle] = useState({ timeLeft: 0, timeInterval: 'hours' });
  const screenWidth = Dimensions.get('window').width;

  const start = useSharedValue(0);
  const offset = useSharedValue(0);
  const isPressed = useSharedValue(false);

  const openStreakWrapper = () => {
    dispatch(openStreak(id));

    if (openStreakId === id) {
      start.value = offset.value = -75;
    } else {
      start.value = offset.value = 0;
    }
  };

  const handleTimeOperations = () => {
    const dateObj = new Date(time);
    const dueDate = getTimeUntilStreakBroken(dateObj);
    const { hours, minutes } = parseTime(dueDate);

    if (hours > 1) {
      setSubtitle({ timeLeft: hours, timeInterval: 'hours' });
    } else if (hours === 1) {
      setSubtitle({ timeLeft: hours, timeInterval: 'hours' });
    } else {
      setSubtitle({ timeLeft: minutes, timeInterval: 'minutes' });
    }

    if (dueDate.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'broken' }));
    }
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      //may need to put a check in here so the slide animation doesnt fuck with scrolling
      const translation = start.value + e.translationX;

      if (translation < -75) {
        offset.value = -75;
      } else if (translation > 25) {
        offset.value = 25;
      } else {
        offset.value = translation;
      }

      console.log(translation, offset.value, screenWidth / 5);
    })
    .onEnd(() => {
      console.log('onEnd fire');
      start.value = offset.value;
    })
    .onFinalize(() => {
      console.log('onFirnalize fire');

      const triggerOpenAnimation = offset.value < 0;
      if (triggerOpenAnimation) {
        runOnJS(openStreakWrapper)();
      } else {
        start.value = offset.value = 0;
      }
      isPressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    if (isPressed.value) {
      return {
        transform: [{ translateX: offset.value }],
      };
    } else {
      return {
        transform: [{ translateX: withTiming(offset.value, { duration: 100 }) }],
      };
    }
  });

  useEffect(() => {
    handleTimeOperations();
    const interval = setInterval(() => {
      handleTimeOperations();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (openStreakId === id) {
      start.value = offset.value = -75;
    } else {
      start.value = offset.value = 0;
    }
  }, [openStreakId]);

  return (
    <GestureDetector gesture={gesture}>
      <View>
        <Animated.View style={[styles.topContainer, animatedStyle]}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
              {title}
            </Text>
            <Text style={styles.textSecondary}>
              {subtitle.timeLeft} {subtitle.timeInterval} left
            </Text>
          </View>
          <View style={styles.dayCountAndButtonContainer}>
            <Text style={styles.dayCount}>{count}</Text>
            <PendingStreakButton id={id} />
          </View>
        </Animated.View>

        <View style={styles.deleteButtonContainer}>
          <DeleteButton id={id} />
        </View>
      </View>
    </GestureDetector>
  );
};

export default PendingListItem;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },

  textContainer: {
    maxWidth: '70%',
  },
  textMain: {
    fontSize: 24,
    fontWeight: '600',
    flexShrink: 1, // Allow text to shrink if it exceeds available space
    // Adjust the percentage based on your layout needs
  },
  textSecondary: {
    fontSize: 20,
    color: 'grey',
  },
  dayCountAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    zIndex: -5,
    minHeight: '100%',
  },
});

// const newOffsetValue = Math.max(
//   Math.max(translation, screenHeight),
//   curtainVals.coordinates.closed,
// );
