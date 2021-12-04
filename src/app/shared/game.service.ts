import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  parsingResponse = false;
  gameStatus: string | undefined;
  gameId!: string;
  activePlayer!: string;
  playerOne!: string;
  playerTwo!: string;
  tokenType = 'X';
  endingStatement!: string;
  winner: Array<string> = [];
  gameboard: Array<Array<string>> = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  constructor(private api: ApiService, private router: Router) {}

  postNewGame(playerOne: string, playerTwo: string): void {
    this.api.postNewGame(playerOne, playerTwo).subscribe(
      data => {
        console.log(data);
        this.gameId = data.toString();
        this.gameStatus = 'ACTIVE';
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.activePlayer = playerOne;
        this.router.navigate(['/tictactoe']);
      },
      error => {
        window.alert(`ERROR: ${error.message}`);
      }
    );
  }

  placeToken(row: number, column: number): void {
    this.parsingResponse = true;
    this.api.postToken(this.gameId, this.activePlayer, row, column).subscribe(
      data => {
        if (data === 'Success') {
          this.gameboard[row][column] = this.tokenType;
          if (this.activePlayer === this.playerOne) {
            this.activePlayer = this.playerTwo;
            this.tokenType = 'O';
          } else {
            this.activePlayer = this.playerOne;
            this.tokenType = 'X';
          }
          console.log(this.gameboard);
          this.checkGameStatus();
        }
      },
      error => {
        window.alert(`ERROR Placing a token: ${error.message}`);
        this.parsingResponse = false;
      }
    );
  }

  checkGameStatus() {
    this.api.getGameStatus(this.gameId).subscribe(
      data => {
        this.gameStatus = data.outcome;
        if (data.winner) {
          this.winner = data.winner;
          if (this.winner.length === 1) {
            this.endingStatement = `Congratulations, ${this.winner[0]} wins!`;
          } else {
            this.endingStatement = "It's a tie! Want to try again?";
          }
        }
        this.parsingResponse = false;
        console.log(data);
      },
      error => {
        window.alert(`ERROR Placing a token: ${error.message}`);
        this.parsingResponse = false;
      }
    );
  }
}
