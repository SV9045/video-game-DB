import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Game } from 'src/app/model/game.model';
// import { environment as env } from 'src/environments/environment';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGames(order: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('order', order);
    if (search) {
      params = new HttpParams().set('order', order).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.environment.BASE_URL}/games`, {
      params: params,
    });
  }
}
