import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  try {
    return format(new Date(dateString), 'dd MMMM yyyy'); // e.g., 04 June 1996
  } catch (error) {
    return 'Invalid date';
  }
};