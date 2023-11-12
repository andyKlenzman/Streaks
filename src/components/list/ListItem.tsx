import { Text, View } from "react-native";
import ListButton from "./ListButton";
import { listItemStyles } from "../../styles/list/listItemStyles";
import DayCount from "./DayCount";

interface ListItemProps {
    title: string;
  }; /* use `interface` if exporting so that consumers can extend */
  

const ListItem = ({ title }: ListItemProps) => {
return (
  <View style={listItemStyles.container}>
    <Text style={listItemStyles.text}>{title}</Text>
    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      
      <ListButton />
      <DayCount />
    </View>
  </View>

)

};

export default ListItem