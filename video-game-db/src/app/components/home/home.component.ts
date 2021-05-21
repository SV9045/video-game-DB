import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/model/game.model';
import { DataService } from 'src/app/services/data.service';
import { Option } from './../../model/option.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  gameSub: Subscription;
  options: Option[];
  games: Game[];

  constructor(private data: DataService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.optionsList.subscribe((res) => this.options = res);
    this.route.params.subscribe((param: Params) => {
      if (param['game-search']) {
        this.searchGames('metacrit', param['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  get optionsList() {
    return of([
      { text: 'Name', value: 'name' },
      { text: 'Released', value: 'released' },
      { text: 'Added', value: 'added' },
      { text: 'Created', value: 'created' },
      { text: 'Updated', value: 'updated' },
      { text: 'Rating', value: 'rating' },
      { text: 'Metacritic', value: 'metacritic' },
    ]);
  }
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.data
      .getGames(sort, search)
      .subscribe((res: APIResponse<Game>) => {
        console.log(res);
        this.games = res?.results;
        console.log(this.games);
      });
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
