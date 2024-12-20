import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { openStreak } from '../../store/slices/uiSlice';
import DeleteButton from './buttons/DeleteButton';
import PendingStreakButton from './buttons/PendingStreakButton';
import { parseTime, getTimeUntilStreakBroken } from '../../logic/timeUtils';
import ListItem from './ListItem';
import { getIsStreakExpired } from '../../logic/time/streakTimeLogic';



const PendingListItem = ({ title, count, lastTimeUpdated, id }) => {

  const dispatch = useAppDispatch();
  const [subtitle, setSubtitle] = useState('');
  const checkTimeRateMS = 10000;

  useEffect(() => {
 
  let isStreakExpired = getIsStreakExpired(new Date(lastTimeUpdated));

  }, []);

  const renderRightActions = () => (
    <DeleteButton id={id} />
  );

  return (
    <ListItem
      title={title}
      count={count}
      subtitle={subtitle}
      renderRightActions={renderRightActions}
      renderActionButton={() => <PendingStreakButton id={id} />}
      onSwipeableOpen={() => dispatch(openStreak(id))}
      onSwipeableClose={() => dispatch(openStreak(''))}
    />
  );
};

export default PendingListItem;
