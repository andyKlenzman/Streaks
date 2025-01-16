import React from 'react';
import { useAppDispatch } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import ListItem from './ListItem';
import { Streak } from '../../shared/interfaces/streak.interface';

interface NewListItemProps {
  streak: Streak;
  backgroundColor: string;
}

const NewListItem: React.FC<NewListItemProps> = ({ streak, backgroundColor }) => {
  const dispatch = useAppDispatch();

  return (
    <ListItem
      title={streak.title}
      count={streak.count}
      subtitle="press to start streak"
      actionButton={() => <PendingStreakButton id={streak.streakUUID} />}
      streak={streak}
      backgroundColor={backgroundColor}
    />
  );
};

export default NewListItem;
