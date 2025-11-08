import { Injectable } from "@nestjs/common";
import {
  LEVELS,
  LevelInfo,
  getLevelByPoints,
  getNextLevel,
  getPointsToNextLevel,
  getLevelProgress,
  getAllLevels,
} from "@/domain/constants/levels.constants";

@Injectable()
export class LevelsService {
  findAll(): LevelInfo[] {
    return getAllLevels();
  }

  findByLevel(level: number): LevelInfo | null {
    const levelInfo = LEVELS.find((l) => l.level === level);
    return levelInfo || null;
  }

  calculateLevel(points: number): LevelInfo {
    return getLevelByPoints(points);
  }

  getUserLevelInfo(points: number) {
    const currentLevel = getLevelByPoints(points);
    const nextLevel = getNextLevel(currentLevel.level);
    const pointsToNext = getPointsToNextLevel(points);
    const progress = getLevelProgress(points);

    return {
      current: currentLevel,
      next: nextLevel,
      pointsToNextLevel: pointsToNext,
      progressPercentage: progress,
      isMaxLevel: nextLevel === null,
    };
  }

  checkLevelUp(
    oldPoints: number,
    newPoints: number
  ): {
    leveledUp: boolean;
    oldLevel: LevelInfo;
    newLevel: LevelInfo;
  } {
    const oldLevel = getLevelByPoints(oldPoints);
    const newLevel = getLevelByPoints(newPoints);

    return {
      leveledUp: newLevel.level > oldLevel.level,
      oldLevel,
      newLevel,
    };
  }
}
