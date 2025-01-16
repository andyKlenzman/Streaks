import React from 'react';
import { useAppDispatch } from '../../../hooks';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import CompleteButton from './buttons/CompleteButton';
import ListItem from './ListItem';
import { Streak } from '../../shared/interfaces/streak.interface';

const CompleteListItem = ({streak , backgroundColor}) => {
  const dispatch = useAppDispatch();

  return (
    <ListItem
      title={streak.title}
      count={streak.count}
      subtitle="complete"
      actionButton={() => <CompleteButton />}
      streak={streak}
      backgroundColor={backgroundColor}
    />
  );
};

export default CompleteListItem;
