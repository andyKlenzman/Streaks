import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { listContainerStyles } from "../../styles/list/listContainerStyles";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectAllStreaks } from "../../store/selectors/selectAllStreaks";
  


const ListContainer = () => {
    const streaks = useAppSelector(selectAllStreaks)

return (
    <FlatList
        data={streaks}
        renderItem={({item}) => <ListItem {...item}/>}
        keyExtractor={item => item.id}
        style={listContainerStyles.container}
      />      
      )

} 

export default ListContainer