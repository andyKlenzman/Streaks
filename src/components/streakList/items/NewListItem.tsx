import React from 'react';
import PendingStreakButton from '../buttons/ActiveStreakButton';
import ListItem from './_ListItem';

import { ListItemInstance } from './_ListItemInterface';

const NewListItem: React.FC<ListItemInstance> = ({ streak, backgroundColor }) => {

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
