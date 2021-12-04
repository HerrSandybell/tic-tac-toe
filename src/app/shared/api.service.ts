import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Game} from './game';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  postNewGame(
    playerOne: string,
    playerTwo: string
  ): Observable<Object | String> {
    const url = `${this.url}new?player_1=${playerOne}&player_2=${playerTwo}`;
    // console.log(url);
    return this.http.post(url, {});
  }

  getGameStatus(id: string): Observable<Game> {
    const url = `${this.url}${id}`;
    return this.http.get<Game>(url, {});
  }

  postToken(
    id: string,
    player: string,
    row: number,
    column: number
  ): Observable<Object> {
    const url = `${this.url}${id}/placeToken?player=${player}&row=${row}&column=${column}`;
    console.log(url);
    return this.http.post(url, {});
  }
}
