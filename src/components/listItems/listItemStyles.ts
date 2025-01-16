import { StyleSheet } from "react-native";

export const listItemStyles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 3,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0
  
  },
  textContainer: {
    maxWidth: '100%',
  },
  textMain: {
    fontSize: 20,
    fontWeight: '600',
    flexShrink: 1, // Allow text to shrink if it exceeds available space
    // Adjust the percentage based on your layout needs
  },
  textSecondary: {
    fontSize: 16,
    color: 'grey',
    alignSelf: "baseline"
  },
  dayCountAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCount: {
    fontSize: 20,
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