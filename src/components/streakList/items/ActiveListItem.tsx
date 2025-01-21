import ActiveStreakButton from '../buttons/ActiveStreakButton';
import ListItem from './_ListItem';
import { ListItemInstance } from './_ListItemInterface';



const ActiveListItem : React.FC<ListItemInstance> = ({streak , backgroundColor}) => {


  return (
    <ListItem
    title={streak.title}
    count={streak.count}
    subtitle="press to complete"
    actionButton={() => <ActiveStreakButton id={streak.streakUUID} />}
    streak={streak}
    backgroundColor={backgroundColor}
  />
  );
};

export default ActiveListItem;
