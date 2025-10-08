import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../game.schema';

@Injectable()
export class GameTimerManager {
  // Dictionnaire pour stocker les timers par gameId
  phaseTimers = new Map<string, NodeJS.Timeout>();

  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  scheduleNextPhase(gameId: string, delay: number, callback?: () => Promise<void>) {
    if (this.phaseTimers.has(gameId)) clearTimeout(this.phaseTimers.get(gameId));

    const timer = setTimeout(() => {
      if (this.phaseTimers.has(gameId)) {
        this.phaseTimers.delete(gameId);
        if (callback)
          callback().catch((err) => {
            console.error(`[Timer Error][${gameId}]`, err);
          });
      }
    }, delay);

    this.phaseTimers.set(gameId, timer);
  }
}
