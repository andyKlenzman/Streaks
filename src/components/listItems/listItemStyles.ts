import { StyleSheet } from "react-native";

export const listItemStyles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderColor: 'lightgrey',
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: 'white',
    },
  
    textContainer: {
      maxWidth: '70%',
    },
    textMain: {
      fontSize: 24,
      fontWeight: '600',
      flexShrink: 1, // Allow text to shrink if it exceeds available space
      // Adjust the percentage based on your layout needs
    },
    textSecondary: {
      fontSize: 20,
      color: 'grey',
    },
    dayCountAndButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dayCount: {
      fontSize: 24,
      marginRight: 15,
    },
    deleteButtonContainer: {
      backgroundColor: 'red',
      color: 'white',
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });