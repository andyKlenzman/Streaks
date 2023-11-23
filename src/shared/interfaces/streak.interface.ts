export interface Streak {
  id: string;
  title: string;
  count: number;
  status: StreakStatus;
  partner: '';
}

export interface StreakFormInput {
  title: string;
  partner: '';
}

export type StreakStatus = 'pending' | 'complete' | 'broken';

export interface Streaks extends Array<Streak> {}
