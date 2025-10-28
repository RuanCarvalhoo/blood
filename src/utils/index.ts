import { LEVELS, POINTS_PER_DONATION } from '../constants';
import { Level, User } from '../types';

export const calculateLevel = (points: number): Level => {
  const level = LEVELS.find(
    (l) => points >= l.minPoints && points <= l.maxPoints
  );
  return level || LEVELS[0];
};

export const getProgressToNextLevel = (points: number): number => {
  const currentLevel = calculateLevel(points);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);
  
  if (!nextLevel) return 100;
  
  const pointsInCurrentLevel = points - currentLevel.minPoints;
  const pointsNeededForNextLevel = nextLevel.minPoints - currentLevel.minPoints;
  
  return (pointsInCurrentLevel / pointsNeededForNextLevel) * 100;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const canDonateAgain = (lastDonationDate: Date, gender: 'male' | 'female'): boolean => {
  const interval = gender === 'male' ? 60 : 90;
  const nextDonationDate = new Date(lastDonationDate);
  nextDonationDate.setDate(nextDonationDate.getDate() + interval);
  
  return new Date() >= nextDonationDate;
};

export const getNextDonationDate = (lastDonationDate: Date, gender: 'male' | 'female'): Date => {
  const interval = gender === 'male' ? 60 : 90;
  const nextDate = new Date(lastDonationDate);
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
};
