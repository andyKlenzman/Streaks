import React from 'react';
import { useAppDispatch } from '../../../hooks';
import CompleteButton from './buttons/CompleteButton';
import ListItem from './ListItem';
import { ListItemInstance } from './ListItemInterface';

const CompleteListItem : React.FC<ListItemInstance> = ({streak , backgroundColor}) => {
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
