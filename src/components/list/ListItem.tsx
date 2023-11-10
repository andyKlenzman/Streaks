import { Text } from "react-native";


interface ListItemProps {
    message: string;
  }; /* use `interface` if exporting so that consumers can extend */
  

const ListItem = ({ message }: ListItemProps) => <Text>{message}</Text>;

export default ListItem