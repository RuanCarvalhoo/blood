export interface LevelInfo {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
}

export const LEVELS: readonly LevelInfo[] = [
  {
    level: 1,
    name: "Gota de Esperança",
    minPoints: 0,
    maxPoints: 99,
    icon: "🩸",
  },
  {
    level: 2,
    name: "Jornada do Doador",
    minPoints: 100,
    maxPoints: 299,
    icon: "💉",
  },
  {
    level: 3,
    name: "Coração Solidário",
    minPoints: 300,
    maxPoints: 599,
    icon: "❤️",
  },
  {
    level: 4,
    name: "Guardião da Vida",
    minPoints: 600,
    maxPoints: 999,
    icon: "⭐",
  },
  {
    level: 5,
    name: "Herói Anônimo",
    minPoints: 1000,
    maxPoints: 1999,
    icon: "🦸",
  },
  {
    level: 6,
    name: "Titã da Transfusão",
    minPoints: 2000,
    maxPoints: 3999,
    icon: "💪",
  },
  {
    level: 7,
    name: "Embaixador do Sangue",
    minPoints: 4000,
    maxPoints: 7999,
    icon: "👑",
  },
  {
    level: 8,
    name: "Mestre Salvador",
    minPoints: 8000,
    maxPoints: 15999,
    icon: "🏆",
  },
  {
    level: 9,
    name: "Lenda Eterna",
    minPoints: 16000,
    maxPoints: 31999,
    icon: "💎",
  },
  {
    level: 10,
    name: "O Imortal (Legado)",
    minPoints: 32000,
    maxPoints: Infinity,
    icon: "🌟",
  },
] as const;

export function getLevelByPoints(points: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(currentLevel: number): LevelInfo | null {
  if (currentLevel >= LEVELS.length) {
    return null;
  }
  return LEVELS[currentLevel];
}

export function getPointsToNextLevel(points: number): number {
  const currentLevelInfo = getLevelByPoints(points);
  const nextLevelInfo = getNextLevel(currentLevelInfo.level);

  if (!nextLevelInfo) {
    return 0;
  }

  return nextLevelInfo.minPoints - points;
}

export function getLevelProgress(points: number): number {
  const currentLevelInfo = getLevelByPoints(points);
  const pointsInLevel = points - currentLevelInfo.minPoints;
  const levelRange =
    currentLevelInfo.maxPoints - currentLevelInfo.minPoints + 1;

  if (levelRange === Infinity) {
    return 100;
  }

  return Math.min(100, Math.round((pointsInLevel / levelRange) * 100));
}

export function getAllLevels(): LevelInfo[] {
  return [...LEVELS];
}
