import { differenceInMonths, differenceInYears } from "date-fns";
// convert datestring into age
export const calculateAge = (dateString: string): string => {
  if (!dateString) return 'Unknown';

  const birthDate = new Date(dateString);
  if (isNaN(birthDate.getTime())) return 'Unknown';

  const today = new Date();
  const years = differenceInYears(today, birthDate);
  const months = differenceInMonths(today, birthDate) % 12;

  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;

  return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
};

