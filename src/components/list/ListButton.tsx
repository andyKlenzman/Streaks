import { TouchableOpacity, Text } from "react-native";
import { listButtonStyles } from "../../styles/list/listButtonStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StreakStatus } from "../../shared/interfaces/streak.interface";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ListButtonProps {
  status: StreakStatus;
}


const ListButton: React.FC<ListButtonProps> = ({status}) => {
  let icon;
  let backgroundColor
  const handleClick = () => {
   
  };

  if (status === 'complete') {
    icon = <Ionicons name="md-checkmark-circle" size={32} color="green" />;
  }
  if (status === 'broken') {
    icon = <Ionicons name="md-checkmark-circle" size={32} color="red" />;
  }
  if (status === 'pending') {
    icon = <MaterialCommunityIcons name="timer-sand-complete" size={32} color="blue" />
  }

return (
 <TouchableOpacity style={listButtonStyles.button} onPress={handleClick}>
   {icon}
 </TouchableOpacity>      
      )

} 

export default ListButton