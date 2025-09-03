import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { Player, PlayerDocument } from '../players/player.schema';
import { User, UserDocument } from '../user/user.schema';
import { GameState } from '../../enums/game-state.enum';
import { defaultGameCreateDto, GameCreateDto } from './dto/game-create.dto';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { PlayerCreateDto } from '../players/dto/player-create.dto';

type GameWithId = Game & { _id: Types.ObjectId };
type PlayerWithId = Player & { _id: Types.ObjectId };

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(gameCreateDto: GameCreateDto): Promise<Game> {
    const game = new this.gameModel(gameCreateDto || defaultGameCreateDto);
    return game.save();
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameModel
      .findById(id)
      .populate('players')
      .populate('deck')
      .populate('defausse');

    if (!game) {
      throw new NotFoundException(
        'Game not found',
        ErrorEnum['game/not-found'],
      );
    }

    return game;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.gameModel
      .find()
      .populate('players')
      .populate('deck')
      .populate('defausse')
      .exec();

    return games;
  }

  async addPlayer(playerCreateDto: PlayerCreateDto): Promise<Player> {
    const game = await this.findOne(playerCreateDto.gameId);
    const user = await this.userModel.findById(playerCreateDto.userId);

    if (!user) {
      throw new NotFoundException(
        'User not found',
        ErrorEnum['user/not-found'],
      );
    }

    const player = new this.playerModel({
      game: playerCreateDto.gameId,
      user: playerCreateDto.userId,
      sessionId: playerCreateDto.sessionId,
      main: [],
      points: 0,
      keyMappings: [],
    });

    const savedPlayer = await player.save();
    game.players.push(savedPlayer);
    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);

    // TODO: Implement game full logic
    if (game.players.length >= game.options.maxPlayers) {
      //this.startGameDelayed(gameId);
    }

    return savedPlayer;
  }

  async getPlayerByGameAndId(
    gameId: string,
    playerId: string,
  ): Promise<Player> {
    const game = await this.findOne(gameId);
    const player = game.players.find(
      (p) => (p as PlayerWithId)._id.toString() === playerId,
    );
    if (!player) {
      throw new NotFoundException(
        'Player not found',
        ErrorEnum['player/not-found'],
      );
    }
    return player;
  }

  async dodge(gameId: string, playerId: string): Promise<void> {
    const game = await this.findOne(gameId);

    // TODO: Implement dodge logic here
    game.playerDodge = playerId;
    game.indexLastPlayerWhoPlay = game.indexPlayerWhoPlays;
    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
  }

  async isTourOfPlayer(gameId: string, playerId: string): Promise<boolean> {
    const game = await this.findOne(gameId);
    if (
      game.indexPlayerWhoPlays < 0 ||
      game.indexPlayerWhoPlays >= game.players.length
    ) {
      return false;
    }
    return (
      (
        game.players[game.indexPlayerWhoPlays] as PlayerWithId
      )._id.toString() === playerId
    );
  }

  async clearGame(gameId: string): Promise<void> {
    const game = await this.findOne(gameId);
    game.deck = [];
    game.defausse = [];
    game.players = [];
    game.gameState = GameState.WAITING;
    game.round = 0;
    game.tour = 0;
    game.indexPlayerWhoPlays = -1;
    game.playerDodge = '';
    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
  }

  /*async startGameDelayed(gameId: string): Promise<Game> {
    const game = await this.findOne(gameId);
    // TODO: Emit event for delayed game start
    // this.eventEmitter.emit('game.start.delayed', game);
    return game;
  }

  // Event listeners
  async handleStartGame(gameId: string): Promise<void> {
    // Initialize deck
    // Start game logic
    // TODO: Emit event for game start
    // this.eventEmitter.emit('game.start', game);
  }

  async handleStartRound(gameId: string): Promise<void> {
    // Next round logic
    // TODO: Emit event for game round start
    // this.eventEmitter.emit('game.round.start', game);
  }

  async handleStartTour(gameId: string): Promise<void> {
    // Next turn logic
    // TODO: Emit event for game turn start
    // this.eventEmitter.emit('game.turn.start', gameId);
  }*/
}
