import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { deleteStreak, deleteStreakBackend } from '../../../store/slices/streaksSlice';
import { useAppDispatch } from '../../../../hooks';
import React from 'react';
import { deleteLocalStreak } from '../../../store/slices/localStreakSlice';


const DeleteButton = ({ id, isShared }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {

    if(isShared)
    {
      dispatch(deleteStreakBackend(id));

    } else 
    {
      dispatch(deleteLocalStreak(id))
    }
  };

  return (
    <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
      <Ionicons name="trash" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  pendingButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },
});
