import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {NewgameComponent} from './newgame/newgame.component';

const routes: Routes = [
  {path: 'newgame', component: NewgameComponent},
  {path: 'tictactoe', component: GameComponent},
  {path: '**', redirectTo: 'newgame'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
