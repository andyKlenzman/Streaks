import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import {  deleteStreakBackend } from '../../../store/slices/streaksSlice';
import { useAppDispatch } from '../../../../hooks';
import React from 'react';
import { deleteLocalStreak } from '../../../store/slices/localStreakSlice';


const DeleteButton = ({ streakUUID, isShared }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {

    if(isShared)
    {
      dispatch(deleteStreakBackend(streakUUID));

    } else 
    {
      dispatch(deleteLocalStreak(streakUUID))
    }
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleClick}>
      <Ionicons name="trash" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },
});
