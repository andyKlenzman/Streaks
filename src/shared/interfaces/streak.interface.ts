export interface Streak {
  id: string | number[];
  title: string;
  count: number;
  status: StreakStatus;
  time: string
}

export interface StreakFormInput {
  title: string;
}

export type StreakStatus = 'pending' | 'complete' | 'broken';

export interface Streaks extends Array<Streak> {}
