import { TouchableOpacity, Text } from "react-native";
import { listButtonStyles } from "../../styles/list/listButtonStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

const ListButton = () => {
  const [status, setStatus] = useState(false);


  const handleClick = () => {
    setStatus(!status)
  };



return (
 <TouchableOpacity style={listButtonStyles.button} onPress={handleClick}>
    {status ? <Ionicons name="md-checkmark-circle" size={32} color="green" /> :
    <Ionicons name="md-checkmark-circle" size={32} color="red" />
    }
 </TouchableOpacity>      
      )

} 

export default ListButton