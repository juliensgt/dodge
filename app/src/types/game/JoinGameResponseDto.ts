export default interface JoinGameResponseDto {
  success: boolean;
  player: {
    _id: string;
    name: string;
    points: number;
    currentTime: number;
    skinCards: string;
  };
}
