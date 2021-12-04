import {Component, OnInit} from '@angular/core';
import {GameService} from '../shared/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(public gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    if (!this.gameService.gameStatus) {
      this.router.navigate(['/newgame']);
    }
  }

  placeToken(rowNum: number, columnNum: number): void {
    console.log(this.gameService.parsingResponse);
    if (!this.gameService.parsingResponse) {
      this.gameService.placeToken(rowNum, columnNum);
    }
  }

  restartGame() {
    this.router.navigate(['/newgame']).then(() => {
      window.location.reload();
    });
  }
}
