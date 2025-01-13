import React from 'react';
import { useAppDispatch } from '../../../hooks';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { openStreak } from '../../store/slices/uiSlice';
import DeleteButton from './buttons/DeleteButton';
import CompleteButton from './buttons/CompleteButton';
import ListItem from './ListItem';
import { Streak } from '../../shared/interfaces/streak.interface';

const CompleteListItem = ({streak , backgroundColor}) => {
  const dispatch = useAppDispatch();

  const renderRightActions = () => (
    <DeleteButton id={streak.streakUUID} />
  );

  return (
    <ListItem
      title={streak.title}
      count={streak.count}
      subtitle="complete"
      renderRightActions={renderRightActions}
      renderActionButton={() => <CompleteButton />}
      onSwipeableOpen={() => dispatch(openStreak(streak.streakUUID))}
      onSwipeableClose={() => dispatch(openStreak(''))}
      backgroundColor
    />
  );
};

export default CompleteListItem;
