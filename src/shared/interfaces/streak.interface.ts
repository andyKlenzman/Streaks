import { StreakStatus } from "./streakStatus.interface";

export default interface Streak {
    id: string;
    title: string;
    count: number;
    status: StreakStatus
}