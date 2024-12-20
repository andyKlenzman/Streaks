import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { openStreak } from '../../store/slices/uiSlice';
import DeleteButton from './buttons/DeleteButton';
import CompleteButton from './buttons/CompleteButton';
import { getTimeUntilStatusChange } from '../../logic/timeUtils';
import ListItem from './ListItem';


const CompleteListItem = ({ title, count, lastTimeUpdated, id }) => {

  const renderRightActions = () => (
    <DeleteButton id={id} />
  );

  return (
    <ListItem
      title={title}
      count={count}
      subtitle="complete"
      renderRightActions={renderRightActions}
      renderActionButton={() => <CompleteButton />}
      onSwipeableOpen={() => dispatch(openStreak(id))}
      onSwipeableClose={() => dispatch(openStreak(''))}
    />
  );
};

export default CompleteListItem;
