import React, { useEffect } from 'react';
import RetryButton from './buttons/RetryButton';
import ListItem from './ListItem';
import { ListItemInstance } from './ListItemInterface';

const BrokenListItem : React.FC<ListItemInstance> = ({streak , backgroundColor}) => {

  return (
    <ListItem

      title={streak.title}
      count={streak.count}
      subtitle="broken"
      actionButton={() => <RetryButton id={streak.streakUUID} />}
      streak={streak}
      backgroundColor={backgroundColor}

    />
  );
};

export default BrokenListItem;
