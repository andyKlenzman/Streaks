
/**
 * Common type for all streaks.
 * 
 * status field is conditional based on whether it is true or not.
 * 
 * Note that BaseStreak is not exported.
 * */ 


type BaseStreak = {
  streakUUID: string;
  creatorUUID: string;
  partnerUUID: string;
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
                                  'isReady'  | // the invited user has accepted the streak, but no action has been taken
                                  'isRejected'  | // the invited user accepted the streaj
                                  'isActive'    | // triggered when one of the users first complete the streak
                                  'isBroken'    ; // the condition for a condition is met


export type LocalStreakStatus = 'isReady'     | // Streak is created but has not yet been acted on. It renders the New Streak List Item and signals that the streak should not be broken. component. Choosing to use this state rather than simply ready count === 0 to determine that it is new,  a state versues reading that the count is 
                                'isActive'    | // triggered when user completes it for the first time.
                                'isBroken'    ; // the condition for a condition is met

                                  
// this needs more work
export type StreakInviteCreatorStatusUI =  'showIs' | // after streak is completed, disables ability to immeditately  complete again
                                        `  'showPending'   | // streak can be completed
                                           'showBroken'    ; // the streak is broken/`

export type StreakStatusUI =      'showCompleted' | // shortly after the streak has been completed, disabling ability to complete.
                                  'showPending'   | // 
                                  'showBroken'    ; // the condition for a condition is met


// export type StreakFormInput =   
// type PersonOhneAdresse = Omit<BaseStreak, ''  | ''>;



// Interface for holding multiple streaks.                                  
export interface LocalStreaks {
  streaks: Streak[];
};

