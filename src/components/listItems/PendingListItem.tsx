import { Text, TouchableOpacity, View } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteButton from '../list/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';

const PendingListItem = ({ title, count, status, time, id }: Streak) => {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const openStreakId = useAppSelector(selectOpenStreak);

  const dispatch = useAppDispatch();
  const calculateRemainingTime = () => {
    const now = new Date();
    const streakDeadline = new Date(time);
    streakDeadline.setHours(streakDeadline.getHours() + 24);
    const timeDifference = streakDeadline.getTime() - now.getTime();
    const remainingDate = new Date(timeDifference);

    const hours = remainingDate.getUTCHours();
    const minutes = remainingDate.getMinutes();
    const seconds = remainingDate.getSeconds();

    setRemainingTime({ hours, minutes, seconds });
    if (remainingDate.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'broken' }));
    }

    //want to be able to disable the pending natuer of the streak button and make it complete until a certain amount of time passes, then it can engage again.
    // const fiveHoursSinceCompleted = new Date(time)
    // streakDeadline.setHours(streakDeadline.getHours() + 4);

    // if(remainingDate.getTime() < fiveHoursSinceCompleted.getTime()){
    //   //
    //   console.log('here', title)
    // }
  };
  const handlePress = () => {
    dispatch(openStreak(id))

  }

  useEffect(() => {
    calculateRemainingTime();
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <TouchableOpacity onPress={handlePress} role="listitem" accessibilityLabel={`pending streak`}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.textMain}>{title}</Text>
          <Text style={styles.textSecondary}>
            {remainingTime.hours} hr {remainingTime.minutes} min {remainingTime.seconds} sec
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.dayCount}>{count}</Text>
          <PendingStreakButton id={id} />
        </View>
      </View>
      {/* EXTENDED MENU */}
      {openStreakId === id ? (
        <View style={styles.bottomContainer}>
          <DeleteButton id={id} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default PendingListItem;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textMain: {
    fontSize: 24,
    fontWeight: '600',
  },
  textSecondary: {
    fontSize: 20,
    color: 'grey',
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
