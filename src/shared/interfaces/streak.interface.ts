export interface Streak {
  id: string;
  title: string;
  count: number;
  status: StreakStatus;
  time: ISOtimestamp
}

// interface StreakWithoutTime extends Omit<Streak, 'time'> {}
// example of how you can create succinctly subversions of Streak

export interface StreakFormInput {
  title: string;
}

export type ISOtimestamp = `${number}-${string}-${string}T${string}:${string}:${string}.${string}Z`;

export type StreakStatus = 'pending' | 'complete' | 'broken';

export interface Streaks extends Array<Streak> {}
