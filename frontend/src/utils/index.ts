import {
  LEVELS,
  POINTS_PER_DONATION,
  DONATION_INTERVAL_DAYS,
} from "@/constants";
import { Level, User } from "@/types";

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
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const canDonateAgain = (
  lastDonationDate: Date,
  gender: "male" | "female"
): boolean => {
  const interval = DONATION_INTERVAL_DAYS[gender];
  const nextDonationDate = new Date(lastDonationDate);
  nextDonationDate.setDate(nextDonationDate.getDate() + interval);

  return new Date() >= nextDonationDate;
};

export const getNextDonationDate = (
  lastDonationDate: Date,
  gender: "male" | "female"
): Date => {
  const interval = DONATION_INTERVAL_DAYS[gender];
  const nextDate = new Date(lastDonationDate);
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
};

// Fórmula de Haversine para calcular distância em km
export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Raio da terra em km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distância em km
  return parseFloat(d.toFixed(1)); // Retorna com 1 casa decimal
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
