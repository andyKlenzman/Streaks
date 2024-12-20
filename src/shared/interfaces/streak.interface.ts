
/**
 * Common type for all streaks.
 * 
 * status field is conditional based on whether it is true or not.
 * 
 * Note that BaseStreak is not exported.
 * */ 

import { LoadState } from "./generalStatusCodes.interfaces";

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
      status: LocalStreakStatus;
    })
  | (BaseStreak & {
      isShared: true;
      status: SharedLocalStatus;
    });


export type ISOtimestamp = `${number}-${string}-${string}T${string}:${string}:${string}.${string}Z`;



export type SharedLocalStatus =  'isPending'   | // the streak has been sent to another user but not yet accepted
                                  'isAccepted'  | // the invited user has accepted the streak, but no action has been taken
                                  'isRejected'  | // the invited user accepted the streaj
                                  'isActive'    | // triggered when one of the users first complete the streak
                                  'isBroken'    ; // the condition for a condition is met


export type LocalStreakStatus =   'isPending'   | // the streak has been sent to another user but not yet accepted
                                  'isActive'    | // triggered when user completes it for the first time.
                                  'isBroken'    ; // the condition for a condition is met

                                  
// this needs more work
export type StreakInviteCreatorStatusUI =  'showIs' | // after streak is completed, disables ability to immeditately  complete again
                                        `  'showPending'   | // streak can be completed
                                           'showBroken'    ; // the streak is broken/`

export type StreakStatusUI =      'showCompleted' | // shortly after the streak has been completed, disabling ability to complete.
                                  'showPending'   | // 
                                  'showBroken'    ; // the condition for a condition is met



// Interface for holding multiple streaks.                                  
export type LocalStreaks = {
  streaks: Streak[];
};

