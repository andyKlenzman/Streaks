import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { openStreak } from '../../store/slices/uiSlice';
import PendingStreakButton from './buttons/PendingStreakButton';
import ListItem from './ListItem';
import { ListItemInstance } from './ListItemInterface';



const ActiveListItem : React.FC<ListItemInstance> = ({streak , backgroundColor}) => {


  return (
    <ListItem
    title={streak.title}
    count={streak.count}
    subtitle="press to complete"
    actionButton={() => <PendingStreakButton id={streak.streakUUID} />}
    streak={streak}
    backgroundColor={backgroundColor}
  />
  );
};

export default ActiveListItem;
