import { Text, View } from 'react-native';
import ListButton from './ListButton';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteButton from './DeleteButton';
/* use `interface` if exporting so that consumers can extend 
YEAH IM GOING TO break this up into different types of list items and have a handler for them. 

I could also just pass the ID and have each Indv list item select its data based on ID, but that's prob overkill, the option is there tho 
*/

const ListItem = ({ title, count, status, time, id }: Streak) => {
  const [remainingTime, setRemainingTime] = useState({hours:0, minutes:0, seconds: 0});

  const calculateRemainingTime = () => {
      const now = new Date();

      const streakDeadline = new Date(time);
      streakDeadline.setHours(streakDeadline.getHours() + 24);


      const timeDifference = streakDeadline.getTime() - now.getTime();
      const remainingDate = new Date(timeDifference);

      const hours = remainingDate.getUTCHours();
      const minutes = remainingDate.getMinutes();
      const seconds = remainingDate.getSeconds();

      console.log(time, " / ", streakDeadline)

      setRemainingTime({ hours, minutes, seconds });

    
  };
  useEffect(() => {
    calculateRemainingTime();
    const interval = setInterval(() => {
        calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  let conditionalStyles;
  if (status === 'pending') {
    conditionalStyles = { backgroundColor: 'lightgrey' };
  } else if (status === 'broken') {
    conditionalStyles = { backgroundColor: 'darkgrey' };
  } else if (status === 'complete') {
    conditionalStyles = { backgroundColor: 'white' };
  }
  return (
    <View style={[styles.container, conditionalStyles]}>
      <Text style={styles.text}>{title} </Text>
      <Text style={styles.text}>{remainingTime.hours}/{remainingTime.minutes}/{remainingTime.seconds}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        <ListButton status={status} />
        <DeleteButton id={id} />
      </View>
    </View>
  );
};

export default ListItem;

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
