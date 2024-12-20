import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOpenStreak, openStreak } from '../../store/slices/uiSlice';
import DeleteButton from './buttons/DeleteButton';
import RetryButton from './buttons/RetryButton';
import ListItem from './ListItem';

const BrokenListItem = ({ title, count, id }) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

  useEffect(() => {
    if (id !== openStreakId) {
      // Your additional logic
    }
  }, [openStreakId]);

  const renderRightActions = () => (
    <DeleteButton id={id} />
  );

  return (
    <ListItem
      title={title}
      count={count}
      subtitle="broken"
      renderRightActions={renderRightActions}
      renderActionButton={() => <RetryButton id={id} />}
      onSwipeableOpen={() => dispatch(openStreak(id))}
      onSwipeableClose={() => dispatch(openStreak(''))}
    />
  );
};

export default BrokenListItem;
