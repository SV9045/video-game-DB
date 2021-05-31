import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse, Game } from 'src/app/model/game.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGames(order: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('order', order);
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<APIResponse<Game>>(
      `${env.environment.BASE_URL}/games`,
      {
        params: params,
      }
    );
  }

  getGameDetails(id: string): Observable<Game> {
    const gameDetailRequest = this.http.get(
      `${env.environment.BASE_URL}/games/${id}`
    );
    const gameTrailerRequest = this.http.get(
      `${env.environment.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotRequest = this.http.get(
      `${env.environment.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameDetailRequest,
      gameTrailerRequest,
      gameScreenshotRequest,
    }).pipe(
      map((res: any) => {
        return {
          ...res['gameDetailRequest'],
          trailer: res?.gameTrailerRequest?.results,
          screenshots: res?.gameScreenshotRequest?.results,
        };
      })
    );
  }
}
