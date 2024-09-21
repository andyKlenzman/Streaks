import { screen, fireEvent, fakeTimer } from '@testing-library/react-native';
import ListContainer from './ListContainer';
import { RootState, setupStore } from '../../store/store';
import '../../utils/mock-async-storage';
import { renderWithProviders } from '../../utils/test.utils';
import { expect, jest, test } from '@jest/globals';
import { currentTime, laterTime, pastStreakDeadline } from '../../utils/test.timeUtils';
/*
Notes
- Does this test environement use asyncstorage and does it work???
- https://testing-library.com/docs/using-fake-timers/
- https://reactnative.dev/docs/testing-overview#:~:text=For%20testing%20React%20components%2C%20there,by%20React%20is%20correct%20(eg.
- FOR E2E testing: https://wix.github.io/Detox/docs/introduction/getting-started/
- https://callstack.github.io/react-native-testing-library/docs/api-queries/#by-role
 */

beforeEach(() => {});

beforeAll(() => {});

describe('My ListItems', () => {
  test('Create streaks', () => {
    // (alias) type RootState = EmptyObject & {
    //     streaks: Streaks;
    //     ui: string;
    // }
    // what is the empty object type
    const preloadedState: RootState = {
      streaks: [
        { id: '1', title: 'do a pushup', count: 0, status: 'pending', lastTimeUpdated: currentTime },
        {
          id: '2',
          title: 'talk to someone new',
          count: 3,
          status: 'broken',
          lastTimeUpdated: pastStreakDeadline,
        },
        { id: '3', title: 'be nice', count: 43, status: 'pending', lastTimeUpdated: currentTime },
        { id: '4', title: 'stretch', count: 2, status: 'pending', lastTimeUpdated: pastStreakDeadline },
        { id: '5', title: 'TEST', count: 2, status: 'complete', lastTimeUpdated: laterTime },
      ],
      ui: '',
    };

    const mockFn = jest.fn();
    renderWithProviders(<ListContainer />, { preloadedState });

    const pendingStreak = screen.getByRole('listitem', { name: 'pending streak' });

    // fireEvent.changeText(answerInputs[0], 'a1');
    // fireEvent.changeText(answerInputs[1], 'a2');
    // fireEvent.press(screen.getByText('Submit'));

    // expect(mockFn).toBeCalledWith({
    //   1: { q: 'q1', a: 'a1' },
    //   2: { q: 'q2', a: 'a2' },
    // });
  });
});
