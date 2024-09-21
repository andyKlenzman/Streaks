export interface Streak {
  id: string;
  uuid: string;
  title: string;
  count: number;
  status: StreakStatus;
  lastTimeUpdated: string;
  isShared: bool;
}

export type ISOtimestamp = `${number}-${string}-${string}T${string}:${string}:${string}.${string}Z`;

export type StreakStatus = 'pending' | 'complete' | 'broken';


export interface StreaksState {
  streaks: Streak[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export interface AuthState {
  email: string,
  isSignedIn: boolean,
  uuid: string

}
