import React from 'react';
import { useAppDispatch } from '../../../../hooks';
import CompleteButton from '../buttons/CompleteButton';
import ListItem from './_ListItem';
import { ListItemInstance } from './_ListItemInterface';

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
