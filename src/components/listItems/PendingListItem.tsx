import { Text, View } from 'react-native';
import ListButton from '../list/ListButton';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteButton from '../list/DeleteButton';

const PendingListItem = ({ title, count, status, time, id }: Streak) => {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
    // if(remainingDate <= 0){
    //fire off action to change the state of the item to broken.
    // }
  };

  useEffect(() => {
    calculateRemainingTime();
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <View style={styles.container} role="listitem" accessibilityLabel={`pending streak`}>
      <Text style={styles.text}>{title} </Text>
      <Text style={styles.text}>
        {remainingTime.hours}/{remainingTime.minutes}/{remainingTime.seconds}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        <ListButton status={status} />
        <DeleteButton id={id} />
      </View>
    </View>
  );
};

export default PendingListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
