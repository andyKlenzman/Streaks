import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { useEffect } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import CompleteButton from './buttons/CompleteButton';
import { getTimeUntilStatusChange } from '../../utils/timeUtils';

const CompleteListItem = ({ title, count, time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

  const handleTimeOperations = () => {
    const timeUntilStatusChange = getTimeUntilStatusChange(time);

    //the status of the streak will be changed when time expires, and pending list item will be rendered
    if (timeUntilStatusChange.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'pending' }));
    }
  };

  //this function allows for the list item to open and close to reveal more functionality when selected
  const handlePress = () => {
    dispatch(openStreak(id));
  };

  useEffect(() => {
    handleTimeOperations();
    const interval = setInterval(() => {
      handleTimeOperations();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <TouchableOpacity onPress={handlePress} role="listitem" accessibilityLabel={`complete streak`}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
          <Text style={styles.textSecondary}>complete</Text>
        </View>
        <View style={styles.dayCountAndButtonContainer}>
          <Text style={styles.dayCount}>{count}</Text>
          <CompleteButton />
        </View>
      </View>
      {/* Hidden functionality, visible when the list item is pressed....*/}
      {openStreakId === id ? (
        <View style={styles.bottomContainer}>
          <DeleteButton id={id} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CompleteListItem;

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
  },
  bottomContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: 'lightblue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textContainer: {
    maxWidth: '70%',
  },
  textMain: {
    fontSize: 24,
    fontWeight: '600',
    flexShrink: 1,
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
});
