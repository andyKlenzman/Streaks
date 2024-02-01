import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
 
  retryButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 7,
    margin: 5,
    borderWidth: 2, // Border width
    borderColor: 'green', // Border color
  },

  pendingButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 2, // Border width
    borderColor: '#2282FF', // Border color
    padding: 7,
    margin: 5,
    minHeight: 32,
    minWidth: 32,
  },

  successIcon: {
    marginRight:4
  },
  });