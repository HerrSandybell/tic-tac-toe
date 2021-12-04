import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GameService} from '../shared/game.service';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css'],
})
export class NewgameComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid && form.value.playerOne !== form.value.playerTwo) {
      this.gameService.postNewGame(form.value.playerOne, form.value.playerTwo);
    } else {
      window.alert(
        'Form is invalid. The fields must be filled, and the players cannot have the same name.'
      );
    }
  }
}
