import { ISOtimestamp } from "../interfaces/general.interface";


export const isValidISOtimestamp = (value: string): value is ISOtimestamp => {
    // Regular expression for ISO date format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  
    return isoDateRegex.test(value);
  }