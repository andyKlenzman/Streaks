import { StyleSheet } from 'react-native';

export const listItemStyles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // Slightly updated border styling
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 12, // unify top/bottom padding
    backgroundColor: '#fff'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  textContainer: {
    maxWidth: '100%',
  },
  textMain: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  textSecondary: {
    fontSize: 14,
    color: '#888',
  },
  dayCountAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCount: {
    fontSize: 18,
    marginRight: 8,
    color: '#333',
  },
  // Give the delete container a fixed width so we can clamp the swipe
  deleteButtonContainer: {
    width: 80,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
