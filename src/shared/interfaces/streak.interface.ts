
/**
 * Common type for all streaks.
 * 
 * status field is conditional based on whether it is true or not.
 * 
 * Notg that BaseStreak is not exported.
 * */ 
type BaseStreak = {
  id: string;
  creator_uuid: string;
  other_uuid: string;
  title: string;
  count: number;
  lastTimeCompleted: ISOtimestamp;
};

export type Streak =
  | (BaseStreak & {
      isShared: false;
      status: StreakStatus;
    })
  | (BaseStreak & {
      isShared: true;
      status: StreakStatusShared;
    });


export type ISOtimestamp = `${number}-${string}-${string}T${string}:${string}:${string}.${string}Z`;



export type StreakStatusShared =  'isPending'   | // the streak has been sent to another user but not yet accepted
                                  'isAccepted'  | // the invited user has accepted the streak, but no action has been taken
                                  'isRejected'  | // the invited user accepted the streaj
                                  'isActive'    | // triggered when one of the users first complete the streak
                                  'isBroken'    ; // the condition for a condition is met


export type StreakStatus =        'isPending'   | // the streak has been sent to another user but not yet accepted
                                  'isActive'    | // triggered when one of the users first complete the streak
                                  'isBroken'    ; // the condition for a condition is met

                                  
export type StreakStatusUI =      'showCompleted' | // after streak is completed, disables ability to immeditately  complete again
                                  'showPending'   | // streak can be completed
                                  'showBroken'    ; // the streak is broken/


export type StreakInviteCreatorStatusUI =  'showIs' | // after streak is completed, disables ability to immeditately  complete again
                                        `  'showPending'   | // streak can be completed
                                           'showBroken'    ; // the streak is broken/`

export type StreakStatusUI =      'showCompleted' | // shortly after the streak has been completed, disabling ability to complete.
                                  'showPending'   | // 
                                  'showBroken'    ; // the condition for a condition is met


export interface StreaksState {
  streaks: Streak[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



