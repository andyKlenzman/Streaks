import React from 'react';
import PendingStreakButton from './buttons/PendingStreakButton';
import ListItem from './ListItem';

import { ListItemInstance } from './ListItemInterface';

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
