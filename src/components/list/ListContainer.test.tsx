import { screen, fireEvent } from '@testing-library/react-native';
import ListContainer from './ListContainer';
import { RootState, setupStore } from '../../store/store';
import '../../utils/mock-async-storage';
import { renderWithProviders } from '../../utils/test.utils';

/*
Notes
- Does this test environement use asyncstorage and does it work???

 */

test('Create streaks', () => {
  const preloadedState: RootState = {
    streaks: [],
  };

  const mockFn = jest.fn();
  renderWithProviders(<ListContainer />, { preloadedState });

  const pendingStreak = screen.getByRole('listitem', { name: 'pending streak' });

  // fireEvent.changeText(answerInputs[0], 'a1');
  // fireEvent.changeText(answerInputs[1], 'a2');
  // fireEvent.press(screen.getByText('Submit'));

  expect(mockFn).toBeCalledWith({
    1: { q: 'q1', a: 'a1' },
    2: { q: 'q2', a: 'a2' },
  });
});
