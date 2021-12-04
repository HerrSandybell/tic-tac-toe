export interface Game {
  outcome: string;
  game_id: string;
  history: Object[];
  winner?: string[];
  players: string[];
}
