import { Text, View } from "react-native";
import ListButton from "./ListButton";
import { listItemStyles } from "../../styles/list/listItemStyles";
import { dayCountStyles } from "../../styles/list/dayCountStyles";
import { StreakStatus } from "../../shared/interfaces/streakStatus.interface";
interface ListItemProps {
    title: string;
    count: number
    status: StreakStatus
  }; /* use `interface` if exporting so that consumers can extend */
  

const ListItem = ({ title, count, status}: ListItemProps) => {
  console.log(count, status, title)
return (
  <View style={listItemStyles.container}>
    <Text style={listItemStyles.text}>{title}</Text>
    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <ListButton status={status} />
      <Text style={dayCountStyles.text}>{count}</Text>
    </View>
  </View>

)

};

export default ListItem