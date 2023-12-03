import { screen, fireEvent } from '@testing-library/react-native';
import ListContainer from './ListContainer';
import { RootState, setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import '../../utils/mock-async-storage';
import { renderWithProviders } from '../../utils/test.utils';
import { currentTime, pastStreakDeadline } from '../../utils/test.timeUtils';
import PendingListItem from '../listItems/PendingListItem';
 /*
Notes
- Does this test environement use asyncstorage and does it work???

 */


test('List Container renders the correct list items for each streak', () => {
  const preloadedState:RootState= {
    streaks: [
      { id: '1', title: 'do a pushup', count: 54, status: 'pending', time: currentTime },
      { id: '2', title: 'talk to someone new', count: 3, status: 'broken', time: pastStreakDeadline },
      { id: '3', title: 'be nice', count: 43, status: 'pending', time: currentTime },
      { id: '4', title: 'stretch', count: 2, status: 'pending', time: pastStreakDeadline },
    ]
  };

  //what is jest.fn()
  //expect the mock function with an implemetnation, what would an empty one accomplish
  const mockFn = jest.fn();
  renderWithProviders(<ListContainer />, {preloadedState})

  const pendingStreak = screen.getByRole("listitem", {name:"pending streak"})


  // fireEvent.changeText(answerInputs[0], 'a1');
  // fireEvent.changeText(answerInputs[1], 'a2');
  // fireEvent.press(screen.getByText('Submit'));

  expect(mockFn).toBeCalledWith({
    1: { q: 'q1', a: 'a1' },
    2: { q: 'q2', a: 'a2' },
  });
});